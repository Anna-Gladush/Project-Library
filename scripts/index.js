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
  const btn = document.createElement('btn');
  let read;
  if (book.read == "Read") {
      read = '<button class="btn read">Unread</button>'
    } else {
      read = '<button class="btn">Read</button>'
    }
  card.innerHTML = `<h1>${book.title}</h1> <p>${book.author}</p> <p>${book.year}</p> <p>${book.pages} pages</p> ${read}`;
  card.classList.add('.card');
  div.appendChild(card);
}

function readTheBook(book) {
  const btn = document.querySelectorAll('.btn');
  btn.forEach((button) => {
    button.addEventListener('click', () => { if (button.innerText == 'Read') {
      button.innerText = 'Unread';
      button.classList.add('read')
    } else {
      button.innerText = 'Read';
      button.classList.remove('read')
    }
  })
  });
}

function displayAddNewBook() {
  
}
function displayLibrary() {
  addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 1937, 310, 'Read');
  addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1954, 1500);
  addBookToLibrary("Pride and Prejudice", "Jane Austen", 1813, 328);

  myLibrary.forEach((book) => {
    displayBook(book);
    readTheBook(book);
  })
}

displayLibrary()