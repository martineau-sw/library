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