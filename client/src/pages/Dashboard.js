import React from 'react'
import './css/dashboard-style.css';
import axios from "axios";
import {useEffect, useState} from "react"

function Dashboard() {
  const [leaderBoardStats, setLeaderBoard] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/stats/leaderboard").then((response) => {
      console.log(response);  
      setLeaderBoard(response.data);
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
          <p>{leaderBoardStats.map((value,key) => {
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