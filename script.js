
class DOMController {
  static #libraryTemplate;
  static #bookTemplate;
  static #formTemplate;

  static get library() {
    if (!this.#libraryTemplate) {
      this.#libraryTemplate = this.#initLibraryTemplate();
    }    
    return this.#libraryTemplate.cloneNode(true);
  }

  static get book() {
    if (!this.#bookTemplate) {
      this.#bookTemplate = this.#initBookTemplate();
    }
    return this.#bookTemplate.cloneNode(true);
  }

  static get form() {
    if (!this.#formTemplate) {
      console.error('Form template must be initialized to a library to function properly');
    }
    return this.#formTemplate;
  }

  static #initBookTemplate() {
    const template = document.querySelector('#book-template').cloneNode(true);
    template.removeAttribute('id');
    
    return template;
  }

  static #initFormTemplate(library) {
    const template = document.querySelector('#blank-template').cloneNode(true);
    template.querySelector('form').addEventListener('submit', e => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      library.add(Book.fromForm());
      DOMController.redraw(library);
      e.target.reset();
    });
    return template;
  }

  static bindToForm(library) {
    this.#formTemplate = this.#initFormTemplate(library);
  }

  static #initLibraryTemplate() {
    const template = document.querySelector('#library').cloneNode(true);
    this.#clearChildrenOfElement(template);
    return template;
  }

  static #createBookElement(library, book) {
    const template = this.book;
    template.querySelector('.title.container .data').textContent = book.title;
    template.querySelector('.author.container .data').textContent = book.author;
    template.querySelector('.pages.container .data').textContent = book.pages;
    if (book.read) template.querySelector('.read.container .data').setAttribute('checked', '');
    
    template.querySelector('.remove').addEventListener('click', e => {
      const selectedBook = Book.fromElement(e.target.closest('.book.data'));
      library.remove(selectedBook);
      this.redraw(library);
    });

    template.querySelector('.read.container').addEventListener('click', e => {
      const thisBook = Book.fromElement(e.target.closest('.book.data'));
      const index = library.contents.findIndex(b => b.isEqual(thisBook));
      const readValue = e.target.closest('.read.container').querySelector('.data').checked;
      library.at(index).read = readValue;
    });
    return template;
  }

  static #createLibraryElement(library) {
    const template = this.library;
  
    library.contents.forEach(book => {
      const bookElement = this.#createBookElement(library, book);
      template.appendChild(bookElement);
    });
  
    template.appendChild(this.form);
  
    return template;
  }

  static #clearChildrenOfElement(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  static redraw(library) {
    const element = document.getElementById('library');
    element.replaceWith(this.#createLibraryElement(library));
  }
}

class Book {
  constructor(title, author, pageCount, hasRead) {
    this.title = title;
    this.author = author; 
    this.pages = pageCount;
    this.read = hasRead;
  }

  get title() { return this._title; }
  get author() { return this._author; }
  get pages() { return this._pages; }
  get read() { return this._read; }

  set title(string) { this._title = string; }
  set author(string) { this._author = string; }
  set pages(integer) { this._pages = integer; }
  set read(boolean) { this._read = boolean; }

  isEqual(book) {
    return  this._title === book.title && 
            this._author === book.author && 
            this._pages === book.pages;
  }

  static fromForm() {
    return new Book(
      document.getElementById('input-title').value,
      document.getElementById('input-author').value,
      document.getElementById('input-pages').value,
      document.getElementById('input-read').checked
    )
  }

  static fromElement(element) {
    return new Book(
      element.querySelector('.title.container .data').textContent,
      element.querySelector('.author.container .data').textContent,
      +element.querySelector('.pages.container .data').textContent,
      element.querySelector('.read.container .data').hasAttribute('checked'));
  }
}

class Library {
  #library = [];
  
  constructor(...books) {
    this.add(...books);
  }

  get contents() {
    return this.#library;
  }

  at(index) {
    return this.#library.at(index);
  }

  add(...books) {
    for (const book of books) {
      this.#library.push(book);
    }
  }
  
  remove(book) {
    let index = this.#library.findIndex(b => b.isEqual(book));
    this.#library.splice(index, 1);
  }
}


const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const snowCrash = new Book('Snow Crash', 'Neal Stephenson', 480, false);
const sevenEves = new Book('Seveneves', 'Neal Stephenson', 880, true);
const sirensOfTitan = new Book('Sirens of Titan', 'Kurt Vonnegut', 319, true);
const wombology = new Book('Wumbology: The study of wumbo', 'Patrick Star', 880, true);
const prime = new Book('The name is:', 'The Primeagen', 295, false);
const homer = new Book('D\'oh!', 'H. Simpson', 480, false);

const library = new Library(theHobbit, snowCrash, sevenEves, sirensOfTitan, wombology, prime, homer);
DOMController.bindToForm(library);
DOMController.redraw(library);
