const addBooks = document.querySelector('.link-2');
const bookList = document.querySelector('.link-1');
const contactInfo = document.querySelector('.link-3');
const books = document.querySelector('.add-books');
const forms = document.querySelector('.form');
const contact = document.querySelector('.contact-info');
const tag = document.querySelector('h1');
const dateContainer = document.querySelector('.date');
const date = new Date().toLocaleDateString('en-us', { month: 'long', day: '2-digit', year: 'numeric' });
const time = new Date().toLocaleTimeString('en-us', { hour: 'numeric', minute: '2-digit' });
const dateTime = `${date} ${time}`;

dateContainer.innerHTML = dateTime;

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