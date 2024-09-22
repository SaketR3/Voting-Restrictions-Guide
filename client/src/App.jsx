import { useState, useEffect } from 'react'
import './App.css'
import useSWRMutation from 'swr/mutation'
import HeroSection from './HeroSection.jsx'
import InfoSection from './InfoSection.jsx'
import AddressSection from './AddressSection.jsx'

async function fetcher(url) {
  const response = await fetch(url)
  return response.json()
}

function App() {
  const [state, setState] = useState('AK')
  const [loading, setLoading] = useState(false)
  const { trigger, data: res, error } = useSWRMutation(`http://localhost:5000/api?state=${state}`, fetcher)

  function handleFormSubmit(e) {
    e.preventDefault()
    setLoading(true)
    trigger()
  }

  useEffect(() => {
    if (res) {
      console.log(res.registration)
      console.log(res.representation)
      console.log(res.inperson)
      console.log(res.bymail)
      console.log(res.security)
      console.log(res.independence)
    }
    setLoading(false)
  }, [res])

  const handleCtaClick = () => {
    const learnMoreContainer = document.getElementById('learn-more-container');
    if (learnMoreContainer) {
      learnMoreContainer.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const handleSecondaryCtaClick = () => {
    const formContainer = document.getElementById('voter-info-container');
    if (formContainer) {
      formContainer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
        <div className='App'>
          <HeroSection title="States are passing laws that disenfranchise you. Don't let them." 
                    subtitle='Search for your state to see important voting restrictions and learn how they affect you.'
                    backgroundImage='https://images.unsplash.com/photo-1597700331582-aab3614b3c0c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    ctaText='Learn more'
                    onCtaClick={handleCtaClick}
                    secondaryCtaText='Search your state'
                    onSecondaryCtaClick={handleSecondaryCtaClick}
          />

          <div id='learn-more-container' className="info-sections-wrapper">
            <InfoSection
              title="Voting restrictions have been increasing."
              content="For years, many states have been increasing their voter restrictions. While these states usually claim that these measures increase election security, many groups have pointed out that they disproportionately affect people of color and people in poverty."
            />
            <InfoSection
              title="It's hard to figure out what restrictions affect you."
              content="If you try to search online for voting restrictions in your state right now, you'll be greeted with long, confusing lists and large, overwhelming tables full of different restrictions and jargon. Who has the time to parse through all that?"
            />
            <InfoSection
              title="Empower yourself, quickly."
              content="Simply search for your state, and our web app will show you what voting restrictions your state has in place in a simple, digestible manner. Once you're aware of the restrictions that affect you, you can search online to find more information about them and how to prepare for them. Here's an example. Let's say you live in Georgia. Using our web app, you could find out that Georgia has voter ID requirements and long voting lines, among other restrictions. You could then take the necessary actions to obtain a voter ID and arrive at your voting booth early."
            />
            <InfoSection
              title="Democracy and the right to vote."
              content="Due to voting restrictions' disproportionate impact, people of color and people in poverty see much lower voter turnout rates than other demographics, despite their opinions being just as important. With this web app, these disproportionately impacted groups of people can prepare themselves for the restrictions that impact them, so that they can practice their right to vote and ensure our democracy is truly representative of all."
            />
          </div>

          <div style={{ marginBottom: "5rem" }}></div>

          <div id='voter-info-container'>
            <h3 className='voter-info-title'>Search for your state's <span>voting</span> <span className='highlight'>restrictions</span></h3>

            <div id='state-form-container'>
              <form className='state-select-wrapper' onSubmit={handleFormSubmit}>
                <label htmlFor='state'>What state are you in? </label>
                <select id='state' name='state' value={state} onChange={e => setState(e.target.value)}>
                    <option value={'AK'}>AK</option>
                    <option value={'AL'}>AL</option>
                    <option value={'AR'}>AR</option>
                    <option value={'AZ'}>AZ</option>
                    <option value={'CA'}>CA</option>
                    <option value={'CO'}>CO</option>
                    <option value={'CT'}>CT</option>
                    <option value={'DE'}>DE</option>
                    <option value={'FL'}>FL</option>
                    <option value={'GA'}>GA</option>
                    <option value={'HI'}>HI</option>
                    <option value={'IA'}>IA</option>
                    <option value={'ID'}>ID</option>
                    <option value={'IL'}>IL</option>
                    <option value={'IN'}>IN</option>
                    <option value={'KS'}>KS</option>
                    <option value={'KY'}>KY</option>
                    <option value={'LA'}>LA</option>
                    <option value={'MA'}>MA</option>
                    <option value={'MD'}>MD</option>
                    <option value={'ME'}>ME</option>
                    <option value={'MI'}>MI</option>
                    <option value={'MN'}>MN</option>
                    <option value={'MO'}>MO</option>
                    <option value={'MS'}>MS</option>
                    <option value={'MT'}>MT</option>
                    <option value={'NC'}>NC</option>
                    <option value={'ND'}>ND</option>
                    <option value={'NE'}>NE</option>
                    <option value={'NH'}>NH</option>
                    <option value={'NJ'}>NJ</option>
                    <option value={'NM'}>NM</option>
                    <option value={'NV'}>NV</option>
                    <option value={'NY'}>NY</option>
                    <option value={'OH'}>OH</option>
                    <option value={'OK'}>OK</option>
                    <option value={'OR'}>OR</option>
                    <option value={'PA'}>PA</option>
                    <option value={'RI'}>RI</option>
                    <option value={'SC'}>SC</option>
                    <option value={'SD'}>SD</option>
                    <option value={'TN'}>TN</option>
                    <option value={'TX'}>TX</option>
                    <option value={'UT'}>UT</option>
                    <option value={'VA'}>VA</option>
                    <option value={'VT'}>VT</option>
                    <option value={'WA'}>WA</option>
                    <option value={'WI'}>WI</option>
                    <option value={'WV'}>WV</option>
                    <option value={'WY'}>WY</option>
                </select>
                <input className='state-search-button' id='submit' type='submit' value='Submit' />              
              </form>
            </div>
          </div>
        </div>

        <div className='restrictions'>
          {(loading && !error) && <p>Loading...</p>}
          {error && <p>An error occurred; please try again.</p>}

          {(!loading && res) && 
            (
              <div>
                {res[0].registration && res[0].registration.length > 0 && 
                  (
                    <div>
                      <h2 className='restriction-area highlight'>Voter Registration:</h2>
                      <em>This state has <strong>restrictive laws</strong> related to the following:</em>
                      <ul>
                        {res[0].registration.map((item, index) => <li key={index}>{item}</li>)}
                      </ul>
                    </div>
                  )
                }

                {res[1].representation && res[1].representation.length > 0 && 
                  (
                    <div>
                      <h2 className='restriction-area highlight'>Representation & Participation:</h2>
                      <em>This state has <strong>restrictive laws</strong> related to the following:</em>
                      <ul>
                        {res[1].representation.map((item, index) => <li key={index}>{item}</li>)}
                      </ul>
                    </div>
                  )
                } 

                {res[2].inperson && res[2].inperson.length > 0 && 
                  (
                    <div>
                      <h2 className='restriction-area highlight'>In-Person Voting:</h2>
                      <em>This state has <strong>restrictive laws</strong> related to the following:</em>
                      <ul>
                        {res[2].inperson.map((item, index) => <li key={index}>{item}</li>)}
                      </ul>
                    </div>
                  )
                }

                {res[3].bymail && res[3].bymail.length > 0 && 
                  (
                    <div>
                      <h2 className='restriction-area highlight'>Voting by Mail:</h2>
                      <em>This state has <strong>restrictive laws</strong> related to the following:</em>
                      <ul>
                        {res[3].bymail.map((item, index) => <li key={index}>{item}</li>)}
                      </ul>
                    </div>
                  )
                }

                {res[4].security && res[4].security.length > 0 && 
                  (
                    <div>
                      <h2 className='restriction-area highlight'>Election Security:</h2>
                      <em>This state has <strong>restrictive laws</strong> related to the following:</em>
                      <ul>
                        {res[4].security.map((item, index) => <li key={index}>{item}</li>)}
                      </ul>
                    </div>
                  )
                }

                {res[5].independence && res[5].independence.length > 0 && 
                  (
                    <div>
                      <h2 className='restriction-area highlight'>Independence & Integrity:</h2>
                      <em>This state has <strong>restrictive laws</strong> related to the following:</em>
                      <ul>
                        {res[5].independence.map((item, index) => <li key={index}>{item}</li>)}
                      </ul>
                    </div>
                  )
                }

                <h2 className='call-to-action'>Now, prepare to vote!</h2>
              </div>
            )}
          </div>
          <div style={{ marginBottom: "7rem" }}></div>
          <div className='address-form'>
            <AddressSection/>
          </div>
    </div>
  )
}

export default App
