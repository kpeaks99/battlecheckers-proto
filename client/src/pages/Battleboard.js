import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './css/battleboard.css';

    function Square(props) {
      return (
        <button className={"square " + props.className} onClick={props.onClick}>
            {props.value && <span className={`piece${props.value.color}`}>{props.value.king ? '♕' : 'O'}</span>}
        </button> // The above statement will place a piece based on color and king state
      );
    }
  
  function Board() { 
      const [state,setState] = useState({
            squares: fillPieces(Array(64).fill(null)),
            redTurn: true,
            turnCount: 0,
            pieceClicked: -1, // This stores the index of the piece clicked. -1 means that we are still deciding on a piece to click
        });

        return (
          <div className="board-container">
            <div className="status">{determineStatus(state)}</div>
            {makeBoard(state, setState)}
          </div>
        );
    }

  function makeBoard(state, setState) {
    const arraySquares = state.squares.map(
      (square, i) => <Square
        value={square}
        onClick={() => handleClick(i, state, setState)}
        className = {state.pieceClicked == i ? 'selectedSquare' : colorAtIndex(i)}
      />
    )

    const boardRows = []
    for (let i=0;i<8;i++) { // This loop splits the board into rows, forming a chessboard
      boardRows.push(( <div className="board-row">
        {arraySquares.slice(i*8,i*8+8)}
        </div>))
    }

    return boardRows;
  }

  function determineStatus(state) {
    const winner = calculateWinner(state.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (state.redTurn ? 'Red' : 'Black');
      }

      return status;
  }
  
  function fillPieces(squares) { // This will fill the Array, squares, with pieces. These pieces are Objects that tell which color the piece is, and whether it is a king
    return squares.map((square, i) => {
      if (i < 24 && colorAtIndex(i) == 'blackSquare') { // Places black pieces
        return {
          color: 'Black',
          king: false,
        };
      }
      else if (i > 39 && colorAtIndex(i) == 'blackSquare') { // Places red pieces
        return {
          color: 'Red',
          king: false,
        };
      }
    })
  }

  function validMoves(i, squares) { /* Checks for valid moves and pushes the indices into an array, which it returns.
                     i-9 is top left    | i-7 is top right
                     i+7 is bottom left | i+9 is bottom right */
      let result = []; // Result will be an array of Objects containing openSpace and jumpedPiece
                       // openSpace will be the space a piece can move to as a valid move
                       // jumpedPiece will be the index of a piece that will be jumped for a valid move

      if (i%8 != 0) { // Jumps for everything NOT in the first column
        if (squares[i].color == 'Red' || squares[i].king) {
          if (i > 9 && !squares[i-9]) result.push({openSpace: i-9, jumpedPiece: null})
          if (i > 18 && !squares[i-18] && squares[i-9] 
             && squares[i-9].color != squares[i].color) result.push({openSpace: i-18, jumpedPiece: i-9})
        }
        if (squares[i].color == 'Black' || squares[i].king) {
          if (i < 56 && !squares[i+7]) result.push({openSpace: i+7, jumpedPiece: null})
          if (i < 47 && !squares[i+14] && squares[i+7]
            && squares[i+7].color != squares[i].color) result.push({openSpace: i+14, jumpedPiece: i+7})
        }
      }

      if (i%8 != 7) { // Jumps for everything NOT in the last column
        if (squares[i].color == 'Red' || squares[i].king) {
          if (i > 7 && !squares[i-7]) result.push({openSpace: i-7, jumpedPiece: null})
          if (i > 16 && !squares[i-14] && squares[i-7]
            && squares[i-7].color != squares[i].color) result.push({openSpace: i-14, jumpedPiece: i-7})
        }
        if (squares[i].color == 'Black' || squares[i].king) {
          if (i < 55 && !squares[i+9]) result.push({openSpace: i+9, jumpedPiece: null})
          if (i < 46 && !squares[i+18] && squares[i+9]
            && squares[i+9].color != squares[i].color) result.push({openSpace: i+18, jumpedPiece: i+9})
        }
      }

      return result;
  }

  function handleClick(i, state, setState) {    
      if (calculateWinner(state.squares)) {
          return;
      }
      if (state.pieceClicked == -1 && state.redTurn && state.squares[i]?.color == 'Red') { // This checks if it is red's turn, and if piece clicked is red
        if (validMoves(i, state.squares).length == 0) return // If there is no valid moves, go back to piece selection without changing turns
        setState({
          squares: state.squares,
          redTurn: state.redTurn,
          turnCount: state.turnCount,
          pieceClicked: i, // Updates the current state to contain the index of piece clicked (if there are valid moves)
        })
        return;
      }
      if (state.pieceClicked == -1 && !state.redTurn && state.squares[i]?.color == 'Black') { // This checks if it is black's turn, and if piece clicked is black
        if (validMoves(i, state.squares).length == 0) return; // If there is no valid moves, go back to piece selection without changing turns
        setState({
          squares: state.squares,
          redTurn: state.redTurn,
          turnCount: state.turnCount,
          pieceClicked: i, // Updates the current state to contain the index of piece clicked (if there are valid moves)
        })
        return;
      }
      if (state.pieceClicked != -1) {
        const validMove = validMoves(state.pieceClicked, state.squares).find((validMove) => validMove.openSpace == i)
        if (validMove) {
          if (state.squares[state.pieceClicked].color == 'Red' && i < 8 || state.squares[state.pieceClicked].color == 'Black' && i > 55) {
            state.squares[state.pieceClicked].king = true;
          }
          state.squares[i] = state.squares[state.pieceClicked];
          state.squares[state.pieceClicked] = null;
          if (validMove.jumpedPiece) state.squares[validMove.jumpedPiece] = null;
          setState({
            squares: state.squares,
            redTurn: !state.redTurn,
            turnCount: ++state.turnCount,
            pieceClicked: -1,
          })
        }
          else setState({
            squares: state.squares,
            redTurn: state.redTurn,
            turnCount: state.turnCount,
            pieceClicked: -1,
          })
      }

      return;
  }

  function colorAtIndex(i) { // This function dictates if a square on the board is to be colored white or black
    if (i%16 < 8) {
      return i%2 == 0 ? 'whiteSquare' : 'blackSquare'
    }
    else {
      return i%2 == 0 ? 'blackSquare' : 'whiteSquare'
    }
  }
  
  function calculateWinner(squares) {
    if (!squares.find((piece)=>piece?.color == 'Black')) return 'Red'; // Checks if there are any Black pieces remaining. If not, Red wins
    if (!squares.find((piece)=>piece?.color == 'Red')) return 'Black'; // Checks if there are any Red pieces remaining. If not, Black wins
    return null;
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Board />);

  export default Board;