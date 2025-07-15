// Get references to tabs and content sections
const searchTab = document.getElementById('searchTab');
const libraryTab = document.getElementById('libraryTab');
const searchPage = document.getElementById('searchPage');
const libraryPage = document.getElementById('libraryPage');

// Handle tab switching
searchTab.addEventListener('click', () => {
    searchPage.classList.add('active');
    libraryPage.classList.remove('active');
});

libraryTab.addEventListener('click', () => {
    libraryPage.classList.add('active');
    searchPage.classList.remove('active');
});

// Get references for search functionality
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// When the user clicks Search, fetch book data
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim(); // Get user input
    if (query === '') {
        searchResults.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }
    
    // Fetch data from Open Library API
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
        displayResults(data.docs); // Send results to display function
        })
    .catch(error => {
        console.error('Error fetching data:', error);
        searchResults.innerHTML = '<p>Something went wrong. Try again later.</p>';
    });
});

// Function to create and display book cards
function displayResults(books) {
    searchResults.innerHTML = ''; // Clear previous results
    if (books.length === 0) {
        searchResults.innerHTML = '<p>No results found.</p>';
        return;
    }

  // Show only the first 10 results
  books.slice(0, 10).forEach(book => {
    const title = book.title;
    const author = book.author_name ? book.author_name.join(', ') : 'Unknown';
    const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://via.placeholder.com/100x150?text=No+Cover';
    
    // Create simple card for each book
    const card = document.createElement('div');
    card.innerHTML = `
        <div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
            <img src="${cover}" alt="Book cover" style="width:100px;"><br>
            <strong>${title}</strong><br>
            <em>${author}</em><br>
            <button>Add to Library</button>
        </div>
    `;

    // Add click event to the button
    const addBtn = card.querySelector('button');
    addBtn.addEventListener('click', () => {
        addToLibrary({ title, author, cover, status: 'wantToRead' });
    });
    
    searchResults.appendChild(card);
});
}

function addToLibrary(book) {
    // Try to get existing library from localStorage
    const library = JSON.parse(localStorage.getItem('shelfLeafLibrary')) || [];

    // Check for duplicates
    const alreadyExists = library.some(b => b.title === book.title && b.author === book.author);
    if (alreadyExists) {
        alert('This book is already in your library.');
        return;
    }

    // Add book and save updated library
    library.push(book);
    localStorage.setItem('shelfLeafLibrary', JSON.stringify(library));

    alert(`Added "${book.title}" to your library!`);
}