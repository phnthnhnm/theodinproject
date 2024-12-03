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
  myLibrary.forEach((book) => {
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

    container.appendChild(card)
  })
}

function addBookToLibrary(author, title, pages, read) {
  const newBook = new Book(author, title, pages, read)
  myLibrary.push(newBook)
  displayBooks()
}

document.addEventListener('DOMContentLoaded', () => {
  displayBooks()
  document.getElementById('new-book-button').addEventListener('click', () => {
    addBookToLibrary('New Author', 'New Title', 123, false)
  })
})
