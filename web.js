const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.page-section');

function showSection(id) {
  sections.forEach(section => section.classList.remove('active'));
  document.querySelector(id).classList.add('active');
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(link.getAttribute('href'));
  });
});

// Default view
showSection('#home');

// Tic Tac Toe Game
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

function handleCellClick(index) {
  if (!gameActive || board[index] !== '') return;
  board[index] = currentPlayer;
  renderBoard();
  if (checkWinner()) {
    statusElement.textContent = `${currentPlayer} wins!`;
    gameActive = false;
  } else if (!board.includes('')) {
    statusElement.textContent = 'Draw!';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `${currentPlayer}'s turn`;
  }
}

function renderBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.textContent = cell;
    cellDiv.addEventListener('click', () => handleCellClick(index));
    boardElement.appendChild(cellDiv);
  });
}

function checkWinner() {
  const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return wins.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusElement.textContent = `${currentPlayer}'s turn`;
  renderBoard();
}

renderBoard();
statusElement.textContent = `${currentPlayer}'s turn`;
