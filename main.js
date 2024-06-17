document.addEventListener("DOMContentLoaded", () => {
  const books = JSON.parse(localStorage.getItem("books")) || [];

  const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
  const completeBookshelfList = document.getElementById("completeBookshelfList");

  const renderBooks = (filter = "") => {
    incompleteBookshelfList.innerHTML = "";
    completeBookshelfList.innerHTML = "";

    const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(filter.toLowerCase()));

    filteredBooks.forEach((book) => {
      const bookElement = createBookElement(book);
      if (book.isComplete) {
        completeBookshelfList.appendChild(bookElement);
      } else {
        incompleteBookshelfList.appendChild(bookElement);
      }
    });
  };

  const createBookElement = (book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = book.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = `Penulis: ${book.author}`;

    const bookYear = document.createElement("p");
    bookYear.innerText = `Tahun: ${book.year}`;

    const actionContainer = document.createElement("div");
    actionContainer.classList.add("action");

    const toggleButton = document.createElement("button");
    toggleButton.classList.add("green");
    toggleButton.innerText = book.isComplete ? "Belum selesai di Baca" : "Selesai dibaca";
    toggleButton.addEventListener("click", () => {
      book.isComplete = !book.isComplete;
      saveBooks();
      renderBooks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("red");
    deleteButton.innerText = "Hapus buku";
    deleteButton.addEventListener("click", () => {
      const index = books.findIndex((b) => b.id === book.id);
      books.splice(index, 1);
      saveBooks();
      renderBooks();
    });

    actionContainer.appendChild(toggleButton);
    actionContainer.appendChild(deleteButton);

    bookItem.appendChild(bookTitle);
    bookItem.appendChild(bookAuthor);
    bookItem.appendChild(bookYear);
    bookItem.appendChild(actionContainer);

    return bookItem;
  };

  const saveBooks = () => {
    localStorage.setItem("books", JSON.stringify(books));
  };

  const addBook = (title, author, year, isComplete) => {
    const book = {
      id: +new Date(),
      title,
      author,
      year,
      isComplete,
    };
    books.push(book);
    saveBooks();
    renderBooks();
  };

  document.getElementById("inputBook").addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = parseInt(document.getElementById("inputBookYear").value);
    const isComplete = document.getElementById("inputBookIsComplete").checked;

    addBook(title, author, year, isComplete);

    document.getElementById("inputBook").reset();
  });

  document.getElementById("searchBook").addEventListener("submit", (event) => {
    event.preventDefault();
    const filter = document.getElementById("searchBookTitle").value;
    renderBooks(filter);
  });

  renderBooks();
});
