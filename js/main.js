// VARIABLES:
const startGame = document.querySelector("#start_game");
const playerComputer = document.querySelector("#player_computer");
const computerComputer = document.querySelector("#computer_computer");

let playerVsComputer = true;

const kindPlayer = document.querySelector("#kind_player");
const panelButtons = document.querySelector("#panel_buttons");
const controlPanelHeadline = document.querySelector("#control_panel_headline");
const playButton = document.querySelector("#play");

const displayPlayer = document.querySelector("#left");
const displayComputer = document.querySelector("#right");
const moves = document.querySelectorAll(".moves");
let movePlayer = "";
let automaticMoveComputer = "";

let displayScorePlayer = document.querySelector("#score_player");
let displayscoreComputer = document.querySelector("#score_computer");
let scorePlayer = 0;
let scoreComputer = 0;

const endGame = document.querySelector("#end_game");
const partyMessage = document.querySelector("#party_message");
const reStart = document.querySelector("#re_start");

// GAME:
endGame.style.display = "none";

playerComputer.addEventListener("click", playParty);
computerComputer.addEventListener("click", watchParty);

// PLAYER VS COMPUTER:
function playParty() {
	startGame.style.display = "none";
	kindPlayer.textContent = "Player";
	panelButtons.style.display = "flex";
	playButton.style.display = "none";
	controlPanelHeadline.textContent = "Choose your moves:";

	// Player:
	for (let i = 0; i < moves.length; i++) {
		moves[i].addEventListener("click", selectedMoves);
	}
	function selectedMoves(event) {
		movePlayer = event.target.id;

		displayPlayer.innerHTML = "";

		const move = document.createElement("img");
		move.setAttribute("id", movePlayer);
		move.src = `./img/${movePlayer}.png`;
		displayPlayer.appendChild(move);

		// Computer:
		const movesComputer = ["papper", "rock", "scissors"];
		const randomMove = Math.floor(Math.random() * movesComputer.length);

		displayComputer.innerHTML = "";

		const moveComputer = document.createElement("img");
		moveComputer.setAttribute("id", movesComputer[randomMove]);
		moveComputer.src = `./img/${movesComputer[randomMove]}.png`;
		moveComputer.style.transform = "rotateY(180deg)";
		displayComputer.appendChild(moveComputer);

		// Victory:
		if (movePlayer == movesComputer[randomMove]) {
			return;
		} else if (
			(movePlayer == "papper") &
				(movesComputer[randomMove] == "rock") ||
			(movePlayer == "rock") &
				(movesComputer[randomMove] == "scissors") ||
			(movePlayer == "scissors") &
				(movesComputer[randomMove] == "papper")
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

		// Reset:
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
}

// AUTOMATIC VS COMPUTER:
function watchParty() {
	startGame.style.display = "none";
	kindPlayer.textContent = "Automatic";
	panelButtons.style.display = "none";
	playButton.style.display = "flex";
	controlPanelHeadline.textContent = "Play a round:";

	let autoplay = false;

	playButton.addEventListener("click", startAutoplay());
	function startAutoplay() {
		autoplay = true;
	}

	console.log(autoplay);

	if (autoplay == true) {
		autoplay = false;
		while (scorePlayer < 10 && scoreComputer < 10) {
			// Automatic player:
			function automaticPlayer() {
				const movesComputer = ["papper", "rock", "scissors"];
				const randomMove = Math.floor(
					Math.random() * movesComputer.length
				);
				return movesComputer[randomMove];
			}
			movePlayer = automaticPlayer();

			displayPlayer.innerHTML = "";

			const move = document.createElement("img");
			move.setAttribute("id", movePlayer);
			move.src = `./img/${movePlayer}.png`;
			displayPlayer.appendChild(move);

			// Computer:
			function automaticComputer() {
				const movesComputer = ["papper", "rock", "scissors"];
				const randomMove = Math.floor(
					Math.random() * movesComputer.length
				);
				return movesComputer[randomMove];
			}
			automaticMoveComputer = automaticComputer();

			displayComputer.innerHTML = "";

			const moveComputer = document.createElement("img");
			moveComputer.setAttribute("id", automaticMoveComputer);
			moveComputer.src = `./img/${automaticMoveComputer}.png`;
			moveComputer.style.transform = "rotateY(180deg)";
			displayComputer.appendChild(moveComputer);

			// Victory:
			if (movePlayer == automaticComputer()) {
			} else if (
				(movePlayer == "papper") &
					(automaticMoveComputer == "rock") ||
				(movePlayer == "rock") &
					(automaticMoveComputer == "scissors") ||
				(movePlayer == "scissors") &
					(automaticMoveComputer == "papper")
			) {
				scorePlayer++;
			} else {
				scoreComputer++;
			}

			displayScorePlayer.textContent = scorePlayer;
			displayscoreComputer.textContent = scoreComputer;
		}

		if (scorePlayer == 10) {
			endGame.style.display = "flex";
			partyMessage.textContent = "Victory !";
		}

		if (scoreComputer == 10) {
			endGame.style.display = "flex";
			partyMessage.textContent = "Defeat !";
		}

		reStart.addEventListener("click", reset);

		// Reset:
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
}
