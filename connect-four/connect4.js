/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])


/* this function creates an in-memory representation of the game board as a two-dimensional array */
function makeBoard() {
  for (let i = 0; i < HEIGHT; i++) {
    board[i] = new Array(WIDTH).fill(null);
  }
}

/* this function generates the HTML elements that make up the game board as it appears on the page */
function makeHtmlBoard() {
  const htmlBoard = document.querySelector("#board");
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

  // TODO: add comment for this code
  /* This code creates a top row element in the HTML table and adds a "click" event listener
   to it. It then creates a cell element for each column in the table and adds it to the
   row. Finally, it appends the row element to the HTML table.*/
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  /* this code creates row then creates the cells for the row. and assign id to cells.
  then add cells to row and add row to table board. */
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/* this  function determines the next available row in a given column where a game piece can be placed */
function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}


/* this function updates the HTML board to show the game piece at a specific row and column on the board */
function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  if (!spot) {
    // element with specified ID was not found
    // added error handling code here
  } else {
    spot.append(piece);
  }}


  /*this function displays a message when the game ends */
function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}


/* this function handles player moves by placing a game piece in the selected column and checking for a win or tie. */
function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */


/* this function checks the board to see if a player has won the game. */
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH && 
      
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  /* Check if a player has won the game by looping through the game board
 */
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {

      /*  Define arrays representing four potential winning patterns: horizontal, vertical, diagonal (top-left to bottom-right), and diagonal (top-right to bottom-left) */
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      /* Check if any of the winning patterns are present on the game board by calling the _win function */
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
