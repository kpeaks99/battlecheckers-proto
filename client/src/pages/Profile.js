import './css/profile.css';
import axios from "axios";
import {useEffect, useState, useContext} from "react"
import { AuthContext } from "../helper/AuthContext";


function Profile() {
  const [listOfStats, setListOfStats] = useState([]);
  const {authState} = useContext(AuthContext);
  useEffect(() => {
   
    axios.get("http://localhost:8080/stats",{headers: {
      webToken: localStorage.getItem('webToken')}}).then((response) => {
      console.log(response);  
      setListOfStats(response.data);
    });
  }, {});
  return (
    <div className='pageContainer'>
       <h1>Profile</h1>
      <div className="profile-container">
        <div className='profile-stats'>Stats
        <p>{listOfStats.map((value,key) => {
                return(
                      <div className ="stats">
                        <div className ="player"> UserName: {value.name}</div>
                        <div className ="wins"> Wins: {value.playerStat.wins}</div>
                        <div className ="losts"> Losts: {value.playerStat.losts}</div>
                        <div className ="draw"> Draw: {value.playerStat.draw}</div>
                      </div>
                );
            
          })}
          </p> 
        </div>

      </div>
    </div>
  )
}

export default Profile

