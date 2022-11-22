import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Registration() {
  let navigate = useNavigate()


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async e => {
    e.preventDefault();
    const user = {username, email};
    const response = await axios.post(
      "http://localhost:8080/user/registration",
      user
    )
    let path = "/user/login"
    navigate(path);
  };
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

        <button className='register-btn' onClick={handleSubmit}>Register</button>
      </form>
      
    </div>
  );
}

export default Registration