import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:8080/loginreg/login", data).then((response) => {
      if (response.data.error) {
      alert(response.data.error);
      }else{
      sessionStorage.setItem("webToken", response.data);
      navigate('/');
      }
    });
  };
    return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
    </div>
  );
}

export default Login;