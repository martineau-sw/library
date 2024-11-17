
const bookTemplate = getBookTemplateElement();
const blankTemplate = getBlankTemplateElement();
const getBooksElement = getBooksElement();

const myLibrary = [];

const mockBook = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

function Book(bookTitle, bookAuthor, numberOfPages, hasRead) {
  this.title = bookTitle;
  this.author = bookAuthor;
  this.pages = numberOfPages;
  this.read = hasRead;
}

function addBookToLibrary(library, book) {
  library.push(book);
}

function removeFromLibrary(library, book) {
  library = library.filter(inLibrary => inLibrary === book);
}

function toggleRead(book) {
  book.read = !book.read;
}

function setRead(hasRead) {
  book.read = hasRead;
}

function getBookTemplateElement() {
  return document.querySelector('#book-template');
}

function getBlankTemplateElement() {
  return document.querySelector('#blank-template');
}

function getBooksElement() {
  return document.querySelector('#books');
}