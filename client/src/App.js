import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Battleboard from './pages/Battleboard';
import MatchMaking from './pages/MatchMaking';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContext } from './helper/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState({
    username: "", 
    id: 0, 
    status: false});

  useEffect(() => {
    axios.get('http://localhost:8080/loginreg/auth', {headers: {
      webToken: localStorage.getItem('webToken'),
    },
  }).then((response) => {
      if (response.data.error) {
        setAuthState({...authState, status: false});
      } else {
        setAuthState({
          username: response.data.username, 
          id: response.data.id, 
          status: true});
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("webToken");
    setAuthState({username: "", 
    id: 0, 
    status: false});
  }

  return (
    <AuthContext.Provider value={{authState, setAuthState}}>
    <Router>
      <div className='sidebar'>
        <Link to="/dashboard">Dashboard </Link>
        {/* <Link to="/battleboard">Battleboard </Link> */}
        {/* <Link to="/MatchMaking">MatchMaking </Link> */}
        {/* <Link to="/tourney">Tournaments </Link> */}
        <Link to="/MatchMaking">MatchMaking </Link>
        <Link to="/Profile">Profile </Link>

      
        {!authState.status ? (<>
        
        <Link to="/Login">Login</Link>
        <Link to="/Register">Register</Link>
        </>
        ) : (
          <button onClick={logout}> Logout</button>
        )}
      </div>
      <Routes>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        {/* <Route path="/tourney" element={<Tourney/>}/> */}
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/battleboard" element={<Battleboard/>}/>
        <Route path="/matchmaking" element={<MatchMaking/>}/>
      </Routes>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;