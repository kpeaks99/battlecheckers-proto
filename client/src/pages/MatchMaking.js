import axios from 'axios';
import React from 'react'
import {useContext, useEffect,useState} from 'react'
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../helper/AuthContext";

//we take the socket from the context/socket and pass it here
import { SocketContext } from "../context/socket";

function MatchMaking() {
  
  const navigate = useNavigate();

  //this is the same socket from the context
  const socket = useContext(SocketContext);

  const [gameID, setGameID] = useState("");
  const [joingame, setJoinGame] = useState("");

  //when the user clicks the join game button(with the right code), send the room number to the server
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
   const [authState, setAuthState] = useState({
    username: "", 
    id: 0, 
    status: false});
//when the user clicks the start game button(or was it host game?)),
//create a random roomID and emit it to the server
//waits for other player to join
const startGame= (matchMaking) => {
  

  axios.get('http://localhost:8080/loginreg/auth', {headers: {
    webToken: localStorage.getItem('webToken'),
  },
}).then((response) => {
    if (response.data.error) {
      setAuthState({...authState, status: false});
    } else {
      setAuthState({
        username: response.data.username, 
        id: response.data.id, 
        status: true});
    }
  });


  //create random roomID 
  var randomID = Math.floor((Math.random() * 1000) + 1);
  //send randomID to server
  socket.emit('start_game', randomID,matchMaking);

 
 };

 useEffect(() => {
    
  //there is currently no user_join on the server
  socket.on('user_joined', (data) => {
    alert("Player " + data.user + " joined room " + data.room);
  })

  // host game until a player joins
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
  socket.on('begin_game', (playerColor, roomID, gameUID) => {
    //match was successful
    //link to boardgame the playerColor and gameID

    //setting UID for player 1 and 2
    if (playerColor) {
      localStorage.setItem('User1UID', gameUID); //Red
      socket.emit('update_playerID', gameUID,roomID,playerColor); //gameID
      console.log(localStorage.getItem('User1UID') + " is the gameUID");
    }
    else {
      localStorage.setItem('User2UID', gameUID); //Black
      socket.emit('update_playerID', gameUID,roomID,playerColor); //gameID
      console.log(localStorage.getItem('User2UID') + " is the gameUID");
    }

    //THIS is to reset the board that was previously saved before loading into match
    localStorage.setItem('checkerboardState', '');

    //console.log(localStorage.getItem('UserUID') + " is the gameUID");
    //console.log("NAVIGATING to boardgame hello hello hello hello");
    navigate('/battleboard', 
      {state: {playerColor: playerColor, gameID: roomID}});
    
  });

 }, /*[socket]*/)

  return (
    <div>
      <input type="text" placeholder="Enter room number" onChange={(e) => setJoinGame(e.target.value)} />
      <button onClick={joinRoom}>Join Room</button>
      <h1>{joingame}</h1>
      {/* <input type="text" placeholder="Enter Username" onChange={(e) => setUser(e.target.value)} /> */}
      <button onClick={() => {startGame(false)}}>Host Game</button>
      <button onClick={() => {startGame(true)}}>QuickPlay</button>
      <h1>Current RoomID: {gameID}</h1>
      {/*when user hosts a game, it will display 'waiting for opponent...'*/}
      {gameID !== "" ? <h2> Waiting for opponent...</h2> : <h2></h2>}
    </div>
  );
}

export default MatchMaking