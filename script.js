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
  renderLibrary();
});

// ======= SEARCH & DISPLAY BOOKS =======
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchForm = document.getElementById('searchForm');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchBtn.click();
});

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();

  if (query === '') {
    searchResults.innerHTML = '<p>Looks like you forgot to type something. Try searching for a title like "Harry Potter" or "The Hobbit"</p>';
    return;
  }

  searchResults.innerHTML = '<p>Searching for books...</p>';

  fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      displayResults(data.docs);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      searchResults.innerHTML = '<p>I think something is wrong. Would you mind coming back again later?</p>';
    });
});

function displayResults(books) {
  searchResults.innerHTML = '';

  if (books.length === 0) {
    searchResults.innerHTML = "<p>Couldn't find anything. Maybe check your spelling or try something different.</p>";
    return;
  }

  books.slice(0, 12).forEach(book => {
    const key = book.key || book.cover_edition_key || `${book.title}-${book.author_name}`;
    const title = book.title;
    const author = book.author_name ? book.author_name.join(', ') : 'Unknown';
    const cover = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : 'https://wallpapers.com/images/high/red-leather-blank-book-cover-ja6121mqrx4crxz2-ja6121mqrx4crxz2.png';

    const card = document.createElement('div');
    card.classList.add('book-card');
    card.innerHTML = `
      <img src="${cover}" alt="Book cover" />
      <strong>${title}</strong>
      <em>${author}</em>
      <button class="addBtn">Add to Library</button>
      <button class="infoBtn">More Info</button>
    `;

    card.querySelector('.addBtn').addEventListener('click', () => {
      addToLibrary({ key, title, author, cover, status: 'wantToRead' });
    });

    card.querySelector('.infoBtn').addEventListener('click', () => {
      getBookDetails(book.key, title);
    });

    searchResults.appendChild(card);
  });
}

// ======= ADD TO LIBRARY =======
function addToLibrary(book) {
  const library = JSON.parse(localStorage.getItem('shelfLeafLibrary')) || [];

  const exists = library.some(b => b.key === book.key);
  if (exists) {
    alert('You already have this one.');
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
    const statusId = `status-${book.key.replace(/[\/\s]/g, '-')}`;
    card.classList.add('book-card');
    card.innerHTML = `
      <img src="${book.cover}" alt="Book cover" />
      <strong>${book.title}</strong>
      <em>${book.author}</em>
      <label for="${statusId}">Status:</label>
      <select id="${statusId}" name="bookStatus" class="statusSelect">
        <option value="wantToRead" ${book.status === 'wantToRead' ? 'selected' : ''}>Want to Read</option>
        <option value="reading" ${book.status === 'reading' ? 'selected' : ''}>Reading</option>
        <option value="read" ${book.status === 'read' ? 'selected' : ''}>Read</option>
      </select>
      <button class="infoBtn">More Info</button>
      <button class="removeBtn">Remove</button>
    `;

    card.querySelector('.infoBtn').addEventListener('click', () => {
      getBookDetails(book.key, book.title);
    });

    card.querySelector('.statusSelect').addEventListener('change', (e) => {
      updateStatus(book.key, e.target.value);
    });

    card.querySelector('.removeBtn').addEventListener('click', () => {
      removeBook(book.key);
    });

    libraryList.appendChild(card);
  });
}

// ======= UPDATE STATUS =======
function updateStatus(key, newStatus) {
  const library = JSON.parse(localStorage.getItem('shelfLeafLibrary')) || [];
  const updated = library.map(book =>
    book.key === key ? { ...book, status: newStatus } : book
  );
  localStorage.setItem('shelfLeafLibrary', JSON.stringify(updated));
  renderLibrary();
}

// ======= REMOVE BOOK =======
function removeBook(key) {
  const library = JSON.parse(localStorage.getItem('shelfLeafLibrary')) || [];
  const filtered = library.filter(book => book.key !== key);
  localStorage.setItem('shelfLeafLibrary', JSON.stringify(filtered));
  renderLibrary();
}

// ======= GET BOOK DETAILS =======
function getBookDetails(bookKey, bookTitle = '') {
  fetch(`https://openlibrary.org${bookKey}.json`)
    .then(response => response.json())
    .then(data => {
      const workKey = data.works?.[0]?.key || bookKey;
      showBookPopUp(data, workKey, bookTitle);
    })
    .catch(error => {
      console.error('Error fetching book details:', error);
      alert("Sorry, we couldn't load details for this book.");
    });
}

// ======= SHOW POPUP =======
function showBookPopUp(data, workKey, title = '') {
  const popUp = document.getElementById('bookPopUp');
  const popUpBody = document.getElementById('popUpBody');
  const closePopUp = document.getElementById('closePopUp');

  const description = data.description
    ? typeof data.description === 'string'
      ? data.description
      : data.description.value
    : "No description available.";

  const subjects = data.subjects
    ? data.subjects.slice(0, 5).join(', ')
    : "Not listed";

  const firstPublished = data.first_publish_date || "Unknown";
  const slugTitle = slugifyTitle(title || data.title);
  const workLink = `https://openlibrary.org${workKey}/${slugTitle}?edition=key%3A${encodeURIComponent(data.key)}`;

  popUpBody.innerHTML = `
    <h2 id="popUpTitle">${data.title}</h2>
    <p>${description}</p>
    <p><strong>First published:</strong> ${firstPublished}</p>
    <p><strong>Subjects:</strong> ${subjects}</p>
    <p><a href="${workLink}" target="_blank" rel="noopener noreferrer">View on Open Library</a></p>
  `;

  popUp.classList.remove('hidden');
  document.body.classList.add('popUp-open');

  closePopUp.onclick = () => {
    popUp.classList.add('hidden');
    document.body.classList.remove('popUp-open');
  };

  popUp.onclick = (e) => {
    if (e.target === popUp) {
      popUp.classList.add('hidden');
      document.body.classList.remove('popUp-open');
    }
  };
}

// ======= SLUGIFY TITLE =======
function slugifyTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_{2,}/g, '_')
    .trim();
}

// ======= ESCAPE KEY CLOSE =======
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('bookPopUp').classList.add('hidden');
    document.body.classList.remove('popUp-open');
  }
});