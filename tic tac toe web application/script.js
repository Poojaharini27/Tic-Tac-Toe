document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const newGameBtn = document.getElementById('newGameBtn');
    const cells = Array.from({ length: 9 }, (_, index) => createCell(index));
  
    cells.forEach(cell => board.appendChild(cell));
  
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;
  
    function createCell(index) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', () => handleCellClick(index));
      return cell;
    }
  
    function handleCellClick(index) {
      if (!gameOver && gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        if (checkWinner()) {
          alert(`Player ${currentPlayer} wins!`);
          gameOver = true;
        } else if (gameBoard.every(cell => cell !== '')) {
          alert('It\'s a draw!');
          gameOver = true;
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
      }
    }
  
    function checkWinner() {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
      ];
  
      return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
      });
    }
  
    newGameBtn.addEventListener('click', () => {
      resetGame();
    });
  
    function resetGame() {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      cells.forEach(cell => {
        cell.textContent = '';
      });
      currentPlayer = 'X';
      gameOver = false;
    }
  });
  