
const { Server } = require('socket.io');

const express = require('express');
const router = express.Router();
const app = express();
const http = require('http');


const server = http.createServer(app);

//app.use(cors());

//current players
const players = {};
//current active games
const games = {};


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

                console.log(games[keys].player1.playerGameUID === data)
                console.log(games[keys].player1.disconnected)
                //if the player that disconnected is player1 or player2
                if(games[keys].player1.playerGameUID == data && games[keys].player1.disconnected == true){ 
                    console.log("player1 is RECONNECTING");
                    //set data(UID) to connected player
                    players[socket.id].playerGameUID = data;
                    //turn keys into integer, give connected player the gameID
                    players[socket.id].gameID = Number(keys);
                    //assign to player1
                    games[keys].player1 = players[socket.id];
                    console.log("game AFTER reconnecting")
                    console.log(games)
                    return;
                }
                if(games[keys].player2.playerGameUID == data && games[keys].player2.disconnected == false){
                    console.log("player2 is RECONNECTING");
                    //set data(UID) to connected player
                    players[socket.id].playerGameUID = data;
                    //turn keys into integer, give connected player the gameID
                    players[socket.id].gameID = Number(keys);
                    //assign to player2
                    games[keys].player2 = players[socket.id];
                    console.log("game AFTER reconnecting")
                    console.log(games)
                    return;
                }
            }
        } 
        console.log("registering player test ");
    });

    //called from MatchMaking.js
    socket.on('update_playerID',  (UID,roomID,playerColor) => { 
        //update players.playerId to the data
        players[socket.id].playerGameUID = UID;
        console.log("updating playerID: " + UID);
    });

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
            //find the room that the player is trying to join
            if(players[keys].gameID == roomID){
                //if player2 is not tacken
                if(games[roomID].player2 === ''){
                    players[socket.id].gameID = roomID;
                    //players[keys].gameID = roomID;
                    games[roomID].player2 = players[socket.id];
                    console.log("player 2 joined NEW LOOP");
                    // take them to gameboard
                    //false = black player2
                    //true = red player1
                    console.log(games[roomID]);
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
    });

   
    //hosting a game
    socket.on('start_game', (roomID, matchMaking) => {

        //if the game being started is being hosted(false), there the boardID to user
        //
        //else, if you are doing QuickPlay(true), don't send the boardID
        //PRIVATE PLAY for hosting a game
        //if matchmaking is not selected
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
        //if matchmaking is selected
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
                    //players are also given a random number to identify themselves for when they reconnect
                    var1 = Math.floor(Math.random() * 1000000000);
                    var2 = Math.floor(Math.random() * 1000000000);
                    io.to(games[keys].player1.playerId).emit('begin_game', true, games[keys].player1.gameID, var1);
                    io.to(games[keys].player2.playerId).emit('begin_game', false, games[keys].player1.gameID, var2);
                    return;
                }
            }
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

    //when a player forfeits, signal both players that the game is over
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
    socket.on('disconnect', () => {

        //if the player's game is not undefined, set the player's disconnected to true
        if(players[socket.id].gameID !== ''){
            console.log("player disconnected from game: " + players[socket.id].gameID + " with id: " + socket.id);
            //have the player in games[players[socket.id].gameID] set disconnected to true
            //basically set disconnected to true if player1 or player2 is the one disconnecting
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
    });
});

//switching app to server
server.listen(3001, () => {
    console.log("Server running on port 3001");
  });