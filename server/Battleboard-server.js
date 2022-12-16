//get from index.js
// const express = require('express');
// const router = express.Router();
// const app = express();
// const http = require('http');
const { Server } = require('socket.io');
// //const server = require('./index.js');
// //const http = require('http');
// const server = http.createServer(app);

const express = require('express');
const router = express.Router();
const app = express();
const http = require('http');
const cors = require("cors");   //allows us to self refrence our computer to be both host and client
const db = require('./models');

const server = http.createServer(app);

//app.use(cors());

//current players
const players = {};
//current active games
const games = {};

//testing
var squareCounter = 0;


const io = new Server(server, {
    cors: { 
       origin: "http://localhost:3000",
       methods: ["GET", "POST"],
   } 
   }); 

   io.on('connection', (socket) => {
    //notify when a user connects
    console.log('a user connected: ' + socket.id);
    // show size of players
    const num = Object.keys(players).length;
    console.log(`player size is now: ${num+1}`);

    //var playerUID = null;

    
    
    //give player an id when they join
    players[socket.id] = {
        playerId: socket.id,
        playerGameUID: '',
        gameID: '',
        disconnected: false,
    };
    console.log(players);

//io.to(games[roomID].player2.playerId).emit('update_board', board, true); 
    // games[roomID] = {
    //     player1: players[socket.id],
    //     player2: '',
    // }; 
    //games[keys].player1.playerId
                        // v function is called as soon as the user connects
    socket.on('register',  (data) => {
        if (data !== null) {
            //there was something in localstorage
            for(keys in games){
                console.log("game before reconnecting")
                console.log(games)

                //this doesn't work properly
                //becuase im on the same machine, localstorage is the same for both players
                //can't thoroughly test this
                console.log("DATA is this UID for the user that disconnects ")
                console.log("games[keys].player1.playerGameUID: " + games[keys].player1.playerGameUID + " data: " + data);
                console.log("games[keys].player2.playerGameUID: " + games[keys].player2.playerGameUID + " data: " + data);
                //if player1 or player2 is the same as the data(the user's generated id are the same) for this game
                //                      playerID
                // games[players[socket.id].disconnected] = true;
                //console.log("this this thing on????")
                console.log(games[keys].player1.playerGameUID === data)
                console.log(games[keys].player1.disconnected)
                if(games[keys].player1.playerGameUID == data && games[keys].player1.disconnected == true){ 
                    console.log("@@@@@@player1 is RECONNECTING@@@@@@@");
                    //probably ask other player to give their board state
                    //give this player 
                    //games[keys].player1.playerId = data;
                    //players[socket.id].playerId = data;
                    players[socket.id].playerGameUID = data;
                    //turn keys into integer
                    players[socket.id].gameID = Number(keys);
                    games[keys].player1 = players[socket.id];
                    console.log("game AFTER reconnecting")
                    console.log(games)
                    //SHOULD ALSO ASK THE OTHER PLAYER FOR THEIR BOARD STATE
                    //io.to(games[keys].player2.playerId).emit('ask_board_state');
                    return;
                }
                if(games[keys].player2.playerGameUID == data && games[keys].player2.disconnected == false){
                    console.log("@@@@@@@@@player2 is RECONNECTING");
                    //games[keys].player2.playerId = data;
                    players[socket.id].playerGameUID = data;
                    players[socket.id].gameID = Number(keys);
                    games[keys].player2 = players[socket.id];
                    //SHOULD ALSO ASK THE OTHER PLAYER FOR THEIR BOARD STATE
                    console.log("game AFTER reconnecting")
                    console.log(games)
                    //io.to(games[keys].player1.playerId).emit('ask_board_state');
                    return;
                }
            }

            // if (game.Players.existsUID(data)) {
            //     player = game.Players.getByUID(data);
            //     player.disconnected = false;
            // } else {
            //     //timed out, create new player
            // }
        } /*else{
            //localStorage is not set, create new player
            console.log("new player: making UID");
            io.to(socket.id).emit('new_player');
        }*/

        console.log("registering player test ");
    });

    //called from MatchMaking.js
    socket.on('update_playerID',  (UID,roomID,playerColor) => { 
        //update players.playerId to the data
        players[socket.id].playerGameUID = UID;
        // if(playerColor){
        //     //player is red
        //     games[roomID].player1 = players[socket.id];
        // }
        // else{
        //     //player is black
        //     games[roomID].player2 = players[socket.id];
        // }
        //games[roomID].player1.playerGameUID = UID;
        console.log("updating playerID: " + UID);
    });

    //for testing, it's for the two players to click 
    socket.on('square_click', (roomID,playerColor) => {
        //console.log(games);
        squareCounter++
        console.log("square clicked" + squareCounter);
        //true is red, false is black
        if(playerColor){
            io.to(games[roomID].player1.playerId).emit('update_square', squareCounter, false);
            io.to(games[roomID].player2.playerId).emit('update_square', squareCounter, true); 
        }
        else
        {
            io.to(games[roomID].player1.playerId).emit('update_square', squareCounter, true);
            io.to(games[roomID].player2.playerId).emit('update_square', squareCounter, false);
        }
        // io.to(games[roomID].player1.playerId).emit('update_square', squareCounter);
        // io.to(games[roomID].player2.playerId).emit('update_square', squareCounter); 
    })

    //testing purposes
    socket.on('test_connection',(roomID)=>{
        console.log("test connection");
        io.to(games[roomID].player1.playerId).emit('test_recieve', roomID);
        io.to(games[roomID].player2.playerId).emit('test_recieve', roomID);
    })

    //update the board and a player finished their turn
    socket.on('board_update', (board, roomID, playerColor, reconnect) => { 
        console.log("board update");
        // console.log(players);
        console.log(games[roomID]); 

        io.to(games[roomID].player2.playerId).emit('test_recieve',);  
        io.to(games[roomID].player1.playerId).emit('test_recieve',);  
        //if RED player finished their turn
        if(playerColor){
            //send board and true(red) boolean to black player 
            //console.log(games[roomID].player2.playerId); 
            io.to(games[roomID].player2.playerId).emit('update_board', board, true, reconnect);  
        }
        //else if BLACK player finished their turn
        else
        {   //send board and false(black) boolean to red player 
            io.to(games[roomID].player1.playerId).emit('update_board', board, false,reconnect);
        }
    })

    socket.on('join_room', (roomID) => {  

        //iterate through players to find socket.id with matching gameID
        for(keys in players){
            if(players[keys].gameID == roomID){
                if(games[roomID].player2 === ''){
                    players[socket.id].gameID = roomID;
                    //players[keys].gameID = roomID;
                    games[roomID].player2 = players[socket.id];
                    console.log("player 2 joined NEW LOOP");
                    // take them to gameboard
                    //false = black player2
                    //true = red player1
                    console.log(games[roomID]);
                    //players[socket.id].playerGameUID = Math.floor(Math.random() * 1000000000);
                    //players are also given a random number to identify themselves for when they reconnect
                    var1 = Math.floor(Math.random() * 1000000000);
                    var2 = Math.floor(Math.random() * 1000000000);
                    io.to(games[roomID].player1.playerId).emit('begin_game', true, roomID, var1);
                    io.to(games[roomID].player2.playerId).emit('begin_game', false, roomID, var2); 
                    // console.log(games[roomID]);
                    return;
                }
            }
        }

        //give the joining player(player2) the host's(player1) gameID
        // players[socket.id].gameID = roomID;

        // //checks to see if player 2 slot is empty
        // //console.log(roomid.joingame)
        // console.log(players[socket.id]); 
        // if(games[roomID].player2 === ''){
        //     games[roomID].player2 = players[socket.id];
        //     console.log("player 2 joined");

        //     // take them to gameboard
        //     //false = black player2
        //     //true = red player1
        //     console.log(games[roomID]);
        //     io.to(games[roomID].player1.playerId).emit('begin_game', true, roomID);
        //     io.to(games[roomID].player2.playerId).emit('begin_game', false, roomID); 
        //     // console.log(games[roomID]);
        // }
            
    });

   
    //hosting a game
    socket.on('start_game', (roomID, matchMaking) => {

        //if the game being started is being hosted(false), there the boardID to user
        //
        //else, if you are doing QuickPlay(true), don't send the boardID
        //PRIVATE PLAY
        if(!matchMaking)
        {
            //set gameID to current player number, this is their room
            players[socket.id].gameID = roomID;
            games[roomID] = {
                player1: players[socket.id],
                player2: '',
            };
        console.log(games[roomID]);
        socket.emit('game_created', true, players, roomID);
        }
        else
        //QUICKPLAY
        {
            //search for a game that is not full
            //if games is empty, create a new game
            if(Object.keys(games).length === 0){
                //if no games are found, create a new game
                //set gameID to current player number, this is their room
                players[socket.id].gameID = roomID;
                games[roomID] = {
                    player1: players[socket.id],
                    player2: '',
                };
                console.log(games[roomID]);
                socket.emit('game_created', true, players, roomID);
                return;
            }
     
            //iterate through games to find the first game that is not full
            //keys = gameID 
            for(var keys in games)
            {
                if(games[keys].player2 === ''){
                    //join the game
                    games[keys].player2 = players[socket.id];
                    //give the joining player(player2) the host's(player1) gameID
                    players[socket.id].gameID = games[keys].player1.gameID;
                    console.log("player 2 joined");
                    // take them to gameboard
                    //false = black player2
                    //true = red player1
                    console.log(games[keys]);
                    var1 = Math.floor(Math.random() * 1000000000);
                    var2 = Math.floor(Math.random() * 1000000000);
                    io.to(games[keys].player1.playerId).emit('begin_game', true, games[keys].player1.gameID, var1);
                    io.to(games[keys].player2.playerId).emit('begin_game', false, games[keys].player1.gameID, var2);
                    return;
                }
            }


            // for(var i = 0; i < Object.keys(games).length; i++){
            //     if(games[i].player2 === ''){
            //         //join the game
            //         games[i].player2 = players[num];
            //         //give the joining player(player2) the host's(player1) gameID
            //         players[num].gameID = games[i].player1.gameID;
            //         console.log("player 2 joined");
            //         // take them to gameboard
            //         //false = black player2
            //         //true = red player1
            //         io.to(games[i].player1.playerId).emit('begin_game', true, games[i].player1.gameID);
            //         io.to(games[i].player2.playerId).emit('begin_game', false, games[i].player1.gameID); 
            //         console.log(games[i]);
            //         // break;
            //         return;
            //     }
            // }
            //if no games are found, create a new game
            //set gameID to current player number, this is their room
            players[socket.id].gameID = roomID;
            games[roomID] = {
                player1: players[socket.id],
                player2: '',
            };
            console.log(games[roomID]);
            socket.emit('game_created', true, players, roomID); 
        }
        
    });

    //maybe send over the entire/updated boardgame state
    socket.on('change_turn', (playerTurn, board, roomID) => {
        {
            console.log(games[roomID]);
            var isGameover = false;
            if(playerTurn){
                io.to(games[roomID].player1.playerId).emit('change_turn', playerTurn, board);
            }
            else{
                io.to(games[roomID].player2.playerId).emit('change_turn', playerTurn, board);
            }
        }})

    
    socket.on('forfeit_player', (playerColor, roomID) => {
        console.log("forefeit");
        if(playerColor){
            io.to(games[roomID].player2.playerId).emit('forfeit', playerColor);
            io.to(games[roomID].player1.playerId).emit('forfeit', playerColor);
        }
        else{
            io.to(games[roomID].player1.playerId).emit('forfeit', playerColor);
            io.to(games[roomID].player2.playerId).emit('forfeit', playerColor);
        }
    })

        // players[num] = {
        //     playerId: socket.id,
        //     gameID: '',
        // };
        //problem: the object of the player that leaves doesn't get deleted from the players array
    socket.on('disconnect', () => {
            // delete user from players as they disconnect
            // does not work when there are only two players on the server
        // for(var i = 0; i < Object.keys(players).length; i++){
        //     //console.log("player " + i + " is " + players[i].playerId);
        //     console.log(i);
        //     console.log(players);
        //     if(players[i].playerId === socket.id){ 
        //         console.log("deleted player: " + socket.id + " form position " + i);
        //         // delete players[index]; 
        //         //delete players[i];
        //         players.splice(i, 1);
        //         console.log("after user was deleted");
        //         console.log(players);
        //         //delete socket.id; 
        //         return;    
        //     }
        // }

        //delete user from players as they disconnect
        // for(var keys in players){
        //     if(players[keys].playerId === socket.id){
        //         console.log("deleted player: " + socket.id + " form position " + keys);
        //         delete players[keys];
        //         //players.splice(keys, 1);
        //         console.log("after user was deleted");
        //         console.log(players);
        //         return;
        //     }
        // }

        // players.filter(function(player){
        //     return player.playerId !== socket.id;
        // })

        //games[keys].player1.playerId
        //players[socket.id].disconnected = true; 

        //if the player's game is not undefined, set the player's disconnected to true
        if(players[socket.id].gameID !== ''){
            console.log("player disconnected from game: " + players[socket.id].gameID + " with id: " + socket.id);
            //have the player in games[players[socket.id].gameID] set disconnected to true
            if(games[players[socket.id].gameID].player1.playerId === socket.id){
                games[players[socket.id].gameID].player1.disconnected = true;
            }
            if(games[players[socket.id].gameID].player2.playerId === socket.id){
                games[players[socket.id].gameID].player2.disconnected = true;
            }

            setTimeout(function(){
                //if the user has not reconnected, delete them from the players array
                //if(players[socket.id].disconnected){
                if(games[players[socket.id].disconnected]){
                    console.log("deleted player with timer: " + socket.id);
                    //delete games[players[socket.id]];
                    delete players[socket.id];
                } 
            }, 3000); 
        }
        else{
            delete players[socket.id];
        }
        //the timer is set to 10 seconds to allow the user to reconnect
        
    
        //delete players[socket.id];
            
    });
});

//switching app to server
server.listen(3001, () => {
    console.log("Server running on port 3001");
  });