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

- [x] Create a design  ![[./resources/images/design-reference-draft.png]]
- [x] Gather assets
  - [x] Icons from pic (by purpose)
    - [x] Logo
    - [x] Trash
    - [x] Author
    - [x] Title
    - [x] Number of pages
    - [x] Read / unread
    - [x] Add / remove book
  - [x] Roboto font

- [x] Create `script.js`
	- [x] Add book constructor and book array
	- [x] Add function to add book to array
	- [x] Add function to remove book
	- [x] Add function to toggle read
	- [x] Create book DOM node
		- [x] Potential approach: template in HTML, store in JS,  remove from DOM, append to DOM on function call
		- [ ] Potential approach: structure using document methods, wrap as object, append to DOM on function call
	- [ ] Research and decide on method to process user input
		- [ ] Potential approach: form, figure out how to accept form without HTTP
		- [ ] Potential approach: modal, similar to form
- [x] Create `index.html`
	- [x] Add HTML boilerplate, link stylesheet and script
	- [x] Add "Add Book" button
		- [ ] Add form for user input
			- [ ] Add author text field
			- [ ] Add title text field
			- [ ] Add number of pages integer field
			- [ ] Add read checkbox
			- [ ] Add submit button
	- [x] Structure HTML for DOM manipulation
		- [x] Container for book DOM nodes
			- [x] Add "Toggle Read" action
			- [x] Add "Remove book" action
- [x] Create `style.css`
	- [x] Add boilerplate / resets
	- [ ] Add broad-strokes styling
	- [ ] Refine styles