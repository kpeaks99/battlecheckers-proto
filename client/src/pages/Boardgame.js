import React, { useEffect,useContext,useState, useRef } from "react"
import { useLocation } from "react-router-dom";
//link stylesheet style.css
import './css/checker-style.css'; 
import io from 'socket.io-client';
import { SocketContext } from "../context/socket";

//const socket = io.connect('http://localhost:3001');



function Boardgame() {

    //this is the same socket from the context
    const socket = useContext(SocketContext);
    
 //using react hook location to get info from home.js, for when game is created
    const location = useLocation();



    // These are DOM referenes
    const cells = document.querySelectorAll("td");
    let redsPieces = document.querySelectorAll("p");
    let blacksPieces = document.querySelectorAll("span")
    const redTurnText = document.querySelectorAll(".red-turn-text");
    const blackTurntext = document.querySelectorAll(".black-turn-text");

    //info passed from home.js
    //remember, false is RED, true is BLACK
    //var playerColor = location.state.playerColor 
    const gameID = location.state.gameID
    //const socket = location.state.socket

    //var squareNum = 1;
    const [squareNum, setSquareNum] = useState("");
    const [playerColor, setPlayerColor] = useState(location.state.playerColor);
    //setPlayerTurn(location.state.PlayerColor) 

    const createBoard = () => {
        const board = [];
        for (let i = 0; i < 8; i++) {
            board.push([0, 0, 0, 0, 0, 0, 0, 0]);
        }

        for(let i = 0; i < 8; i++){
            // 1 == red piece
            // 2 == black piece
            if(i % 2 === 0){
                board[7][i] = createPiece(7,i,2);
                board[5][i] = createPiece(5,i,2);
                board[1][i] = createPiece(1,i,1);
            }
            else{
                board[6][i] = createPiece(6,i,2);
                board[2][i] = createPiece(2,i,1);
                board[0][i] = createPiece(0,i,1);
            }
        }

    }

    //piece = piece color
    const createPiece = (row, col, piece) => {
        if(piece === 1)
        {
            const piece = document.createElement('td');
            piece.classList.add('red-piece');
            //set piece id

            piece.classList.add('id' + piece);
            piece.setAttribute('data-row', row);
            piece.setAttribute('data-col', col);
            piece.setAttribute('data-piece', piece);
            //piece.addEventListener('click', selectPiece);
            return piece;
        }
        else
        {
            const piece = document.createElement('td');
            piece.classList.add('black-piece');
            piece.classList.add('piece' + piece);
            piece.setAttribute('data-row', row);
            piece.setAttribute('data-col', col);
            piece.setAttribute('data-piece', piece);
            //piece.addEventListener('click', selectPiece);
            return piece;
        }
        
    }

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

             
            <div class="theBoard">
            <table>
            <tr>
                <td class="noPieceHere"></td>
                <td><p class="red-piece" id="0"></p></td>
                <td class="noPieceHere"></td>
                <td><p class="red-piece" id="1"></p></td>
                <td class="noPieceHere"></td>
                <td><p class="red-piece" id="2"></p></td>
                <td class="noPieceHere"></td>
                <td><p class="red-piece" id="3"></p></td>
            </tr>
            <tr>
                <td><p class="red-piece" id="4"></p></td>
                <td class="noPieceHere"></td>
                <td><p class="red-piece" id="5"></p></td>
                <td class="noPieceHere"></td>
                <td><p class="red-piece" id="6"></p></td>
                <td class="noPieceHere"></td>
                <td><p class="red-piece" id="7"></p></td>
                <td class="noPieceHere"></td>
            </tr>
            <tr>
                <td class="noPieceHere"></td>
                <td><p class="red-piece" id="8"></p></td>
                <td class="noPieceHere"></td>
                <td><p class="red-piece" id="9"></p></td>
                <td class="noPieceHere"></td>
                <td><p class="red-piece" id="10"></p></td>
                <td class="noPieceHere"></td>
                <td><p class="red-piece" id="11"></p></td>
            </tr>
            <tr>
                <td></td>
                <td class="noPieceHere"></td>
                <td></td>
                <td class="noPieceHere"></td>
                <td></td>
                <td class="noPieceHere"></td>
                <td></td>
                <td class="noPieceHere"></td>
            </tr>
            <tr>
                <td class="noPieceHere"></td>
                <td></td>
                <td class="noPieceHere"></td>
                <td></td>
                <td class="noPieceHere"></td>
                <td></td>
                <td class="noPieceHere"></td>
                <td></td>
            </tr>
            <tr>
                <td><span class="black-piece" id="12"></span></td>
                <td class="noPieceHere"></td>
                <td><span class="black-piece" id="13"></span></td>
                <td class="noPieceHere"></td>
                <td><span class="black-piece" id="14"></span></td>
                <td class="noPieceHere"></td>
                <td><span class="black-piece" id="15"></span></td>
                <td class="noPieceHere"></td>
            </tr>
            <tr>
                <td class="noPieceHere"></td>
                <td><span class="black-piece" id="16"></span></td>
                <td class="noPieceHere"></td>
                <td><span class="black-piece" id="17"></span></td>
                <td class="noPieceHere"></td>
                <td><span class="black-piece" id="18"></span></td>
                <td class="noPieceHere"></td>
                <td><span class="black-piece" id="19"></span></td>
            </tr>
            <tr>
                <td><span class="black-piece" id="20"></span></td>
                <td class="noPieceHere"></td>
                <td><span class="black-piece" id="21"></span></td>
                <td class="noPieceHere"></td>
                <td><span class="black-piece" id="22"></span></td>
                <td class="noPieceHere"></td>
                <td><span class="black-piece" id="23"></span></td>
                <td class="noPieceHere"></td>
            </tr>
            </table>
            </div>
        </div>
        </main>
        </body>

        

    );

}

export default Boardgame;
