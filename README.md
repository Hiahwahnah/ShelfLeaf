# ShelfLeaf  
A lightweight, no-login book tracker built for readers who want simple control over their personal library.

### Live Demo  
Check out the live version here: [https://shelf-leaf.vercel.app](https://shelf-leaf.vercel.app)

## Overview  
ShelfLeaf is a clean, responsive web app that lets you search for books using the Open Library API and build your own personal library right in your browser. You can track what you're reading, mark what you’ve finished, and save books you want to check out later — all without creating an account.

You can reorder your saved books via drag-and-drop and sort them by title or status — all in a fully responsive, no-login experience.

This project was created as a capstone for the Code:You Web Development program to demonstrate skills in HTML, CSS, JavaScript, API integration, and responsive design.

---

## Features

- **Book Search with Open Library API**  
  Look up real books by title or keyword — complete with cover art and author info pulled directly from the Open Library database.

- **Your Personal Library (Saved Locally)**  
  Add books to your own library stored in your browser with `localStorage`. Everything stays saved between visits.

- **Status Tracking with Color-Coded Dropdown**  
  Mark each book as Want to Read, Reading, or Read — and switch statuses whenever you like.

- **Sort Your Library**  
  Use a dropdown to sort books by title (A–Z or Z–A) or by reading status for better organization.

- **Drag-and-Drop Reordering**  
  Reorder books in your library manually with a simple drag-and-drop interface. The new order is saved automatically.

- **More Info Pop-up**  
  Click “More Info” to view a detailed description, subjects, and a link to the full Open Library page.

- **Duplicate Prevention**  
  Each saved book uses a unique key, so you won’t accidentally save the same title twice.

- **Responsive Design**  
  ShelfLeaf looks and works great on phones, tablets, and desktops thanks to mobile-first CSS with Flexbox, Grid, and media queries.

- **Helpful Error Messages**  
  Friendly guidance when searches return nothing, or something goes wrong.

---

## How to Run This Project


### Option 1: Use the Live Demo  
Visit the hosted version here:  
[https://shelf-leaf.vercel.app](https://shelf-leaf.vercel.app)

No setup required — just open the link in your browser and start searching, saving, and organizing books.

---

### Option 2: Run Locally

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

- Integrated a third-party API (Open Library)
- Responsive design with media queries, Flexbox, and Grid for mobile/desktop support
- Persistent data using `localStorage` for saved book library
- Real-time UI updates with array/object manipulation
- Duplicate prevention using unique keys
- Visually appealing, accessible, and user-friendly interface
- 10+ distinct Git commits made using terminal commands
- README includes a project overview, feature list, instructions, and future improvements
---

## Future Features

- Genre/tag support based on book subjects  
- Export/import personal library to file  
- Light/dark theme switch

---

## Author

H. Richard Neal III  
Code:You January 2025 Cohort
