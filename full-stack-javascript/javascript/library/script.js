const myLibrary = []

function Book(author, title, pages, read) {
  this.author = author
  this.title = title
  this.pages = pages
  this.read = read
}

myLibrary.push(new Book('J.K. Rowling', "Harry Potter and the Sorcerer's Stone", 309, true))
myLibrary.push(new Book('J.R.R. Tolkien', 'The Hobbit', 310, false))
myLibrary.push(new Book('George Orwell', '1984', 328, true))

function displayBooks() {
  const container = document.getElementById('library-container')
  container.innerHTML = '' // Clear existing books
  myLibrary.forEach((book, index) => {
    const card = document.createElement('div')
    card.classList.add('card')

    const title = document.createElement('h3')
    title.textContent = book.title
    card.appendChild(title)

    const author = document.createElement('p')
    author.textContent = `Author: ${book.author}`
    card.appendChild(author)

    const pages = document.createElement('p')
    pages.textContent = `Pages: ${book.pages}`
    card.appendChild(pages)

    const read = document.createElement('p')
    read.textContent = `Read: ${book.read ? 'Yes' : 'No'}`
    card.appendChild(read)

    const toggleReadButton = document.createElement('button')
    toggleReadButton.textContent = '🔄'
    toggleReadButton.classList.add('toggle-read-button')
    toggleReadButton.addEventListener('click', () => {
      book.read = !book.read
      displayBooks()
    })
    card.appendChild(toggleReadButton)

    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = '🗑️'
    deleteButton.classList.add('delete-button')
    deleteButton.addEventListener('click', () => {
      showDeleteConfirmation(index)
    })
    card.appendChild(deleteButton)

    container.appendChild(card)
  })
}

function addBookToLibrary(author, title, pages, read) {
  const newBook = new Book(author, title, pages, read)
  myLibrary.push(newBook)
  displayBooks()
}

function showDeleteConfirmation(index) {
  const confirmDialog = document.getElementById('confirm-dialog')
  confirmDialog.showModal()

  const confirmDeleteButton = document.getElementById('confirm-delete')
  const cancelDeleteButton = document.getElementById('cancel-delete')

  confirmDeleteButton.onclick = () => {
    myLibrary.splice(index, 1)
    displayBooks()
    confirmDialog.close()
  }

  cancelDeleteButton.onclick = () => {
    confirmDialog.close()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  displayBooks()

  const newBookButton = document.getElementById('new-book-button')
  const bookDialog = document.getElementById('book-dialog')
  const bookForm = document.getElementById('book-form')

  newBookButton.addEventListener('click', () => {
    bookDialog.showModal()
  })

  bookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const author = document.getElementById('author').value
    const title = document.getElementById('title').value
    const pages = document.getElementById('pages').value
    const read = document.getElementById('read').checked
    addBookToLibrary(author, title, pages, read)
    bookForm.reset()
    bookDialog.close()
  })
})
