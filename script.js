const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('game-status');
const newGameBtn = document.getElementById('new-game-btn');

let board = Array(16).fill(''); // 4x4 board represented as a 1D array
let currentPlayer = 'X';
let gameOver = false;

const winningCombinations = [
    // Rows
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    // Columns
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    // Diagonals
    [0, 5, 10, 15],
    [3, 6, 9, 12]
];

function initGame() {
    board = Array(16).fill('');
    currentPlayer = 'X';
    gameOver = false;
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('playerX', 'playerO', 'winning', 'filled');
    });
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.index);

    // If game is over or cell is already filled, do nothing
    if (gameOver || board[clickedCellIndex] !== '') {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(`player${currentPlayer}`, 'filled');

    const winner = checkWinner();
    if (winner) {
        statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
        gameOver = true;
        highlightWinningCells(winner);
        return;
    }

    if (!board.includes('')) { // Check for draw (no empty cells left)
        statusDisplay.textContent = "It's a Draw!";
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c, d] = combination;
        // Check if all four cells in the combination are the same and not empty
        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c] &&
            board[a] === board[d]
        ) {
            return combination; // Return the winning combination of indices
        }
    }
    return null; // No winner
}

function highlightWinningCells(winningCombination) {
    winningCombination.forEach(index => {
        cells[index].classList.add('winning');
    });
}

// Add event listeners once when the script loads
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});
newGameBtn.addEventListener('click', initGame);

// Initial game setup on page load
initGame();
