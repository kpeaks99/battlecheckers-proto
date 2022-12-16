import './css/profile.css';
import axios from "axios";
import {useEffect, useState} from "react"

function Profile() {
  const [listOfStats, setListOfStats] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/stats").then((response) => {       //axios call to route stats
      console.log(response);                                            //console logs user stat
      setListOfStats(response.data);                                    //store response data in list of stats
    });
  }, {});
  return (
    <div className='pageContainer'>
       <h1>Profile</h1>
      {listOfStats.map((value,key) => {return <div className="user"> {value.name}</div>
      })}
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