const myLibrary = [];

function Book(name, authorName, classification, pageNum, readStatus) {
    this.classification = classification;
    this.name = name;
    this.author = authorName;
    this.id = crypto.randomUUID();
    this.pages = pageNum;
    this.status = readStatus;   
};

function loadDefaultBooks() {
    addBookToLibrary("Hobbit", "JRR Tolkien", "Fiction", 320, "Read");
    addBookToLibrary("Fellowship of the Ring", "JRR Tolkien", "Fiction", 448, "Read");
    addBookToLibrary("Encyclopedia of Knowledge", "Miles Kelly", "Non-Fiction", 512, "Unread");
};

function acceptFormData() {
    var name = document.getElementById("name").value;
    var classification = document.getElementById("classification").value;
    var author = document.getElementById("author").value;
    var pages = document.getElementById("pages").value;
    var status = document.getElementById("status").value;
    addBookToLibrary(name, author, classification, pages, status);
};

function addBookToLibrary(name, author, classification, pageNum, readStatus) {
    var newBook = new Book(name, author, classification, pageNum, readStatus);
    myLibrary.push(newBook);
    console.log(myLibrary);
    displayBooks(myLibrary);
};

function displayBooks() {
    var displayArea = document.getElementById("bookDisplay");
    displayArea.innerHTML = "";
    for (book of myLibrary) {
        var newBookCard = document.createElement("div");
        newBookCard.classList.add("bookCard");
        var bookName = document.createElement("h2");
        bookName.innerHTML = book.name;
        var author = document.createElement("p");
        author.innerHTML = "Author: " + book.author;
        var classification = document.createElement("p");
        classification.innerHTML = book.classification;
        var id = document.createElement("p");
        id.innerHTML = "id: " + book.id;
        var pageNum = document.createElement("p");
        pageNum.innerHTML = "Number of Pages: " + book.pages;
        newBookCard.append(bookName);
        newBookCard.append(author);
        newBookCard.append(classification);
        newBookCard.append(pageNum);
        newBookCard.append(destroyButton(book.id));
        newBookCard.append(statusButton(book.status, book.id));
        newBookCard.append(id);
        displayArea.append(newBookCard);
    }
    
     
};

function destroyButton(id) {
    var destroyButton = document.createElement("button");
    destroyButton.innerHTML = "Remove book from library";
    destroyButton.className = id;
    destroyButton.addEventListener("click", () => {
        var target = myLibrary.find((book) => book.id == destroyButton.className);
        myLibrary.splice(myLibrary.indexOf(target), 1)
        displayBooks();
    });
    return destroyButton;
};

function statusButton(status, id) {
    var statusButton = document.createElement("button")
    statusButton.innerHTML = status;
    statusButton.className = id;
    statusButton.addEventListener("click", () => {
        var target = myLibrary.find((book) => book.id == statusButton.className);
        if (statusButton.innerHTML == "Read") {
            target.status = "Unread";
        } else {
            target.status = "Read";
        };
        displayBooks();
    });
    return statusButton;
};


const updateButton = document.getElementById("update");
const dialog = document.getElementById("updateForm");
const cancelButton = document.getElementById("cancel");
const confifmButton = document.getElementById("confirm");

updateButton.addEventListener("click", () => {
    dialog.showModal();
});

cancelButton.addEventListener("click", () => {
    dialog.close();
});

confifmButton.addEventListener("click", () => {
    dialog.close();
});