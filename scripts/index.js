const div = document.querySelector('.container')
const myLibrary = [];

class Book {
  constructor(title, author, year, pages, read = 'Unread') {
    this.title = title;
    this.author = author;
    this.year = year;
    this.id = crypto.randomUUID();
    this.pages = pages;
    this.read = read;
  }
}

Book.prototype.toggleRead = function () {
  this.read = this.read === 'Read' ? 'Unread' : "Read";
}

const Library = (() => {
  // const DOM variables
  const pages = document.getElementById('pages');
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const year = document.getElementById('year');
  const read = document.getElementById('read');

  const checkPages = () => {
    const pages_count = pages.value;
    if (pages_count < 1) {
      pages.setCustomValidity("Number of pages should be positive and more than 0");
      return pages.reportValidity();
    }
    pages.setCustomValidity("");
    return pages.reportValidity();
  }

  const checkAuthor = () => {
    const author_name = author.value;
    if (author_name == '') {
      author.setCustomValidity("The author name must be filled!");
      return author.reportValidity();
    }
    author.setCustomValidity("");
    return pages.reportValidity();
  }

  const checkTitle = () => {
    const title_name = title.value;
    if (title_name == '') {
      title.setCustomValidity("The title's name must be filled!");
      return title.reportValidity();
    }
    title.setCustomValidity("");
    return pages.reportValidity();
  }
  
  const addBookToLibrary = (title, author, year, pages, read) => {
    const newBook = new Book(title, author, year, pages, read);
    myLibrary.push(newBook)
  }
  
  const displayBook = (book) => {
    const card = document.createElement('div');
    let read;
    let id = book.id
    if (book.read == "Read") {
        read = `<button class="btn read" data-id="${id}">Unread</button>`
      } else {
        read = `<button class="btn" data-id="${id}">Read</button>`
      }
    card.innerHTML = `<div class="card" data-idr="${id}"><h2>${book.title}</h2> <p>${book.author}</p> <p>${book.year}</p> <p>${book.pages} pages</p> <div class="action">${read}<button class="remove" data-id="${id}">Remove</button></div></div>`;
    div.appendChild(card);
  }  

  const readTheBook = () => {
    const btn = document.querySelectorAll('.btn');
    btn.forEach((button) => {
      button.addEventListener('click', () => { 
        const bookID =  button.dataset.id;
        const elBook = myLibrary.find(book => book.id === bookID);
        if (elBook) {
          elBook.toggleRead();
          displayLibrary();
        }
        if (button.textContent == 'Read') {
        button.textContent = 'Unread';
        button.classList.add('read');
      } else {
        button.textContent = 'Read';
        button.classList.remove('read');
      }
    })
    });
  }

  const displayAddNewBook = () => {
    const btn = document.querySelector('.submit');

    btn.addEventListener('click', () => {
      const check = read.checked === true ? "Read" : "Unread";
      if (checkPages() && checkTitle() && checkAuthor()) {
        addBookToLibrary(title.value, author.value, year.value, pages.value, check);
        displayLibrary();
        clearForm(title, author, year, pages, read);
      }
    })
  }

  const clearForm = (title, author, year, pages, read) => {
    title.value = '';
    author.value = '';
    year.value = '';
    pages.value = '';
    read.checked = false;
  }

  const displayLibrary = () => {
    div.innerHTML = '';
    myLibrary.forEach((book) => {
      displayBook(book);
    })
    readTheBook();
  }

  const deleteBook = () => {
    const btn = document.querySelectorAll('.remove');
    btn.forEach((button) => {
    button.addEventListener('click', () => {
      const bookID =  button.dataset.id;
      console.log(bookID);
      const idx = myLibrary.findIndex(book => book.id === bookID);
      if (idx !== -1) {
        myLibrary.splice(idx, 1);
        displayLibrary();
      }
    });
    });
  }

  const library = ()=>{
    displayAddNewBook();
    displayLibrary();
    deleteBook();
  }

  return {
    addBookToLibrary,
    displayLibrary,
    library
  }
})();

Library.addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 1937, 310, 'Read');
Library.addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1954, 1500, 'Unread');
Library.addBookToLibrary("Pride and Prejudice", "Jane Austen", 1813, 328);
Library.addBookToLibrary("The Picture of Dorian Gray", "Oscar Wilde", 1890, 230);

Library.library();
// page.addEventListener("change", Library.));
