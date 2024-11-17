# Project: Library

Library project as part of The Odin Project curriculum

## Problem solving

### Understand

#### Input Requirements

- Allow user to add a book
	- Accept the following data:
		- Title
		- Author
		- Number of pages
		- Read?
- Allow user to remove a book
- Allow user to mark a book as read

#### Output Requirements

- Section for all books
	- Book
		- Button to remove
		- Button to mark read
- Button to add book
	- User input fields for:
		- Title 
		- Author
		- Number of pages
		- Read?

### Plan

#### Todo

- [x] Create a design  ![[design-reference-draft.png]]
- [ ] Gather assets
  - [ ] Icons from pic (by purpose)
    - [ ] Logo
    - [ ] Read
    - [ ] Not Read
    - [ ] Trash
  - [ ] Roboto font

- [x] Create `script.js`
	- [ ] Add book constructor and book array
	- [ ] Add function to add book to array
	- [ ] Create book DOM node
		- [ ] Potential approach: template in HTML, store in JS,  remove from DOM, append to DOM on function call
		- [ ] Potential approach: structure using document methods, wrap as object, append to DOM on function call
	- [ ] Research and decide on method to process user input
		- [ ] Potential approach: form, figure out how to accept form without HTTP
		- [ ] Potential approach: modal, similar to form
- [x] Create `index.html`
	- [x] Add HTML boilerplate, link stylesheet and script
	- [ ] Add "Add Book" button
		- [ ] Add form for user input
			- [ ] Add author text field
			- [ ] Add title text field
			- [ ] Add number of pages integer field
			- [ ] Add read checkbox
			- [ ] Add submit button
	- [ ] Structure HTML for DOM manipulation
		- [ ] Container for book DOM nodes
			- [ ] Add "Toggle Read" action
			- [ ] Add "Remove book" action
- [x] Create `style.css`
	- [x] Add boilerplate / resets
	- [ ] Add broad-strokes styling
	- [ ] Refine styles