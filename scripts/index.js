const LibraryJSON = (() => {
  const saveLibrary = () => {
    const userLibrary = {
    library: myLibrary
    }
    const json = JSON.stringify(userLibrary);
    localStorage.setItem("userLibrary", json)
  }

  const loadLibrary = () => {
    const json = localStorage.getItem("userLibrary");
    if (!json) {
      return null;
    }
    try {
      const lib = JSON.parse(json)
      return lib.library;
    } catch (err) {
      console.error("Failed to parse profile JSON:", err);
      return null;
    }
  }

  const clearLibrary = () => {
    localStorage.removeItem("userLibrary");
  }
  return {
    saveLibrary,
    loadLibrary,
    clearLibrary
  }
})()

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
  const div = document.querySelector('.container')
  const pages = document.getElementById('pages');
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const year = document.getElementById('year');
  const read = document.getElementById('read');

  const checkPages = () => {
    if (pages.value < 1) {
      pages.setCustomValidity("Number of pages should be positive and more than 0!");
      return pages.reportValidity();
    }
    pages.setCustomValidity("");
    return pages.reportValidity();
  }
    const checkYear = () => {
    if (year.value == '') {
      year.setCustomValidity("The year must be filled! ");
      return year.reportValidity();
    }
    year.setCustomValidity("");
    return year.reportValidity();
  }
  const checkAuthor = () => {
    if (author.value == '') {
      author.setCustomValidity("The author name must be filled!");
      return author.reportValidity();
    }
    author.setCustomValidity("");
    return pages.reportValidity();
  }

  const checkTitle = () => {
    if (title.value == '') {
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
    deleteBook()
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
      if (checkPages() && checkYear() && checkTitle() && checkAuthor()) {
        addBookToLibrary(title.value, author.value, year.value, pages.value, check);
        displayLibrary();
        clearForm(title, author, year, pages, read);
        LibraryJSON.clearLibrary();
        LibraryJSON.saveLibrary();
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
      myLibrary = myLibrary.filter(book => book.id !== bookID)
      LibraryJSON.clearLibrary();
      LibraryJSON.saveLibrary();
      displayLibrary();
    })});
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

let myLibrary = LibraryJSON.loadLibrary() || [new Book("The Hobbit", "J.R.R. Tolkien", 1937, 310, 'Read'), new Book("The Lord of the Rings", "J.R.R. Tolkien", 1954, 1500, 'Unread'), new Book("Pride and Prejudice", "Jane Austen", 1813, 328), new Book("The Picture of Dorian Gray", "Oscar Wilde", 1890, 230)];

Library.library();
