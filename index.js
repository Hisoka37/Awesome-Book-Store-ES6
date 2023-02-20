import Books from './modules/books.js';
import { DateTime } from './modules/luxon/src/luxon.js';

const form = document.querySelector('.form');
const booksDiv = document.querySelector('.add-books');
const addBooks = document.querySelector('.link-2');
const bookList = document.querySelector('.link-1');
const contactInfo = document.querySelector('.link-3');
const books = document.querySelector('.add-books');
const forms = document.querySelector('.form');
const contact = document.querySelector('.contact-info');
const tag = document.querySelector('h1');
const dateContainer = document.querySelector('.date');
const date = DateTime.fromObject({ }, { zone: 'system' }).toLocaleString(DateTime.DATE_FULL);
const time = DateTime.fromObject({ }, { zone: 'system' }).toLocaleString(DateTime.TIME_SIMPLE);
const dateTime = `${date} ${time}`;

dateContainer.innerHTML = dateTime;

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

books.style.display = 'none';
forms.style.display = 'block';
contact.style.display = 'none';
tag.style.display = 'none';

bookList.addEventListener('click', () => {
  forms.style.display = 'none';
  contact.style.display = 'none';
  books.style.display = 'block';
  tag.style.display = 'block';
});
addBooks.addEventListener('click', () => {
  forms.style.display = 'block';
  books.style.display = 'none';
  contact.style.display = 'none';
  tag.style.display = 'none';
});
contactInfo.addEventListener('click', () => {
  forms.style.display = 'none';
  books.style.display = 'none';
  tag.style.display = 'none';
  contact.style.display = 'block';
});
