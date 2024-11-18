
const bookTemplateElement = cloneBookTemplateElement();
const blankTemplateElement = cloneBlankTemplateElement();
const libraryElement = selectLibraryElement();

const library = [];

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

addBookToLibrary(theHobbit);
updateLibraryElement();

function Book(bookTitle, bookAuthor, numberOfPages, hasRead) {
  this.title = bookTitle;
  this.author = bookAuthor;
  this.pages = numberOfPages;
  this.read = hasRead;
}

function cloneBookTemplateElement() {
  return document.querySelector('#book-template').cloneNode(true);
}

function cloneBlankTemplateElement() {
  return document.querySelector('#blank-template').cloneNode(true);
}

function selectLibraryElement() {
  return document.querySelector('#library');
}

function getLibrary() {
  return library;
}

function getLibraryElement() {
  return libraryElement;
}

function getBookTemplateElement() {
  return bookTemplateElement;
}

function getBlankTemplateElement() {
  return blankTemplateElement;
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
  updateLibraryElement();
}

function removeBookAndUpdate(book) {
  removeBookFromLibrary(book);
  updateLibraryElement();
}

function createElementFromBook(book) {
  const bookNode = getBookTemplateElement().cloneNode(true);
  bookNode.removeAttribute('id');
  bookNode.querySelector('.title').textContent = book.title;
  bookNode.querySelector('.author').textContent = book.author;
  bookNode.querySelector('.pages').textContent = book.pages;
  bookNode.querySelector('.read').setAttribute('value', book.read);

  return bookNode;
}

function createBookFromElement(bookElement) {
  return new Book(
    bookElement.querySelector('.title').textContent,
    bookElement.querySelector('.author').textContent,
    bookElement.querySelector('.pages').textContent,
    bookElement.querySelector('.read').getAttribute('value'));
}

function clearChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function updateLibraryElement() {
  const library = getLibrary();
  const libraryElement = getLibraryElement();
  clearChildren(libraryElement);
  library.forEach(book => {
    const bookElement = createElementFromBook(book);
    attachRemoveBookToButton(bookElement);
    libraryElement.appendChild(bookElement);
  });
  libraryElement.appendChild(getBlankTemplateElement());
}

function attachRemoveBookToButton(bookElement) {
  bookElement.querySelector('.remove').addEventListener('click', event => {
    removeBookAndUpdate(createBookFromElement(event.target.parentNode));
  });
}