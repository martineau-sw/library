
const bookTemplate = initBookTemplate();
const formTemplate = initFormTemplate();
const libraryTemplate = initLibraryTemplate();
const library = [];
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

addBookAndUpdate(theHobbit);

function Book(bookTitle, bookAuthor, numberOfPages, hasRead) {
  this.title = bookTitle;
  this.author = bookAuthor;
  this.pages = numberOfPages;
  this.read = hasRead;
}

function initBookTemplate() {
  const template = document.querySelector('#book-template').cloneNode(true);
  template.removeAttribute('id');
  template.querySelector('button').addEventListener('click', e => {
    const selectedBook = createBookFromElement(e.target.closest('.book.data'));
    removeBookAndUpdate(selectedBook);
  });
  return template;
}

function initFormTemplate() {
  const template = document.querySelector('#blank-template').cloneNode(true);
  template.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    addBookAndUpdate(createBookFromForm());
    e.target.reset();
  });
  return template;
}

function initLibraryTemplate() {
  const template = document.querySelector('#library').cloneNode(true);
  clearChildren(template);
  return template;
}

function getLibraryTemplate() {
  return libraryTemplate;
}

function getBookTemplate() {
  return bookTemplate;
}

function getFormTemplate() {
  return formTemplate;
}

function getLibrary() {
  return library;
}

function addBookToLibrary(book) {
  getLibrary().push(book);
}

function removeBookFromLibrary(book) {
  let index = getLibrary().findIndex(b => b === book);
  getLibrary().splice(index, 1);
}

function addBookAndUpdate(book) {
  addBookToLibrary(book);
  replaceLiveLibrary();
}

function removeBookAndUpdate(book) {
  removeBookFromLibrary(book);
  replaceLiveLibrary();
}

function createBookFromForm() {
  const title = document.getElementById('input-title').value;
  const author = document.getElementById('input-author').value;
  const pages = document.getElementById('input-pages').value;
  const read = document.getElementById('input-read').checked;

  return new Book(title, author, pages, read);
}

function buildBookElement(book) {
  const template = getBookTemplate().cloneNode(true);
  template.querySelector('.title.container .data').textContent = book.title;
  template.querySelector('.author.container .data').textContent = book.author;
  template.querySelector('.pages.container .data').textContent = book.pages;
  if (book.read) template.querySelector('.read.container .data').setAttribute('checked', '');

  return template;
}

function createBookFromElement(bookElement) {
  return new Book(
    bookElement.querySelector('.title.container .data').textContent,
    bookElement.querySelector('.author.container .data').textContent,
    bookElement.querySelector('.pages.container .data').textContent,
    bookElement.querySelector('.read.container .data').hasAttribute('checked'));
}

function clearChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function buildLibraryElement() {
  const template = getLibraryTemplate().cloneNode(true);
  const library = getLibrary();

  library.forEach(book => {
    const bookElement = buildBookElement(book);
    template.appendChild(bookElement);
  });

  template.appendChild(getFormTemplate());

  return template;
}

function replaceLiveLibrary() {
  const library = document.getElementById('library');
  library.replaceWith(buildLibraryElement());
}

