let gameMode = "";
let boardSize = 3;

const screens = document.querySelectorAll(".screen");


// SHOW SCREEN
function showScreen(screenId){

  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  document
    .getElementById(screenId)
    .classList.add("active");
}


// SELECT MODE
function selectMode(mode){

  gameMode = mode;

  showScreen("sizeScreen");
}


// START COUNTDOWN
function startCountdown(size){

  boardSize = size;

  showScreen("countdownScreen");

  let count = 3;

  const countdown =
    document.getElementById("countdown");

  countdown.textContent = count;

  const timer = setInterval(() => {

    count--;

    countdown.textContent = count;

    if(count <= 0){

      clearInterval(timer);

      startGame();
    }

  },1000);
}


// START GAME
function startGame(){

  showScreen("gameScreen");

  createBoard();

  document.getElementById("status")
    .textContent =
    gameMode === "computer"
    ? "You vs Computer"
    : "Player X Turn";
}


// CREATE BOARD
function createBoard(){

  const board =
    document.getElementById("board");

  board.innerHTML = "";

  board.style.gridTemplateColumns =
    `repeat(${boardSize},80px)`;

  let currentPlayer = "X";

  for(let i=0;i<boardSize*boardSize;i++){

    const cell =
      document.createElement("div");

    cell.classList.add("cell");

    cell.style.width = "80px";
    cell.style.height = "80px";

    cell.addEventListener("click", () => {

      if(cell.textContent !== ""){
        return;
      }

      cell.textContent = currentPlayer;

      if(gameMode === "player"){

        currentPlayer =
          currentPlayer === "X"
          ? "O"
          : "X";

        document.getElementById("status")
          .textContent =
          `Player ${currentPlayer} Turn`;

      }else{

        setTimeout(() => {

          computerMove();

        },500);
      }

    });

    board.appendChild(cell);
  }
}


// COMPUTER MOVE
function computerMove(){

  const cells =
    document.querySelectorAll(".cell");

  let emptyCells = [];

  cells.forEach(cell => {

    if(cell.textContent === ""){
      emptyCells.push(cell);
    }

  });

  if(emptyCells.length === 0){
    return;
  }

  const randomCell =
    emptyCells[
      Math.floor(Math.random()*emptyCells.length)
    ];

  randomCell.textContent = "O";
}


// GO HOME
function goHome(){

  showScreen("homeScreen");
}