document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container')
  const button = document.querySelector('#clear')
  const penColorInput = document.getElementById('pen-color')
  const bgColorInput = document.getElementById('bg-color')
  const sizeSlider = document.getElementById('grid-size')
  const sizeLabel = document.getElementById('grid-size-label')
  const toggleGridLinesButton = document.getElementById('toggle-grid-lines')
  const modeButtons = document.querySelectorAll('.pen-mode-button')
  const toggleDarkModeButton = document.getElementById('toggle-dark-mode')

  let mode = 'fixed'
  let isDrawing = false
  let penColor = penColorInput.value
  let bgColor = bgColorInput.value
  let showGridLines = true

  function getRandomColor() {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b})`
  }

  function createGrid(size) {
    container.innerHTML = ''

    const containerSize = container.clientWidth
    const itemSize = containerSize / size

    for (let i = 0; i < size * size; i++) {
      const div = document.createElement('div')
      div.classList.add('grid-item')
      if (showGridLines) {
        div.classList.add('with-border')
      }
      div.style.width = `${itemSize}px`
      div.style.height = `${itemSize}px`
      div.style.backgroundColor = bgColor
      div.dataset.darkness = '0'
      container.appendChild(div)

      div.addEventListener('mousedown', () => {
        isDrawing = true
        applyColor(div)
      })

      div.addEventListener('mouseover', () => {
        if (isDrawing) {
          applyColor(div)
        }
      })

      div.addEventListener('mouseup', () => {
        isDrawing = false
      })

      // Prevent default drag behavior
      div.addEventListener('dragstart', (e) => {
        e.preventDefault()
      })
    }

    document.addEventListener('mouseup', () => {
      isDrawing = false
    })
  }

  function applyColor(div) {
    if (mode === 'random') {
      div.style.backgroundColor = getRandomColor()
    } else if (mode === 'darken') {
      let darkness = parseFloat(div.dataset.darkness)
      if (darkness < 1) {
        darkness += 0.1
        div.dataset.darkness = darkness

        div.style.backgroundColor = `rgba(0, 0, 0, ${darkness})` // Darken in light mode
      }
    } else {
      div.style.backgroundColor = penColor
    }
  }

  button.addEventListener('click', () => {
    let size = parseInt(sizeSlider.value)
    createGrid(size)
  })

  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      mode = btn.dataset.mode
      modeButtons.forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')
    })
  })

  penColorInput.addEventListener('input', (e) => {
    penColor = e.target.value
  })

  bgColorInput.addEventListener('input', (e) => {
    bgColor = e.target.value
    createGrid(container.childElementCount ** 0.5)
  })

  sizeSlider.addEventListener('input', (e) => {
    sizeLabel.textContent = `Grid Size: ${e.target.value} x ${e.target.value}`
    createGrid(parseInt(e.target.value))
  })

  toggleGridLinesButton.addEventListener('click', () => {
    showGridLines = !showGridLines
    document.querySelectorAll('.grid-item').forEach((item) => {
      item.classList.toggle('with-border', showGridLines)
    })
  })

  toggleDarkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')
    toggleDarkModeButton.innerHTML = document.body.classList.contains('dark-mode') ? '🌞' : '🌜'
  })

  toggleDarkModeButton.innerHTML = '🌜'
  createGrid(16)
  modeButtons[0].classList.add('active')
})
