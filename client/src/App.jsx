import { useState } from 'react'
import HeroSection from './HeroSection.jsx'
import './App.css'

function App() {
  const [state, setState] = useState(0);

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
          <div className='state-select-wrapper'>
            <label htmlFor='state'>What state are you in? </label>
            <select id='state' name='state' value={state} onChange={e => setState(Number(e.target.value))}>
                <option value={0}>AK</option>
                <option value={1}>AL</option>
                <option value={2}>AR</option>
                <option value={3}>AZ</option>
                <option value={4}>CA</option>
                <option value={5}>CO</option>
                <option value={6}>CT</option>
                <option value={7}>DC</option>
                <option value={8}>DE</option>
                <option value={9}>FL</option>
                <option value={10}>GA</option>
                <option value={11}>HI</option>
                <option value={12}>IA</option>
                <option value={13}>ID</option>
                <option value={14}>IL</option>
                <option value={15}>IN</option>
                <option value={16}>KS</option>
                <option value={17}>KY</option>
                <option value={18}>LA</option>
                <option value={19}>MA</option>
                <option value={20}>MD</option>
                <option value={21}>ME</option>
                <option value={22}>MI</option>
                <option value={23}>MN</option>
                <option value={24}>MO</option>
                <option value={25}>MS</option>
                <option value={26}>MT</option>
                <option value={27}>NC</option>
                <option value={28}>ND</option>
                <option value={29}>NE</option>
                <option value={30}>NH</option>
                <option value={31}>NJ</option>
                <option value={32}>NM</option>
                <option value={33}>NV</option>
                <option value={34}>NY</option>
                <option value={35}>OH</option>
                <option value={36}>OK</option>
                <option value={37}>OR</option>
                <option value={38}>PA</option>
                <option value={39}>RI</option>
                <option value={40}>SC</option>
                <option value={41}>SD</option>
                <option value={42}>TN</option>
                <option value={43}>TX</option>
                <option value={44}>UT</option>
                <option value={45}>VA</option>
                <option value={46}>VT</option>
                <option value={47}>WA</option>
                <option value={48}>WI</option>
                <option value={49}>WV</option>
                <option value={50}>WY</option>
            </select>
          </div>
          <button className='state-search-button'>Search</button>
        </div>
      </div>
    </div>
  )
}

export default App
