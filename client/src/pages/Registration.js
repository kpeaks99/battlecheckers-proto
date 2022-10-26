import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Registration() {
  let navigate = useNavigate()
  const routeChange = () =>{ 
    if(username != '' & password != '' & email != ''){
      let path = "/dashboard"
      navigate(path);
    }
  }
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
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
        
        <input 
          type="text" 
          placeholder='email@website.com'
          required
          onChange={(e) => setEmail(e.target.value)}/>

        <button className='register-btn' onClick={routeChange}>Register</button>
      </form>
      
    </div>
  );
}

export default Registration