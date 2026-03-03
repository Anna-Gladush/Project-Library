const div = document.querySelector('.container')
const myLibrary = [];

function Book(title, author, year, pages, read = 'Unread') {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    };
    this.title = title;
    this.author = author;
    this.year = year;
    this.id = crypto.randomUUID();
    this.pages = pages;
    this.read = read;
}


function addBookToLibrary(title, author, year, pages, read) {
  const newBook = new Book(title, author, year, pages, read);
  myLibrary.push(newBook)
}

function displayBook(book) {
  const card = document.createElement('div');
  let read;
  let id = book.id
  if (book.read == "Read") {
      read = '<button class="btn read">Unread</button>'
    } else {
      read = '<button class="btn">Read</button>'
    }
  card.innerHTML = `<div class="card" data-index-number="${id}"><h2>${book.title}</h2> <p>${book.author}</p> <p>${book.year}</p> <p>${book.pages} pages</p> <div class="action" data-index-number="${id}">${read}<button class="remove" data-index-number="${id}">Remove</button></div></div>`;
  div.appendChild(card);
}

function readTheBook() {
  const btn = document.querySelectorAll('.btn');
  btn.forEach((button) => {
    button.addEventListener('click', () => { if (button.textContent == 'Read') {
      button.textContent = 'Unread';
      button.classList.add('read');
      
      // myLibrary.forEach(obj => {if (obj[id]) {}})
    } else {
      button.textContent = 'Read';
      button.classList.remove('read')
    }
    alert(document.button.hasAttribute('data-index-number'))
  })
  });
}
// function toggleRead() {
//   const card = document.querySelectorAll('.card');

// }
function displayAddNewBook() {
  const btn = document.querySelector('.submit');
  let title = document.getElementById('title');
  let author = document.getElementById('author');
  let year = document.getElementById('year');
  let pages = document.getElementById('pages');
  btn.addEventListener('click', () => {
    let read = document.getElementById('read');
    check = read.checked === true ? "Read" : "Unread";
    addBookToLibrary(title.value, author.value, year.value, pages.value, check);
    displayLibrary();
    title.value = '';
    author.value = '';
    year.value = '';
    pages.value = '';
    read.checked = false;
  });
}

function displayLibrary() {
  div.innerHTML = '';
  myLibrary.forEach((book) => {
    displayBook(book);
  })
  readTheBook();
}

function deleteBook() {
  const btn = document.querySelectorAll('.remove');
  myLibrary.forEach((book) => {
    btn.forEach((button) => {
    button.addEventListener('click', () => {
      myLibrary = myLibrary.filter(obj => obj[id] !== book.id)
    });
  });
  })
  displayLibrary();
}

function library(){
  displayAddNewBook();
  displayLibrary();
  deleteBook();
}
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 1937, 310, 'Read');
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1954, 1500, 'Unread');
addBookToLibrary("Pride and Prejudice", "Jane Austen", 1813, 328);
addBookToLibrary("The Picture of Dorian Gray", "Oscar Wilde", 1890, 230);

library()
