const gameBoard = (() => {
  let board = ['', '', '', '', '', '', '', '', '']

  const getBoard = () => board
  const updateBoard = (index, marker) => {
    if (board[index] === '') {
      board[index] = marker
      return true
    }
    return false
  }
  const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', '']
  }

  return { getBoard, updateBoard, resetBoard }
})()

const Player = (name, marker) => {
  const getName = () => name
  const getMarker = () => marker

  return { getName, getMarker }
}

const displayController = (() => {
  const printBoard = () => {
    const board = gameBoard.getBoard()
    console.log(`
      ${board[0]} | ${board[1]} | ${board[2]}
      ---------
      ${board[3]} | ${board[4]} | ${board[5]}
      ---------
      ${board[6]} | ${board[7]} | ${board[8]}
    `)
  }

  const printResult = (result) => {
    console.log(result)
  }

  const renderBoard = () => {
    const board = gameBoard.getBoard()
    const boardContainer = document.getElementById('board')
    boardContainer.innerHTML = ''
    board.forEach((cell, index) => {
      const cellElement = document.createElement('div')
      cellElement.classList.add('cell')
      cellElement.textContent = cell
      cellElement.addEventListener('click', () => gameController.playRound(index))
      boardContainer.appendChild(cellElement)
    })
  }

  return { printBoard, printResult, renderBoard }
})()

const gameController = (() => {
  const player1 = Player('Player 1', 'X')
  const player2 = Player('Player 2', 'O')
  let currentPlayer = player1

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1
  }

  const checkWinner = () => {
    const board = gameBoard.getBoard()
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return currentPlayer.getName()
      }
    }

    return board.includes('') ? null : 'Draw'
  }

  const playRound = (index) => {
    if (gameBoard.updateBoard(index, currentPlayer.getMarker())) {
      const winner = checkWinner()
      displayController.renderBoard()
      if (winner) {
        displayController.printResult(winner === 'Draw' ? "It's a draw!" : `${winner} wins!`)
        gameBoard.resetBoard()
        displayController.renderBoard()
      } else {
        switchPlayer()
      }
    } else {
      console.log('Invalid move, try again.')
    }
  }

  return { playRound }
})()

displayController.renderBoard()
gameController.playRound(0)
gameController.playRound(1)
gameController.playRound(4)
gameController.playRound(2)
gameController.playRound(8)
