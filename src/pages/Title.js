import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './css/title.css'

function Title() {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  let navigate = useNavigate()
  const routeChange = () =>{ 
    let path = "/dashboard"
    navigate(path);
  }
  
  return (
    <div className='titlepage'>
      <h1>BattleCheckers</h1>
      <form>
        <input 
          type="text" 
          placeholder='Username'
          required
          onChange={(e) => setUsername(e.target.value)}/>

        <input 
          type="text" 
          placeholder='Password'
          required
          onChange={(e) => setPassword(e.target.value)}/>

        <div className='buttons'>
          <button className='register-btn' onClick={() => navigate("/registration")}>Register</button>
          <button className='login-btn' onClick={routeChange}>Login</button>
        </div>
        
      </form>
      
    </div>
  );
}

export default Title;