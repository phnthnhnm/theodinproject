let humanScore = 0
let computerScore = 0

function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3)

  switch (randomNumber) {
    case 0:
      return 'rock'
    case 1:
      return 'paper'
    case 2:
      return 'scissors'
    default:
      return ''
  }
}

function playRound(humanChoice, computerChoice) {
  humanChoice = humanChoice.toLowerCase()
  const resultsDiv = document.getElementById('results')
  const scoreboardDiv = document.getElementById('scoreboard')

  const choiceEmojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️',
  }

  resultsDiv.textContent = ''
  const choiceContainer = document.createElement('div')
  choiceContainer.classList.add('choice-container')

  const humanDiv = document.createElement('div')
  humanDiv.innerHTML = `<div>👨Human:</div><span class="choice-emoji">${choiceEmojis[humanChoice]}</span>`
  choiceContainer.appendChild(humanDiv)

  const vsDiv = document.createElement('div')
  vsDiv.textContent = 'vs'
  choiceContainer.appendChild(vsDiv)

  const computerDiv = document.createElement('div')
  computerDiv.innerHTML = `<div>🖥️Computer:</div><span class="choice-emoji">${choiceEmojis[computerChoice]}</span>`
  choiceContainer.appendChild(computerDiv)

  resultsDiv.appendChild(choiceContainer)

  if (humanChoice === computerChoice) {
    const tieDiv = document.createElement('div')
    tieDiv.textContent = "It's a tie!"
    resultsDiv.appendChild(tieDiv)
  }

  switch (humanChoice) {
    case 'rock':
      if (computerChoice === 'paper') {
        const winDiv = document.createElement('div')
        winDiv.textContent = 'Computer wins!'
        resultsDiv.appendChild(winDiv)
        computerScore++
      } else if (computerChoice === 'scissors') {
        const winDiv = document.createElement('div')
        winDiv.textContent = 'You win!'
        resultsDiv.appendChild(winDiv)
        humanScore++
      }
      break

    case 'paper':
      if (computerChoice === 'scissors') {
        const winDiv = document.createElement('div')
        winDiv.textContent = 'Computer wins!'
        resultsDiv.appendChild(winDiv)
        computerScore++
      } else if (computerChoice === 'rock') {
        const winDiv = document.createElement('div')
        winDiv.textContent = 'You win!'
        resultsDiv.appendChild(winDiv)
        humanScore++
      }
      break

    case 'scissors':
      if (computerChoice === 'rock') {
        const winDiv = document.createElement('div')
        winDiv.textContent = 'Computer wins!'
        resultsDiv.appendChild(winDiv)
        computerScore++
      } else if (computerChoice === 'paper') {
        const winDiv = document.createElement('div')
        winDiv.textContent = 'You win!'
        resultsDiv.appendChild(winDiv)
        humanScore++
      }
      break
  }

  scoreboardDiv.textContent = `Human: ${humanScore} - Computer: ${computerScore}`

  if (humanScore === 5) {
    const gameWinDiv = document.createElement('div')
    gameWinDiv.textContent = 'You win the game!'
    resultsDiv.appendChild(gameWinDiv)
    resetGame()
  } else if (computerScore === 5) {
    const gameWinDiv = document.createElement('div')
    gameWinDiv.textContent = 'Computer wins the game!'
    resultsDiv.appendChild(gameWinDiv)
    resetGame()
  }
}

function resetGame() {
  humanScore = 0
  computerScore = 0
}

document.getElementById('rock').addEventListener('click', () => playRound('rock', getComputerChoice()))
document.getElementById('paper').addEventListener('click', () => playRound('paper', getComputerChoice()))
document.getElementById('scissors').addEventListener('click', () => playRound('scissors', getComputerChoice()))
