// eslint-disable-next-line max-classes-per-file
class Books {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

const form = document.querySelector('.form');
const booksDiv = document.querySelector('.add-books');

class submitNewBook {
  static addNewBook(book) {
    const bookUnit = document.createElement('li');
    bookUnit.id = book.id;
    bookUnit.innerHTML = `
        <p class="book-name">"${book.title}" by ${book.author}</p>
        <button class='removeBook' id=${Books.id}>Remove</button>
        `;
    booksDiv.appendChild(bookUnit);
  }

  static removeBookFromPage(target) {
    if (target.classList.contains('removeBook')) {
      target.parentElement.remove();
    }

    if (!booksDiv.firstElementChild) {
      booksDiv.style.border = '1px solid white';
    }
  }

  static loadFromStorage() {
    let books;

    if (localStorage.getItem('bookInfo')) {
      books = JSON.parse(localStorage.getItem('bookInfo'));
    } else {
      books = [];
    }

    return books;
  }

  static displayBooksFromStorage() {
    const books = submitNewBook.loadFromStorage();

    books.forEach((book) => {
      submitNewBook.addNewBook(book);
    });
  }

  static removeBookFromStorage(element) {
    const books = submitNewBook.loadFromStorage();
    const { id } = element.parentElement;
    const bookIndex = books.findIndex((book) => book.id === id);
    books.splice(bookIndex, 1);
    localStorage.setItem('bookInfo', JSON.stringify(books));
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleInput = document.querySelector('.book-title');
  const authorInput = document.querySelector('.book-author');
  const title = document.querySelector('.book-title').value;
  const author = document.querySelector('.book-author').value;
  const books = submitNewBook.loadFromStorage();
  const book = new Books(title, author, Date.now());
  books.push(book);
  submitNewBook.addNewBook(book);
  submitNewBook.loadFromStorage();

  localStorage.setItem('bookInfo', JSON.stringify(books));

  titleInput.value = '';
  authorInput.value = '';
});

booksDiv.addEventListener('click', (e) => {
  submitNewBook.removeBookFromPage(e.target);
  submitNewBook.removeBookFromStorage(e.target);
});

window.addEventListener('load', submitNewBook.displayBooksFromStorage);
