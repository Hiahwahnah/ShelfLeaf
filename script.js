// ======= TAB SWITCHING =======
const searchTab = document.getElementById('searchTab');
const libraryTab = document.getElementById('libraryTab');
const searchPage = document.getElementById('searchPage');
const libraryPage = document.getElementById('libraryPage');

searchTab.addEventListener('click', () => {
    searchPage.classList.add('active');
    libraryPage.classList.remove('active');
    searchTab.classList.add('active-tab');
    libraryTab.classList.remove('active-tab');
});

libraryTab.addEventListener('click', () => {
    libraryPage.classList.add('active');
    searchPage.classList.remove('active');
    libraryTab.classList.add('active-tab');
    searchTab.classList.remove('active-tab');
    renderLibrary(); // Render library when switching to it
});

// ======= SEARCH & DISPLAY BOOKS =======
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();

    if (query === '') {
        searchResults.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }
    
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
        displayResults(data.docs);
        })
    .catch(error => {
        console.error('Error fetching data:', error);
        searchResults.innerHTML = '<p>Something went wrong. Try again later.</p>';
    });
});

function displayResults(books) {
    searchResults.innerHTML = '';

    if (books.length === 0) {
        searchResults.innerHTML = '<p>No results found.</p>';
        return;
    }

  books.slice(0, 12).forEach(book => {
    const title = book.title;
    const author = book.author_name ? book.author_name.join(', ') : 'Unknown';
    const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://via.placeholder.com/100x150?text=No+Cover';
    
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.innerHTML = `
        <img src="${cover}" alt="Book cover" />
        <strong>${title}</strong>
        <em>${author}</em>
        <button>Add to Library</button>
    `;

    const addBtn = card.querySelector('button');
    addBtn.addEventListener('click', () => {
        addToLibrary({ title, author, cover, status: 'wantToRead' });
    });
    
    searchResults.appendChild(card);
});
}

// ======= ADD TO LIBRARY =======
function addToLibrary(book) {
    const library = JSON.parse(localStorage.getItem('shelfLeafLibrary')) || [];

    // Check for duplicates
    const exists = library.some(b => b.title === book.title && b.author === book.author);
    if (exists) {
        alert('This book is already in your library.');
        return;
    }

    library.push(book);
    localStorage.setItem('shelfLeafLibrary', JSON.stringify(library));
    alert(`Added "${book.title}" to your library!`);
}

// ======= RENDER LIBRARY =======
function renderLibrary() {
    const library = JSON.parse(localStorage.getItem('shelfLeafLibrary')) || [];    
    const libraryList = document.getElementById('libraryList');

    libraryList.innerHTML = '';

    if (library.length === 0) {
        libraryList.innerHTML = '<p>Your library is empty.</p>';
        return;
    }

    library.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('book-card');
        card.innerHTML = `
            <img src="${book.cover}" alt="Book cover" />
            <strong>${book.title}</strong>
            <em>${book.author}</em>
            <p>Status: ${book.status === 'read' ? 'Read' : 'Want to Read'}</p>
            <button class="markBtn">${book.status === 'read' ? 'Mark as Want to Read' : 'Mark as Read'}</button>
            <button class="removeBtn">Remove</button>
        `;

        const markBtn = card.querySelector('.markBtn');
        const removeBtn = card.querySelector('.removeBtn');

        markBtn.addEventListener('click', () => toggleStatus(book.title, book.author));
        removeBtn.addEventListener('click', () => removeBook(book.title, book.author));

        libraryList.appendChild(card);
    });
}

// ======= TOGGLE STATUS =======
function toggleStatus(title, author) {
    const library = JSON.parse(localStorage.getItem('shelfLeafLibrary')) || [];

    const updated = library.map(book => {
        if (book.title === title && book.author === author) {
            book.status = book.status === 'read' ? 'wantToRead' : 'read';
        }
        return book;
    });

    localStorage.setItem('shelfLeafLibrary', JSON.stringify(updated));
    renderLibrary();
}

// ======= REMOVE BOOK =======
function removeBook(title, author) {
    const library = JSON.parse(localStorage.getItem('shelfLeafLibrary')) || [];

    const filtered = library.filter(book => !(book.title === title && book.author === author));
    localStorage.setItem('shelfLeafLibrary', JSON.stringify(filtered));
    renderLibrary();
}