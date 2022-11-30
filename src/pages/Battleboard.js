import React from 'react'
import {useContext, useEffect,useState} from 'react'
import {useNavigate} from "react-router-dom";

//we take the socket from the context/socket and pass it here
import { SocketContext } from "../context/socket";

function Battleboard() {
  const navigate = useNavigate();

  //this is the same socket from the context
  const socket = useContext(SocketContext);

  const [gameID, setGameID] = useState("");
  const [joingame, setJoinGame] = useState("");

  const joinRoom = () => {
    //setJoinGame(joingame);
      if (joingame !== "") {
          console.log("joining room: " + joingame);
   
          //convert joingame into an int
          var join = parseInt(joingame);
          //send the room number to the server
          socket.emit('join_room', join);
          
      }
      else
        console.log("join is empty ")
   };

//when the user clicks the start game button(or was it host game?)),
//create a random roomID and emit it to the server
//waits for other player to join
const startGame= () => {
  //create random roomID 
  var randomID = Math.floor((Math.random() * 30) + 1);
  //send randomID to server
  socket.emit('start_game', randomID);
 
 };

 useEffect(() => {
    
  //there is currently no user_join on the server
  socket.on('user_joined', (data) => {
    alert("Player " + data.user + " joined room " + data.room);
  })

  // starting game
  socket.on('game_created', (isGameCreated,players,roomID) => {
    //if isGameCreated is true, set this current player's gameID to roomID
    if (isGameCreated) {
      setGameID(roomID);
      console.log("gameID: " + roomID + " created");
    }
    else {
      //alert("You have joined a game?");
    }
  });

  //navigate to actual checker board
  socket.on('begin_game', (playerColor, roomID) => {
    //match was successful
    //link to boardgame the playerColor and gameID
    navigate('/boardgame', 
      {state: {playerColor: playerColor, gameID: roomID}});
    
  });

 }, /*[socket]*/)

  return (
    <div>
       <h2>HOME!</h2>   
      <input type="text" placeholder="Enter room number" onChange={(e) => setJoinGame(e.target.value)} />
      <button onClick={joinRoom}>Join Room</button>
      <h1>{joingame}</h1>
      {/* <input type="text" placeholder="Enter Username" onChange={(e) => setUser(e.target.value)} /> */}
      <button onClick={startGame}>Host Game</button>
      <h1>Current RoomID: {gameID}</h1>
      {/*when user hosts a game, it will display 'waiting for opponent...'*/}
      {gameID !== "" ? <h2> Waiting for opponent...</h2> : <h2></h2>}

      {/* these bellow are for testing */}
      <button onClick={() => {
        console.log("NAVIGATING to boardgame");
        navigate("/Scenes/boardgame");
      }}>test join boardgame</button>
      <button onClick={() => {
        console.log("NAVIGATING to boardgame");
        navigate("../test");
      }}>test button</button>
    </div>

  );
}

export default Battleboard