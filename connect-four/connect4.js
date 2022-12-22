/** Connect Four
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */


const WIDTH = 7; /* number of cells in each row */ 
const HEIGHT = 6; /* number of rows excluding the top row */


let currPlayer = 1; /* active player: 1 or 2 */
let board = []; /* array of rows, each row is array of cells  (board[y][x]) */



/* This function initializes the board variable as a two-dimensional
 array representing the game board. */
function makeBoard() {

  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++) { /* loop HEIGHT(6) times to make rows */
    board[i] = new Array(WIDTH).fill(null) /* make HEIGHT(6) rows
    and add WIDTH(7) cells for each row */ 
  }
}


/* This function creates an HTML table representation of the game board
 and adds it to the DOM */
function makeHtmlBoard() {

  const htmlBoard = document.querySelector("#board"); /* get "htmlBoard" variable from 
  the item in HTML w/ID of "board" */

  const top = document.createElement("tr"); /* create tr element for top row */ 
  top.setAttribute("id", "column-top"); /* set top row id attribute to column top */
  top.addEventListener("click", handleClick); /* add click event listener to top row */

  for (let x = 0; x < WIDTH; x++) { /* loop WIDTH(7) times to make cells for top row */
    const headCell = document.createElement("td"); /* create td elemnt in each loop */
    headCell.setAttribute("id", x); /* give each td id attribute set it to its index */
    top.append(headCell); /* append each cell to top row */
  }
  htmlBoard.append(top); /* append top row to html board */

  for (let y = 0; y < HEIGHT; y++) { /* loop HEIGHT(6) tiimes to make rows */
    const row = document.createElement("tr"); /* make row for each loop */
    for (let x = 0; x < WIDTH; x++) { /* loop WIDTH(7) times in each row to make cells */
      const cell = document.createElement("td"); /* create a cell in each loop */
      cell.setAttribute("id", `${y}-${x}`); /* give each cell id attribute
      and set the attribute to index of row its at and index of its cell */
      row.append(cell); /* append each cell to row */
    }
    htmlBoard.append(row); /* append row to htmlBoard */
  }
}

/*  this function returns the top empty row for a given column. */
function findSpotForCol(x) {

  for (let y = HEIGHT - 1; y >= 0; y--) { /* loop from bottom row to top row */
    if (!board[y][x]) { /* loop until it finds an empty cell */
      return (y); /* then return the row there is empty cell in it */
    }
  }
  return null; /* if no empty cell was found return null */
}


/* this function updates the DOM to place a game piece at the given cell (y, x coordinates). */
function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div"); /* create a div element*/
  piece.classList.add("piece"); /* add class piece to div */
  piece.classList.add(`p${currPlayer}`); /* add class current player to div */


  const emptyTD = document.getElementById(`${y}-${x}`); /* get the empty cell */
  if (!emptyTD) {} /* if emptyTD is not empty skip (error handling code) */
  else {
    emptyTD.append(piece); /* if its empty append piece dic to empty cell */
  }
}


/* this function alerts a message when game is finished */
function endGame(msg) {
  // TODO: pop up alert message
  return alert(msg) /* if game ended alert msg */
}


/* this function is called when a cell in the top row of the HTML table is clicked.
 It places a game piece on the board and checks for a win. if no one win switches player */
function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id; /* get index of clicked cell in top row */

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x); /* get last empty row */
  if (y === null) { /* if no empty row found skip code */
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer; /* give cell player number */
  placeInTable(y, x);


  /* this function checks the in-memory board for a win by the current player.
  if true game ends. */
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`); /* check if one of the
    players won. if so, end game and show which player won. */
  }

  // check for tie
  // TODO: 
  if (board.every(row => row.every(cell => cell))) {
    /* check if all cells in board are filled; if so, call endGame game is tie */
    return endGame("No One Wins! The Game Is Tie.")
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1; /* switch player */
}


/* this function checks if the current player has won the game yet. */
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
    /* check all 4 cells [y, x] indices are within bounds of the board.  */
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        /* also check if all the 4 cells belong to current player  */
        board[y][x] === currPlayer
    );
  }


  for (let y = 0; y < HEIGHT; y++) { /* loop HEIGHT(6) times */
    for (let x = 0; x < WIDTH; x++) { /* loop WIDTH(7) times */
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      /* chech for same four consecutive horizontal pieces */
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      /* chech for same four consecutive vertical pieces */
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      /* chech for same four consecutive diagonal from up-left to down right pieces */
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      /* chech for same four consecutive diagonal from up-right to down-left pieces */
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        /* if any of 4 directions true return true */
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
