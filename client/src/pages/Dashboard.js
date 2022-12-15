import React from 'react'
import './css/dashboard-style.css';
import axios from "axios";
import {useEffect, useState} from "react"

function Dashboard() {
  const [leaderBoardStats, setLeaderBoard] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/stats/leaderboard").then((response) => {     //Axios call to server for leaderboard route
      console.log(response);                                                      // should log user stats
      setLeaderBoard(response.data);                                              // stets leaderboard stats as the response data
    });
  }, {});
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="dash-container">
        <div className='dash news'>News
          <p>gdsgds</p>
        </div>
        <div className='dash lead'>Leaderboard
          <p>{leaderBoardStats.map((value,key) => {       //the retrieved leaderboard stats is mapped to a key value pair
                return(
                      <div className ="stats">
                        <div className ="player"> UserName: {value.playerStat.name}</div>   
                        <div className ="wins"> Wins: {value.wins}</div>
                        <div className ="losts"> Losts: {value.losts}</div>
                        <div className ="draw"> Draw: {value.draw}</div>
                        <br/>
                      </div>
                );
            
           })}
           </p>  
           </div>

      </div>
    </div>
    
  )
}

export default Dashboard