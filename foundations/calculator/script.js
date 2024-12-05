function add(a, b) {
  return a + b
}

function subtract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  if (b === 0) {
    return 'Error'
  }
  return a / b
}

function roundResult(result) {
  return Math.round(result * 10000) / 10000
}

document.addEventListener('DOMContentLoaded', () => {
  const display = document.querySelector('#current-result')
  const previousOperation = document.querySelector('#previous-operation')
  let currentInput = ''
  let operator = null
  let firstOperand = null
  let shouldResetInput = false
  const maxDisplayLength = 10

  document.querySelectorAll('.number').forEach((button) => {
    button.addEventListener('click', () => {
      if (shouldResetInput) {
        currentInput = ''
        shouldResetInput = false
      }
      if (currentInput.length < maxDisplayLength) {
        currentInput += button.textContent
        display.textContent = currentInput
      }
    })
  })

  document.querySelectorAll('.operator').forEach((button) => {
    button.addEventListener('click', () => {
      if (firstOperand === null) {
        firstOperand = parseFloat(currentInput)
      } else if (currentInput !== '') {
        const secondOperand = parseFloat(currentInput)
        let result
        switch (operator) {
          case '+':
            result = add(firstOperand, secondOperand)
            break
          case '-':
            result = subtract(firstOperand, secondOperand)
            break
          case '*':
            result = multiply(firstOperand, secondOperand)
            break
          case '/':
            result = divide(firstOperand, secondOperand)
            break
        }
        firstOperand = roundResult(result)
        display.textContent = firstOperand
      }
      operator = button.textContent
      previousOperation.textContent = `${firstOperand} ${operator}`
      shouldResetInput = true
    })
  })

  document.querySelector('#equals').addEventListener('click', () => {
    if (firstOperand !== null && operator !== null && currentInput !== '') {
      const secondOperand = parseFloat(currentInput)
      let result
      switch (operator) {
        case '+':
          result = add(firstOperand, secondOperand)
          break
        case '-':
          result = subtract(firstOperand, secondOperand)
          break
        case '*':
          result = multiply(firstOperand, secondOperand)
          break
        case '/':
          result = divide(firstOperand, secondOperand)
          break
      }
      display.textContent = roundResult(result)
      previousOperation.textContent = `${firstOperand} ${operator} ${secondOperand} =`
      firstOperand = roundResult(result)
      operator = null
      currentInput = ''
      shouldResetInput = true
    }
  })

  document.querySelector('#clear').addEventListener('click', () => {
    currentInput = ''
    firstOperand = null
    operator = null
    display.textContent = '0'
    previousOperation.textContent = ''
  })

  document.querySelector('#decimal').addEventListener('click', () => {
    if (!currentInput.includes('.')) {
      currentInput += '.'
      display.textContent = currentInput
    }
  })

  document.querySelector('#backspace').addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1)
    display.textContent = currentInput || '0'
  })

  document.addEventListener('keydown', (event) => {
    const key = event.key
    if (!isNaN(key)) {
      document.querySelectorAll('.number').forEach((button) => {
        if (button.textContent === key) {
          button.click()
        }
      })
    } else if (key === '.') {
      document.querySelector('#decimal').click()
    } else if (key === 'Enter' || key === '=') {
      document.querySelector('#equals').click()
    } else if (key === 'Backspace') {
      document.querySelector('#backspace').click()
    } else if (key === 'Escape') {
      document.querySelector('#clear').click()
    } else if (['+', '-', '*', '/'].includes(key)) {
      document.querySelectorAll('.operator').forEach((button) => {
        if (button.textContent === key) {
          button.click()
        }
      })
    }
  })
})
