import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/battleboard.css';

    function Square(props) {
      return (
        <button className={"square " + props.className} onClick={props.onClick}>
            {props.value && <span className={`piece${props.value.color}`}>{props.value.king ? '♕' : 'O'}</span>}
        </button> // The above statement will place a piece based on color and king state
      );
    }
  
  class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(64).fill(null),
            redTurn: true,
            turnCount: 0,
            pieceClicked: -1, // This stores the index of the piece clicked. -1 means that we are still deciding on a piece to click
        };
        this.fillPieces();
    }

    fillPieces() { // This will fill the Array, squares, with pieces. These pieces are Objects that tell which color the piece is, and whether it is a king
      this.state.squares = this.state.squares.map((square, i) => {
        if (i < 24 && this.colorAtIndex(i) == 'blackSquare') { // Places black pieces
          return {
            color: 'Black',
            king: false,
          };
        }
        else if (i > 39 && this.colorAtIndex(i) == 'blackSquare') { // Places red pieces
          return {
            color: 'Red',
            king: false,
          };
        }
      })
    }

    validMoves(i) { /* Checks for valid moves and pushes the indices into an array, which it returns.
                       i-9 is top left    | i-7 is top right
                       i+7 is bottom left | i+9 is bottom right */
        let result = []; // Result will be an array of Objects containing openSpace and jumpedPiece
                         // openSpace will be the space a piece can move to as a valid move
                         // jumpedPiece will be the index of a piece that will be jumped for a valid move

        if (i%8 != 0) { // Jumps for everything NOT in the first column
          if (this.state.squares[i].color == 'Red' || this.state.squares[i].king) {
            if (i > 9 && !this.state.squares[i-9]) result.push({openSpace: i-9, jumpedPiece: null})
            if (i > 18 && !this.state.squares[i-18] && this.state.squares[i-9] 
               && this.state.squares[i-9].color != this.state.squares[i].color) result.push({openSpace: i-18, jumpedPiece: i-9})
          }
          if (this.state.squares[i].color == 'Black' || this.state.squares[i].king) {
            if (i < 56 && !this.state.squares[i+7]) result.push({openSpace: i+7, jumpedPiece: null})
            if (i < 47 && !this.state.squares[i+14] && this.state.squares[i+7]
              && this.state.squares[i+7].color != this.state.squares[i].color) result.push({openSpace: i+14, jumpedPiece: i+7})
          }
        }

        if (i%8 != 7) { // Jumps for everything NOT in the last column
          if (this.state.squares[i].color == 'Red' || this.state.squares[i].king) {
            if (i > 7 && !this.state.squares[i-7]) result.push({openSpace: i-7, jumpedPiece: null})
            if (i > 16 && !this.state.squares[i-14] && this.state.squares[i-7]
              && this.state.squares[i-7].color != this.state.squares[i].color) result.push({openSpace: i-14, jumpedPiece: i-7})
          }
          if (this.state.squares[i].color == 'Black' || this.state.squares[i].king) {
            if (i < 55 && !this.state.squares[i+9]) result.push({openSpace: i+9, jumpedPiece: null})
            if (i < 46 && !this.state.squares[i+18] && this.state.squares[i+9]
              && this.state.squares[i+9].color != this.state.squares[i].color) result.push({openSpace: i+18, jumpedPiece: i+9})
          }
        }

        console.log(result);
        return result;
    }

    handleClick(i) {    
        const squares = this.state.squares.slice();
        if (calculateWinner(squares)) {
            return;
        }
        if (this.state.pieceClicked == -1 && this.state.redTurn && squares[i]?.color == 'Red') { // This checks if it is red's turn, and if piece clicked is red
          if (this.validMoves(i).length == 0) return // If there is no valid moves, go back to piece selection without changing turns
          this.setState({
            squares: squares,
            redTurn: this.state.redTurn,
            pieceClicked: i, // Updates the current state to contain the index of piece clicked (if there are valid moves)
          }, () => console.log(this.state.pieceClicked))
          return;
        }
        if (this.state.pieceClicked == -1 && !this.state.redTurn && squares[i]?.color == 'Black') { // This checks if it is black's turn, and if piece clicked is black
          if (this.validMoves(i).length == 0) return; // If there is no valid moves, go back to piece selection without changing turns
          this.setState({
            squares: squares,
            redTurn: this.state.redTurn,
            pieceClicked: i, // Updates the current state to contain the index of piece clicked (if there are valid moves)
          }, () => console.log(this.state.pieceClicked))
          return;
        }
        if (this.state.pieceClicked != -1) {
          const validMove = this.validMoves(this.state.pieceClicked).find((validMove) => validMove.openSpace == i)
          if (validMove) {
            if (squares[this.state.pieceClicked].color == 'Red' && i < 8 || squares[this.state.pieceClicked].color == 'Black' && i > 55) {
              squares[this.state.pieceClicked].king = true;
            }
            squares[i] = squares[this.state.pieceClicked];
            squares[this.state.pieceClicked] = null;
            if (validMove.jumpedPiece) squares[validMove.jumpedPiece] = null;
            this.setState({
              squares: squares,
              redTurn: !this.state.redTurn,
              pieceClicked: -1,
            })
          }
            else this.setState({
              squares:squares,
              redTurn: this.state.redTurn,
              pieceClicked: -1,
            })
        }

        return;
    }

    colorAtIndex(i) { // This function dictates if a square on the board is to be colored white or black
      if (i%16 < 8) {
        return i%2 == 0 ? 'whiteSquare' : 'blackSquare'
      }
      else {
        return i%2 == 0 ? 'blackSquare' : 'whiteSquare'
      }
    }
    
    render(square) {
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.redTurn ? 'Red' : 'Black');
      }
  
      const arraySquares = this.state.squares.map(
        (square, i) => <Square
          value={square}
          onClick={() => this.handleClick(i)}
          className = {this.state.pieceClicked == i ? 'selectedSquare' : this.colorAtIndex(i)}
        />
      )

      const boardRows = []
      for (let i=0;i<8;i++) { // This loop splits the board into rows, forming a chessboard
        boardRows.push(( <div className="board-row">
          {arraySquares.slice(i*8,i*8+8)}
          </div>))
      }
      return (
        <div className="board-container">
          <div className="status">{status}</div>
          {boardRows}
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
            <Board />
      );
    }
  }
  
  function calculateWinner(squares) {
    if (!squares.find((piece)=>piece?.color == 'Black')) return 'Red'; // Checks if there are any Black pieces remaining. If not, Red wins
    if (!squares.find((piece)=>piece?.color == 'Red')) return 'Black'; // Checks if there are any Red pieces remaining. If not, Black wins
    return null;
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);

  export default Board;