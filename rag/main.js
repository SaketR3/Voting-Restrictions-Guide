import express from 'express'
import cors from 'cors'
import { PORT } from './util/config.js'
import ragRouter from './controllers/rag.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/rag', ragRouter)

const start = async () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

export default app

start()

