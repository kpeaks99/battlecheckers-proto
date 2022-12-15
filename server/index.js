const express = require('express');
const router = express.Router();
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");   //allows us to self refrence our computer to be both host and client
const db = require('./models');
//app.use(cors());


//current players
const players = {};
//current active games
const games = {};

//testing
var squareCounter = 0;

const server = http.createServer(app);

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions)); //actually using the middleware of Cors to automatically whitelist PC

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
    
    //give player an id when they join
    players[num] = {
        playerId: socket.id,
        gameID: '',
    };
    console.log(players);

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
    socket.on('board_update', (board, roomID, playerColor) => {
        console.log("board update");
        //if RED player finished their turn
        if(playerColor){
            //send board and true(red) boolean to black player 
            io.to(games[roomID].player2.playerId).emit('update_board', board, true);  
        }
        //else if BLACK player finished their turn
        else
        {   //send board and false(black) boolean to red player 
            io.to(games[roomID].player1.playerId).emit('update_board', board, false);
        }
    })

    socket.on('join_room', (roomID) => {  

        //give the joining player(player2) the host's(player1) gameID
        players[num].gameID = roomID;

        //checks to see if player 2 slot is empty
        //console.log(roomid.joingame)
        console.log(players[num]); 
        if(games[roomID].player2 === ''){
            games[roomID].player2 = players[num];
            console.log("player 2 joined");

            // take them to gameboard
            //false = black player2
            //true = red player1
            io.to(games[roomID].player1.playerId).emit('begin_game', true, roomID);
            io.to(games[roomID].player2.playerId).emit('begin_game', false, roomID); 
            console.log(games[roomID]);
        }
            
    });

   
    //hosting a game
    socket.on('start_game', (roomID) => {
        
        //set gameID to current player number, this is their room
        players[num].gameID = roomID;
        games[roomID] = {
            player1: players[num],
            player2: '',
        };
        console.log(games[roomID]);
        socket.emit('game_created', true, players, roomID);
    });

    //maybe send over the entire/updated boardgame state
    socket.on('change_turn', (playerTurn, board, roomID) => {
        {
            var isGameover = false;
            if(playerTurn){
                io.to(games[roomID].player1.playerId).emit('change_turn', playerTurn, board);
            }
            else{
                io.to(games[roomID].player2.playerId).emit('change_turn', playerTurn, board);
            }
        }})

        //problem: the object of the player that leaves doesn't get deleted from the players array
    // socket.on('disconnect', () => {
            //delete user from players as they disconnect
            //does not work when there are only two players on the server
    //     for(var i = 0; i < Object.keys(players).length; i++){
    //         //console.log("player " + i + " is " + players[i].playerId);
    //         console.log(i);
    //         if(players[i].playerId === socket.id){ 
    //             console.log("deleted player: " + socket.id + " form position " + i);
    //             // delete players[index];
    //             delete players[i];
    //             //delete socket.id;
    //             return;  
    //         }
    //     }
            
    // });
});



//Routers
const statsRouter =require ("./routes/Stats");
app.use("/Stats",statsRouter); // Enables post and get requests from the Posts route

const loginRouter =require ("./routes/user");
app.use("/user",loginRouter);  

const newLoginRouter =require ("./routes/loginreg");
app.use("/loginreg", newLoginRouter);


const { sequelize,Sequelize } = require('./models');

app.use(express.json());

const PORT = process.env.PORT || 8080;                      
db.sequelize.sync().then(()=>{                            //connection to mysql database is in the config file under the config.json
    app.listen(PORT, () => {                              //After setting up sequelize for the database listen to PORT 
        console.log(`server started on port ${PORT}`)     //output to console the start of the server on PORT
    });
});

//switching app to server
server.listen(3001, () => {
    console.log("Server running on port 3001");
  });





