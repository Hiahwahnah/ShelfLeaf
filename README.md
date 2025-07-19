# ShelfLeaf  
Lightweight reading tracker for book lovers.

## Overview  
ShelfLeaf is a responsive web application that helps users search for books using the Open Library API and manage a personal library. Users can save books to their "My Library" list and assign them a reading status: *Want to Read*, *Reading*, or *Read*. It’s designed to be simple, accessible, and functional across desktop and mobile devices.

This project was built as a capstone for the Code:You Web Development program. It demonstrates core skills in HTML, CSS, JavaScript, and API integration.

---

## Features

✅ **Open Library API Integration**  
Users can search real book data by title or keyword and view covers, authors, and results directly from the Open Library database.

✅ **Persistent Personal Library**  
Books can be added to a personal library stored in the browser via `localStorage`, with reading status saved across sessions.

✅ **Status Management Dropdown**  
Users can select a reading status for each saved book using a color-coded dropdown (Want to Read, Reading, Read), which updates in real time.

✅ **Responsive Design**  
The app adjusts layout and design for mobile and desktop using Flexbox, Grid, and media queries.

✅ **Duplicate Prevention**  
Each book is uniquely tracked using its Open Library key, preventing accidental duplicates even for books with the same title/author.

---

## How to Run This Project

1. Clone or download this repository to your machine.
2. Open the `index.html` file in any modern browser (Chrome, Firefox, Edge, etc.).
3. No installation or server setup is required.

---

## Technologies Used

- HTML5
- CSS3 (Flexbox + Grid)
- JavaScript (ES6)
- Open Library API
- `localStorage` for persistence

---

## Capstone Requirements Met

- ✅ **Integrate an API (not weather):** Used Open Library API to search for and display book data.
- ✅ **Responsive Design:** Used Flexbox, Grid, and media queries for mobile and desktop layouts.
- ✅ **Persist data to internal API (`localStorage`):** User library and book status saved in localStorage.
- ✅ **Analyze and display data from arrays/objects:** Rendered books and their status from localStorage arrays.
- ✅ **Use a dynamic UI feature:** Status dropdown for each saved book updates its state in real time.
- ✅ **Prevent duplicates using a unique key:** Used Open Library’s `book.key` to avoid saving duplicates.
- ✅ **10+ Git commits using terminal:** Project changes tracked and pushed via terminal with descriptive messages.
- ✅ **README with description and features:** Includes project overview, features used, and how to run the app.

---

## Future Plans

- Add sorting/filtering for books by status or title
- Add genre tags and cover previews
- Enable exporting/importing the user's library
- Polish the visual design with theming and icons

---

## Author

H. Richard Neal III  
*Code:You January 2025 Cohort*