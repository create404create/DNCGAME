const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const resetButton = document.querySelector(".tic-tac-toe button");

let currentPlayer = "X"; // Human is "X", Computer is "O"
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click (Human move)
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

    if (gameState[clickedCellIndex] !== "" || !gameActive) return;

    // Human makes a move
    makeMove(clickedCellIndex, currentPlayer);

    // Check if the game is over after human's move
    if (checkForWinner()) return;

    // Switch to computer's turn
    currentPlayer = "O";
    statusText.textContent = "Computer is thinking...";

    // Computer makes a move after a short delay
    setTimeout(computerMove, 500);
}

// Make a move (update game state and UI)
function makeMove(index, player) {
    gameState[index] = player;
    cells[index].textContent = player;
}

// Computer's move (simple AI)
function computerMove() {
    let availableCells = gameState
        .map((cell, index) => cell === "" ? index : null)
        .filter(index => index !== null);

    if (availableCells.length > 0) {
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        makeMove(randomIndex, currentPlayer);

        // Check if the game is over after computer's move
        if (checkForWinner()) return;

        // Switch back to human's turn
        currentPlayer = "X";
        statusText.textContent = "Your turn (X)";
    }
}

// Check for a winner or draw
function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") continue;
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return true;
    }

    if (!gameState.includes("")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return true;
    }

    return false;
}

// Reset the game
function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Your turn (X)";
    cells.forEach(cell => cell.textContent = "");
}

// Add event listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

// Initialize game status
statusText.textContent = "Your turn (X)";
