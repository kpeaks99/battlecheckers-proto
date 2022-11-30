import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Registration() {
  let navigate = useNavigate()


  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = async e => {
    e.preventDefault();
    const user = {username, email};
    console.log(user);
    const response = await axios.post(
      "http://localhost:8080/user/registration",
      user
    )
    let path = "/user/login" //affter successful regisgration go to login page
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
          value = {username}
          onChange={(e) => setUsername(e.target.value)}/>

        <input 
          type="text"
          placeholder='Password' 
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        
        <input 
          type="text" 
          placeholder='email@website.com'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>

        <button className='register-btn' onClick={handleSubmit}>Register</button>
      </form>
      
    </div>
  );
}

export default Registration