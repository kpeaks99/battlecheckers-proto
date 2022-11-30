import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Title from './pages/Title';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Tourney from './pages/Tourney';
import Profile from './pages/Profile';
import Battleboard from './pages/Battleboard';
import Boardgame from './pages/Boardgame';

function App() {
  return (
    <Router>
      <div className='sidebar'>
        <Link to="/dashboard">Dashboard </Link>
        <Link to="/battleboard">Battleboard </Link>
        {/* will need to hide the boardgame in the future */}
        <Link to="/boardgame">Boardgame </Link>
        <Link to="/tourney">Tournaments </Link>
        <Link to="/profile">Profile </Link>
        <Link to="/">Title </Link>
      </div>
      <Routes>
        <Route path="/" element={<Title/>}/>
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/tourney" element={<Tourney/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/battleboard" element={<Battleboard/>}/>
        <Route path="/boardgame" element={<Boardgame/>}/>
      </Routes>
    </Router>);
}

export default App;
