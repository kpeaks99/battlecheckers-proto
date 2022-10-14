import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Registration() {
  let navigate = useNavigate()
  const routeChange = () =>{ 
    let path = "/dashboard"; 
    navigate(path);
  }
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  return (
    <div className='titlepage'>
      <h1>BattleCheckers</h1>
      <form>
        <label>Username </label>
        <input 
          type="text" 
          required
          onChange={(e) => setUsername(e.target.value)}/>

        <label>Password </label>
        <input 
          type="text" 
          required
          onChange={(e) => setPassword(e.target.value)}/>
        
        <label>Email </label>
        <input 
          type="text" 
          required
          onChange={(e) => setEmail(e.target.value)}/>

        <button className='register-btn' onClick={routeChange}>Register</button>
      </form>
      
    </div>
  );
}

export default Registration