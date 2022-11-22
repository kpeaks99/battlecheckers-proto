
import './css/profile.css';
import axios from "axios";
import {useEffect, useState} from "react"

function Profile() {
  const [listOfStats, setListOfStats] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/stats").then((response) => {
      console.log(response);  
      setListOfStats(response.data);
    });
  }, {});
  return (
    <div>
      <h1>Profile</h1>
      <div className="profile-container">
        <div className='profile stats'>Stats
          <p>{listOfStats.map((value,key) => {
                return(
                      <div className ="stats">
                        <div className ="player">{value.player_id}</div>
                        <div className ="wins">{value.wins}</div>
                        <div className ="losts">{value.losts}</div>
                        <div className ="draw">"{value.draw}</div>
                      </div>
                );
              
          })}
          </p>  
        </div>
        <div className='profile friends'>Friends List</div>
      </div>
    </div>
  )
}

export default Profile