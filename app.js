class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const form = document.querySelector('.form');
const booksDiv = document.querySelector('.add-books');

function addNewBook(book) {
  const bookUnit = document.createElement('li');
  bookUnit.innerHTML = `
        <p class="book-name">"${book.title}" by ${book.author}</p>
        // <p class="the-auhtor"> ${book.author}</p>
        <button class='removeBook' id=${Books.id}>Remove</button>
        `;
  booksDiv.appendChild(bookUnit);
}

function removeBookFromPage(target) {
  if (target.classList.contains('removeBook')) {
    target.parentElement.remove();
  }
}

function loadFromStorage() {
  let books;

  if (localStorage.getItem('bookInfo')) {
    books = JSON.parse(localStorage.getItem('bookInfo'));
  } else {
    books = [];
  }

  return books;
}

function displayBooksFromStorage() {
  const books = loadFromStorage();

  books.forEach((book) => {
    addNewBook(book);
  });
}

function removeBookFromStorage(element) {
  const books = loadFromStorage();
  const title = element.parentElement.firstElementChild.innerHTML;
  const bookIndex = books.findIndex((book) => book.title === title);
  books.splice(bookIndex, 1);
  localStorage.setItem('bookInfo', JSON.stringify(books));
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleInput = document.querySelector('.book-title');
  const authorInput = document.querySelector('.book-author');
  const title = document.querySelector('.book-title').value;
  const author = document.querySelector('.book-author').value;
  const book = new Books(title, author);
  const books = loadFromStorage();

  books.push(book);
  addNewBook(book);

  localStorage.setItem('bookInfo', JSON.stringify(books));

  titleInput.value = '';
  authorInput.value = '';
});

booksDiv.addEventListener('click', (e) => {
  removeBookFromPage(e.target);
  removeBookFromStorage(e.target);
});

window.addEventListener('load', displayBooksFromStorage());