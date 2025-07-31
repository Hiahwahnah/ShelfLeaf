# ShelfLeaf  
A lightweight, no-login book tracker built for readers who want simple control over their personal library.

## Overview  
ShelfLeaf is a clean, responsive web app that lets you search for books using the Open Library API and build your own personal library right in your browser. You can track what you're reading, mark what you’ve finished, and save books you want to check out later — all without creating an account.

This project was created as a capstone for the Code:You Web Development program to demonstrate skills in HTML, CSS, JavaScript, API integration, and responsive design.

---

## Features

- Book Search with Open Library API  
  Look up real books by title or keyword — complete with cover art and author info pulled directly from the Open Library database.

- Your Personal Library (Saved Locally)  
  Add books to your own library stored in your browser with `localStorage`. Everything stays saved between visits.

- Status Tracking with Color-Coded Dropdown  
  Mark each book as Want to Read, Reading, or Read — and switch statuses whenever you like.

- More Info Pop-up  
  Click “More Info” to view a detailed description, subjects, and a link to the full Open Library page.

- Duplicate Prevention  
  Each saved book uses a unique key, so you won’t accidentally save the same title twice.

- Responsive Design  
  ShelfLeaf looks and works great on phones, tablets, and desktops thanks to mobile-first CSS with Flexbox, Grid, and media queries.

- Helpful Error Messages  
  Friendly guidance when searches return nothing, or something goes wrong.

---

## How to Run This Project

1. Clone or download this repository to your computer.
2. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge).
3. That’s it. No setup or installation needed.

---

## Built With

- HTML5  
- CSS3 (Flexbox + Grid)  
- JavaScript (ES6)  
- Open Library API  
- `localStorage` for browser-based persistence

---

## Capstone Requirements Met

- API Integration (Open Library)
- Responsive design using Flexbox, Grid, and media queries
- Data persistence using `localStorage`
- Dynamic UI updates using arrays/objects
- Duplicate prevention with unique keys
- Real-time dropdown status updates
- 10 or more Git commits using terminal
- Complete README with description, features, and instructions

---

## Future Features

- Sort and filter your library by title or reading status  
- Drag-and-drop reordering of saved books  
- Genre/tag support  
- Export/import personal library to file  
- Light/dark theme switch

---

## Author

H. Richard Neal III  
Code:You January 2025 Cohort
