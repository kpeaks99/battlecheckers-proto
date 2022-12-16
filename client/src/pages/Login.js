import React, {useState, useContext} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../helper/AuthContext";
import './css/title.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {authState ,setAuthState} = useContext(AuthContext);

  let navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:8080/loginreg/login", data).then((response) => {
      // identifies error if there are any
      if (response.data.error) {
      alert(response.data.error);
      }else{
      // pass in the actual webToken key as an Item in the local storage.
      localStorage.setItem("webToken", response.data.token);
      setAuthState(response.data);
      console.log("LOGIN SUCCESS GOING TO PROFILE" + authState)
      navigate('/stats');
      }
    });
  };
    return (
    <div className='pageContainer'>
      <h1>Login</h1>
      <div className="formContainer">
        <label>Username:</label>
        <input
          type="text"
          placeholder='Email'
          required
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder='Password'
          required
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <button className='login-btn' onClick={login}> Login </button>
        <p id="message"></p> 
      </div>
    </div>
  );
}

export default Login;