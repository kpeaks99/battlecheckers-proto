import React, {useState} from "react";
import './css/title.css';
import Axios from 'axios';

function Login(){

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    // const user = JSON.stringify({ name: usernameReg, password: passwordReg});

    // const customConfig = {
    //     headers: {
    //     'Content-Type': 'application/json'
    //     }
    // };


    const registerUser = () => {
        Axios.post('http://localhost:8080/loginreg/registerUser', {
            username: usernameReg,
            password: passwordReg,
        }).then((response) => {
            console.log(response);
        });
        console.log(usernameReg + passwordReg);
    };
    // const headers = {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'JWT fefege...'
    //   }
    //   const registerUser = Axios.post('http://localhost:8080/loginreg', user, {
    //       headers: headers
    //     })
    //     .then((response) => {
    //         console.log(response);
    //     });
    //     console.log(usernameReg + passwordReg);


//     const usersName = JSON.stringify({ name: 'John Doe' });
// const result = await axios.post('https://testapi.org/post', usersName);

    return(
    <div className="titlepage">
        <div>
        <h1>Registration</h1>
        <label>Username</label>
        <input type="text" 
        onChange={(e) => {
            setUsernameReg(e.target.value);
        }}/>
        <label>Password</label>
        <input type="text"
        onChange={(e) => {
            setPasswordReg(e.target.value);
        }}/>
        <button onClick={registerUser}>Register</button>
        </div>


        <div>
        <h1>Login</h1>
        <label>Username</label>
        <input type="text"/>
        <label>Password</label>
        <input type="text"/>
        <button>Login</button>
        </div>
    </div>
        

    );
}

export default Login;