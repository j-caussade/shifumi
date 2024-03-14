// VARIABLES:
const startGame = document.querySelector("#start_game");
const playerComputer = document.querySelector("#player_computer");
const computerComputer = document.querySelector("#computer_computer");

let playerOrComputer = true;

const kindPlayer = document.querySelector("#kind_player");
const panelControl = document.querySelector("#panel_control");

const displayPlayer = document.querySelector("#left");
const displayComputer = document.querySelector("#right");
const moves = document.querySelectorAll(".moves");

let displayScorePlayer = document.querySelector("#score_player");
let displayscoreComputer = document.querySelector("#score_computer");
let scorePlayer = 0;
let scoreComputer = 0;

const endGame = document.querySelector("#end_game");
const partyMessage = document.querySelector("#party_message");
const reStart = document.querySelector("#re_start");

// PARTY:
endGame.style.display = "none";

playerComputer.addEventListener("click", playParty);
computerComputer.addEventListener("click", watchParty);

function playParty() {
	startGame.style.display = "none";
	kindPlayer.textContent = "Player";
	panelControl.style.visibility = "visible";
	playerOrComputer = true;
}

function watchParty() {
	startGame.style.display = "none";
	kindPlayer.textContent = "Computer";
	panelControl.style.visibility = "hidden";
	playerOrComputer = false;
}

// PLAYER:
for (let i = 0; i < moves.length; i++) {
	moves[i].addEventListener("click", party);
}
function party(event) {
	const movePlayer = event.target.id;

	displayPlayer.innerHTML = "";

	const move = document.createElement("img");
	move.setAttribute("id", movePlayer);
	move.src = `./img/${movePlayer}.png`;
	displayPlayer.appendChild(move);

	const movesComputer = ["papper", "rock", "scissors"];
	const randomMove = Math.floor(Math.random() * movesComputer.length);

	displayComputer.innerHTML = "";

	// COMPUTER:
	const moveComputer = document.createElement("img");
	moveComputer.setAttribute("id", movesComputer[randomMove]);
	moveComputer.src = `./img/${movesComputer[randomMove]}.png`;
	moveComputer.style.transform = "rotateY(180deg)";
	displayComputer.appendChild(moveComputer);

	// VICTORY:
	if (movePlayer == movesComputer[randomMove]) {
		return;
	} else if (
		(movePlayer == "papper") & (movesComputer[randomMove] == "rock") ||
		(movePlayer == "rock") & (movesComputer[randomMove] == "scissors") ||
		(movePlayer == "scissors") & (movesComputer[randomMove] == "papper")
	) {
		scorePlayer++;
	} else {
		scoreComputer++;
	}

	displayScorePlayer.textContent = scorePlayer;
	displayscoreComputer.textContent = scoreComputer;

	if (scorePlayer == 10) {
		endGame.style.display = "flex";
		partyMessage.textContent = "Victory !";
	}

	if (scoreComputer == 10) {
		endGame.style.display = "flex";
		partyMessage.textContent = "Defeat !";
	}

	reStart.addEventListener("click", reset);

	// RESET:
	function reset() {
		scorePlayer = 0;
		scoreComputer = 0;
		displayScorePlayer.textContent = scorePlayer;
		displayscoreComputer.textContent = scoreComputer;
		displayPlayer.innerHTML = "";
		displayComputer.innerHTML = "";
		endGame.style.display = "none";
		startGame.style.display = "flex";
	}
}
