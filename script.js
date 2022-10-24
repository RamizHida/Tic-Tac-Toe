// Game start
let play = document.querySelector(".play--btn");
let trackPlayer = document.querySelector(".players");
play.addEventListener("click", startgame);

function startgame() {
  play.style.display = "none";
  trackPlayer.style.display = "flex";
  gameBoard.field.addEventListener("click", clicked);
}

// Create gameboard
const gameBoard = (function () {
  let field = document.querySelector(".container");
  let children = field.children;
  let board = ["d", "d", "d", "d", "d", "d", "d", "d", "d"];
  display: function display() {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "d") continue;
      children[i].textContent = board[i];
    }
  }
  return { display, board, field, children };
})();

// Create players
const Players = function (name, weapon) {
  weapon = weapon.toUpperCase();
  const playerIntro = () => {
    console.log(
      `Welcome ${name}, your weapon of choice is ${weapon.toUpperCase()}`
    );
  };
  return { name, playerIntro, weapon };
};

const player1 = new Players("Ramiz", "x");
const player2 = new Players("Riad", "o");

// Linking the board to the DOM
function clicked(e) {
  let player1turn = document.querySelector("#player1");
  let player2turn = document.querySelector("#player2");
  let dataNum = Number(e.target.getAttribute("data-num"));
  if (game.player1Wins || game.player2Wins || game.tieGame) return;

  // Check to see if the spot that was clicked is unavaible
  if (gameBoard.board[dataNum] === "X" || gameBoard.board[dataNum] === "O")
    return;

  if (player1.turn) {
    gameBoard.board.splice(dataNum, 1, player1.weapon);
    gameBoard.display();
    game.winner();
    player1.turn = false;
    player1turn.textContent = "Please Wait";
    player2turn.textContent = "Your turn";
    return (player2.turn = true);
  }

  if (player2.turn) {
    gameBoard.board.splice(dataNum, 1, player2.weapon);
    gameBoard.display();
    game.winner();
    player2.turn = false;
    player1.turn = true;
    player2turn.textContent = "Please Wait";
    player1turn.textContent = "Your turn";
  }
}

const game = (function (player1, player2) {
  let player1Wins = 0;
  let player2Wins = 0;
  let tieGame = 0;
  let winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];
  player1.turn = true;
  player2.turn = false;
  let board = gameBoard.board;
  winner: function winner() {
    let locationOfXs = [];
    let locationOfOs = [];

    // Check to see if a player has scored three in a row
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "X") {
        locationOfXs.push(i);
      }
    }
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "O") {
        locationOfOs.push(i);
      }
    }
    let comboX1 = [locationOfXs[0], locationOfXs[1], locationOfXs[2]];
    let comboX2 = [locationOfXs[1], locationOfXs[2], locationOfXs[3]];
    let comboX3 = [locationOfXs[2], locationOfXs[3], locationOfXs[4]];
    //
    let comboO1 = [locationOfOs[0], locationOfOs[1], locationOfOs[2]];
    let comboO2 = [locationOfOs[1], locationOfOs[2], locationOfOs[3]];
    let comboO3 = [locationOfOs[2], locationOfOs[3], locationOfOs[4]];

    for (let i = 0; i < winCombos.length; i++) {
      if (
        arrayEquals(winCombos[i], comboX1) ||
        arrayEquals(winCombos[i], comboX2) ||
        arrayEquals(winCombos[i], comboX3)
      ) {
        game.player1Wins++;
        gameOver();
        return;
      }
      if (
        arrayEquals(winCombos[i], comboO1) ||
        arrayEquals(winCombos[i], comboO2) ||
        arrayEquals(winCombos[i], comboO3)
      ) {
        game.player2Wins++;
        gameOver();
        return;
      }
    }

    // Check to see if every field is full, same as tied game
    if (board.every((input) => input === "X" || input === "O")) {
      game.tieGame++;
      gameOver();
      return;
    }
  }
  // gameOver: function gameOver() {
  //   if (tieGame || player1Wins || player2Wins);
  //   {
  //     console.log("lol");
  //     document.body.style.background = "black";
  //   }
  // }

  return { player1, player2, winner, tieGame, player1Wins, player2Wins };
})(player1, player2);

// checks if winCombos elements is equal to combos of o or x
function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

function gameOver() {
  // let header = document.getElementById("header");
  // let div = document.createElement("div");
  // let finalMessage = document.createElement("h1");
  let displayEnd = document.querySelector(".display--end");
  let results = document.querySelector(".results");
  let body = document.querySelector("body");
  if (game.player1Wins) {
    trackPlayer.style.display = "none";
    gameBoard.field.style.display = "none";
    body.style.backgroundColor = "#000";
    header.style.display = "none";
    displayEnd.style.display = "block";
    results.textContent = "Player 1 Wins!";
    console.log("p1");
  }
  if (game.player2Wins) {
    trackPlayer.style.display = "none";
    gameBoard.field.style.display = "none";
    body.style.backgroundColor = "#000";
    header.style.display = "none";
    displayEnd.style.display = "block";
    results.textContent = "Player 2 Wins!";
    console.log("p2");
  }
  if (game.tieGame) {
    trackPlayer.style.display = "none";
    gameBoard.field.style.display = "none";
    body.style.backgroundColor = "#000";
    header.style.display = "none";
    displayEnd.style.display = "block";
    results.textContent = "Tie Game!";
    console.log("tie");
  }
}
