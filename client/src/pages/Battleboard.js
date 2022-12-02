import React, { useEffect,useContext,useState, useRef } from "react"
import { useLocation } from "react-router-dom";
//link stylesheet style.css
import './css/checker-style.css'; 
import io from 'socket.io-client';
import { SocketContext } from "../context/socket";

function Battleboard() {

  //this is the same socket from the context
  const socket = useContext(SocketContext);
  
//using react hook location to get info from home.js, for when game is created
  const location = useLocation();

  //info passed from home.js
  //remember, false is RED, true is BLACK
  //var playerColor = location.state.playerColor 
  const gameID = location.state.gameID
  //const socket = location.state.socket

  //var squareNum = 1;
  const [squareNum, setSquareNum] = useState("");
  const [playerColor, setPlayerColor] = useState(location.state.playerColor);
  //setPlayerTurn(location.state.PlayerColor) 

  //for testing if both players can contribute counting the squares
  const clickCounter = () => {
      console.log("square clicked " + playerColor);
      if(playerColor){
          //playerColor = false;
          setPlayerColor(false);
          socket.emit('square_click', gameID, location.state.playerColor);
      }
      //socket.emit('square_click', gameID);
  };



  useEffect(() => {
      //recieve new +1 data from a player clicking a square
      socket.on('update_square', (data, setInteractive) => {
          setSquareNum(data);
          //playerColor = setInteractive;
          setPlayerColor(setInteractive);
          console.log("squareNum: " + data);
          console.log("This is set to " + setInteractive);

      });

  } ,[socket]);

  return (
      //display text in h2
      <body>
          <main>
      <div>
          <h2>Welcome to the game!</h2>   
          
          <h2>Player Turn: {playerColor ? "It's your turn!" : "Wait for turn..."}</h2>
          
          {/* if THIS playerColor is False, color it red */}
          {location.state.playerColor ? <h2>You are red</h2> : <h2>You are black</h2>}
          <h2>Game ID: {gameID}</h2>  

          {/* for testing */}
          {/* toggcle classname if playerColor is false or true */}
          {/* <h2 className={playerColor ? "black-squareG" : "square"}>Player Turn: {playerColor ? "Black" : "Red"}</h2> */}
           <div className={playerColor ? "squareG" : "square"} id="sq" onClick={clickCounter}> Test click counter for both sides {squareNum}</div>

      </div>
      </main>
      </body>

      

  );

}

export default Battleboard