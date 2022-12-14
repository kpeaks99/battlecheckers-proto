import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/title.css';

function Title() {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState();

  let navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefualt();
    const user = {email, password} ;
    const response = await axios.post(
      "http://localhost:8080/user/login",user
    );
    setUser(response.data)
    localStorage.setItem('user', response.data)
    console.log(response.data)
  };

 
  if(user){
      let path = "/dashboard"
      navigate(path);  
  }else 
  // if there is no user return to log in page
  return (
    <div className='titlepage'>
      <h1>BattleCheckers</h1>
      <form>
        <input 
          type="text" 
          placeholder='Email'
          //value = {Email}
          required
          //onChange={(e) => setEmail(e.target.value)}/>
          />
        <input 
          type="text" 
          placeholder='Password'
          value ={password}
          required
          onChange={(e) => setPassword(e.target.value)}/>

        <div className='buttons'>
          
          <button className='login-btn' onClick={handleSubmit}>Login</button>
          <button className='register-btn' onClick={() => navigate("/user/registration")}>Register</button>
        </div>
        
      </form>
      
    </div>
  );
}

export default Title;