class Book {
  constructor(author, title, pages, read) {
    this._author = author
    this._title = title
    this._pages = pages
    this._read = read
  }

  get author() {
    return this._author
  }

  set author(value) {
    this._author = value
  }

  get title() {
    return this._title
  }

  set title(value) {
    this._title = value
  }

  get pages() {
    return this._pages
  }

  set pages(value) {
    this._pages = value
  }

  get read() {
    return this._read
  }

  set read(value) {
    this._read = value
  }
}

const myLibrary = []

function displayBooks() {
  const container = document.getElementById('library-container')
  container.innerHTML = ''
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
