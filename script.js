
const bookTemplate = initBookTemplate();
const formTemplate = initFormTemplate();
const libraryTemplate = initLibraryTemplate();

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const snowCrash = new Book('Snow Crash', 'Neal Stephenson', 480, false);
const sevenEves = new Book('Seveneves', 'Neal Stephenson', 880, true);
const sirensOfTiten = new Book('Sirens of Titan', 'Kurt Vonnegut', 319, true);

const wombology = new Book('Wumbology: The study of wumbo', 'Patrick Star', 880, true);
const prime = new Book('The name is:', 'The Primeagen', 295, false);
const homer = new Book('Did I do that?', 'OJ Simpson', 480, false);



const library = 
  [
    theHobbit, snowCrash, sevenEves, sirensOfTiten,
    wombology, prime, homer,
  ];

replaceLiveLibrary();

function Book(bookTitle, bookAuthor, numberOfPages, hasRead) {
  this.title = bookTitle;
  this.author = bookAuthor;
  this.pages = numberOfPages;
  this.read = hasRead;
}

function initBookTemplate() {
  const template = document.querySelector('#book-template').cloneNode(true);
  template.removeAttribute('id');
  
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
  let index = getLibrary().findIndex(b => areEqual(b, book));
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

function areEqual(book0, book1) {
  return book0.title === book1.title && 
  book0.author === book1.author && 
  book0.pages === book1.pages;

}

function buildBookElement(book) {
  const template = getBookTemplate().cloneNode(true);
  template.querySelector('.title.container .data').textContent = book.title;
  template.querySelector('.author.container .data').textContent = book.author;
  template.querySelector('.pages.container .data').textContent = book.pages;
  if (book.read) template.querySelector('.read.container .data').setAttribute('checked', '');
  
  template.querySelector('.remove').addEventListener('click', e => {
    const selectedBook = createBookFromElement(e.target.closest('.book.data'));
    removeBookAndUpdate(selectedBook);
  });

  template.querySelector('.read.container').addEventListener('click', e => {
    const thisBook = createBookFromElement(e.target.closest('.book.data'));
    const index = getLibrary().findIndex(b => areEqual(b, thisBook));
    const readValue = e.target.closest('.read.container').querySelector('.data').checked;
    getLibrary().at(index).read = readValue;
  });
  return template;
}

function createBookFromElement(bookElement) {
  return new Book(
    bookElement.querySelector('.title.container .data').textContent,
    bookElement.querySelector('.author.container .data').textContent,
    +bookElement.querySelector('.pages.container .data').textContent,
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

