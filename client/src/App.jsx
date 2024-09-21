import { useState, useEffect } from 'react'
import './App.css'
import useSWRMutation from 'swr/mutation';
import HeroSection from './HeroSection.jsx'

async function fetcher(url) {
  const response = await fetch(url)
  return response.json()
}

function App() {
  const [state, setState] = useState('')
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
    alert('Learn more information');
  }

  const handleSecondaryCtaClick = () => {
    const formContainer = document.getElementById('voter-info-container');
    if (formContainer) {
      formContainer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='App'>
        <HeroSection title='Understand your voting rights' 
                   subtitle='Search for your state to see important voting restrictions and learn how they affect you.'
                   backgroundImage='https://images.unsplash.com/photo-1597700331582-aab3614b3c0c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                   ctaText='Learn more'
                   onCtaClick={handleCtaClick}
                   secondaryCtaText='Search your state'
                   onSecondaryCtaClick={handleSecondaryCtaClick}
        />
        <div id='voter-info-container'>
          <h3 className='voter-info-title'>Learn more about <span>Voter</span> <span className='highlight'>Restrictions</span></h3>

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

        {(loading && !error) && <p>Loading...</p>}
        {error && <p>An error occurred; please try again.</p>}

        {(!loading && res) && 
          (
            <ul>
              <li>
                Registration:
                <ul>
                  {res[0].registration && res[0].registration.length > 0 && res[0].registration.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </li>
              <li>
                Representation:
                <ul>
                  {res[1].representation && res[1].representation.length > 0 && res[1].representation.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </li>
              <li>
                In-Person:
                <ul>
                  {res[2].inperson && res[2].inperson.length > 0 && res[2].inperson.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </li>
              <li>
                By Mail:
                <ul>
                  {res[3].bymail && res[3].bymail.length > 0 && res[3].bymail.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </li>
              <li>
                Security:
                <ul>
                  {res[4].security && res[4].security.length > 0 && res[4].security.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </li>
              <li>
                Independence:
                <ul>
                  {res[5].independence && res[5].independence.length > 0 && res[5].independence.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </li>
            </ul>
          )}
    </div>
  )
}

export default App
