
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
       <h1>Profile 
      </h1>
      {listOfStats.map((value,key) => {return <div className="user"> {value.player_name}</div>
      })}
      <div className="profile-container">
        <div className='profile stats'>Stats
          <p>{listOfStats.map((value,key) => {
                return(
                      <div className ="stats">
                        <div className ="player">{value.name}</div>
                        <div className ="wins">{value.playerStat.wins}</div>
                        <div className ="losts">{value.playerStat.losts}</div>
                        <div className ="draw">{value.playerStat.draw}</div>
                      </div>
                );
            
          })}
          </p>  
        </div>
        <div className='profile friends'>Friends List
        <p> {listOfStats.map((value,key) => {
                return(
                      <div className ="friendsList">
                        
                        <div className ="friends">{value.player.friend.name}</div>
                      
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