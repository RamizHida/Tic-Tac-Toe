// Game start
let play = document.querySelector(".play--btn");
let trackPlayer = document.querySelector(".players");
play.addEventListener("click", startgame);

function startgame() {
  play.style.display = "none";
  trackPlayer.style.display = "flex";
}

// Create gameboard
const gameBoard = (function () {
  let field = document.querySelector(".container");
  let children = field.children;
  let board = ["x", "x", "x", "o", "o", "o", "x", "x", "x"];
  display: function display() {
    for (let i = 0; i < children.length; i++) {
      let displayChoice = document.createElement("span");
      displayChoice.textContent = board[i];
      children[i].appendChild(displayChoice);
    }
  }
  return { display };
})();

gameBoard.display();

// Create players
const Players = function (name, weapon) {
  const playerInto = () => {
    console.log(
      `Welcome ${name}, your weapon of choice is ${weapon.toUpperCase()}`
    );
  };
  return { name, weapon, playerInto };
};

const player1 = new Players("Ramiz", "O");
const player2 = new Players("Riad", "x");

player1.playerInto();
player2.playerInto();

//
