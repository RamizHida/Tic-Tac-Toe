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
  const playerInto = () => {
    console.log(
      `Welcome ${name}, your weapon of choice is ${weapon.toUpperCase()}`
    );
  };
  return { name, playerInto, weapon };
};

const player1 = new Players("Ramiz", "x");
const player2 = new Players("Riad", "o");

// player1.playerInto();
// player2.playerInto();

//

// gameBoard.field.addEventListener("click", clicked);

function clicked(e) {
  let player1turn = document.querySelector("#player1");
  let player2turn = document.querySelector("#player2");
  let dataNum = Number(e.target.getAttribute("data-num"));
  if (player1.turn) {
    console.log("p1");
    gameBoard.board.splice(dataNum, 1, player1.weapon);
    gameBoard.display();
    player1.turn = false;
    player1turn.textContent = "Please Wait";
    player2turn.textContent = "Your turn";
    return (player2.turn = true);
  }

  if (player2.turn) {
    console.log("p2");
    gameBoard.board.splice(dataNum, 1, player2.weapon);
    gameBoard.display();
    player2.turn = false;
    player1.turn = true;
    player2turn.textContent = "Please Wait";
    player1turn.textContent = "Your turn";
  }
}

// Keeping track whose turn it is
const game = function (player1, player2) {
  player1.turn = true;
  player2.turn = false;
  return { player1, player2 };
};
game(player1, player2);
