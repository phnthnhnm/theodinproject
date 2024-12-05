document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form')
  const phoneInput = document.getElementById('phone')
  const emailInput = document.getElementById('email')
  const passwordInput = document.getElementById('password')
  const confirmPasswordInput = document.getElementById('confirm-password')

  const phoneError = document.createElement('div')
  phoneError.className = 'error-message'
  phoneInput.parentNode.appendChild(phoneError)

  const emailError = document.createElement('div')
  emailError.className = 'error-message'
  emailInput.parentNode.appendChild(emailError)

  const passwordError = document.createElement('div')
  passwordError.className = 'error-message'
  passwordInput.parentNode.appendChild(passwordError)

  const confirmPasswordError = document.createElement('div')
  confirmPasswordError.className = 'error-message'
  confirmPasswordInput.parentNode.appendChild(confirmPasswordError)

  phoneInput.addEventListener('input', () => {
    const phoneValue = phoneInput.value
    const phoneRegex = /^[0-9]*$/

    if (!phoneRegex.test(phoneValue)) {
      phoneError.textContent = '* Only numbers allowed'
      phoneInput.classList.add('invalid')
    } else {
      phoneError.textContent = ''
      phoneInput.classList.remove('invalid')
    }
  })

  emailInput.addEventListener('input', () => {
    const emailValue = emailInput.value
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(emailValue)) {
      emailError.textContent = '* Invalid email address'
      emailInput.classList.add('invalid')
    } else {
      emailError.textContent = ''
      emailInput.classList.remove('invalid')
    }
  })

  confirmPasswordInput.addEventListener('input', () => {
    const passwordValue = passwordInput.value
    const confirmPasswordValue = confirmPasswordInput.value

    if (passwordValue !== confirmPasswordValue) {
      confirmPasswordError.textContent = '* Passwords do not match'
      confirmPasswordInput.classList.add('invalid')
    } else {
      confirmPasswordError.textContent = ''
      confirmPasswordInput.classList.remove('invalid')
    }
  })

  form.addEventListener('submit', (event) => {
    if (phoneInput.classList.contains('invalid') || emailInput.classList.contains('invalid') || confirmPasswordInput.classList.contains('invalid')) {
      event.preventDefault()
      alert('Please fix the errors in the form before submitting.')
    }
  })
})
