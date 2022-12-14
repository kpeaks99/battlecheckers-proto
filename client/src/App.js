import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Title from './pages/Title';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Tourney from './pages/Tourney';
import Profile from './pages/Profile';
import Battleboard from './pages/Battleboard';
import MatchMaking from './pages/MatchMaking';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className='sidebar'>
        <Link to="/dashboard">Dashboard </Link>
        <Link to="/battleboard">Battleboard </Link>
        <Link to="/MatchMaking">MatchMaking </Link>
        <Link to="/tourney">Tournaments </Link>
        <Link to="/stats">Profile </Link>
        <Link to="/user/login">Title </Link>
        <Link to="/Login">Register</Link>
      </div>
      <Routes>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Login/registerUser" element={<Login/>}/>
        <Route path="/user/login" element={<Title/>}/>
        <Route path="/user/registration" element={<Registration/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/tourney" element={<Tourney/>}/>
        <Route path="/stats" element={<Profile/>}/>
        <Route path="/battleboard" element={<Battleboard/>}/>
        <Route path="/matchmaking" element={<MatchMaking/>}/>
      </Routes>
    </Router>);
}

export default App;