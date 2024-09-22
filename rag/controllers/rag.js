import express from 'express';
const router = express.Router();

import "cheerio";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";


const template = `Use the following pieces of context to answer my question about voter restrictions at the end. 
Your response should be a paragraphs. 
Don't give generic recommendations; be personalized. 
Tell me anything relevant that is specific to the state I live in. 

{context}

Question: {question}

Helpful Answer:`;

const customRagPrompt = PromptTemplate.fromTemplate(template);

router.post('/', async (req, res) => {
    const state = req.body.state;
    const prompt = req.body.prompt; 

    const loader = new CheerioWebBaseLoader(
        `https://www.lgbtmap.org/democracy_maps/state_profile/${state}`,
    );
    
    const docs = await loader.load();
    
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });
    
    const splits = await textSplitter.splitDocuments(docs);
    
    const vectorStore = await MemoryVectorStore.fromDocuments(
      splits,
      new OpenAIEmbeddings()
    );
    
    const llm = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0 });
    
    const retriever = vectorStore.asRetriever();
    
    const ragChain = await createStuffDocumentsChain({
        llm: llm,
        prompt: customRagPrompt,
        outputParser: new StringOutputParser(),
    });
    
    console.log('RAG loaded'); 

    const context = await retriever.invoke(prompt);

    const answer = await ragChain.invoke({
        question: prompt + ` I live in ${state}.`,
        context: context,
    });

    return res.json({ answer: answer }); 
});

export default router 
