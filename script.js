let myLibrary = [];

const bookTable = document.getElementById("bookTable");
const addButton = document.getElementById("addBook");

// hard coded books for testing
const hitchhikers = new Book("HHTGT", "Douglas Adams", 287, "Have read it");
const mybook = new Book("Untitiled", "Evan Dumas", 128, "Haven't read it");
const bibble = new Book("Bibble", "Jesus", 666, "Haven't read it");

addBookToLibrary(hitchhikers);
addBookToLibrary(mybook);
addBookToLibrary(bibble);

// initial showing of pregen books
// showLibrary();


function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;

    this.info = function() {
        return title + ", by " + author + " at " + pages + " pages and " + read + ".";
    }
}


function addBookToLibrary(book) {
    book.id = myLibrary.length;
    myLibrary.push(book);
}

function addBookToTable(book) {
    let newRow = bookTable.insertRow(-1);
    let titleCell = newRow.insertCell(0);
    let authorCell = newRow.insertCell(1);
    let pagesCell = newRow.insertCell(2);
    let readCell = newRow.insertCell(3);
    let buttonCell = newRow.insertCell(4);

    let newTitle = document.createTextNode(book.title);
    titleCell.appendChild(newTitle);

    let newAuthor = document.createTextNode(book.author);
    authorCell.appendChild(newAuthor);

    let newPages = document.createTextNode(book.pages);
    pagesCell.appendChild(newPages);

    let newRead = document.createTextNode(book.read);
    readCell.appendChild(newRead);

    // update it here when this runs during refresh.

    let removeButton = document.createElement("button");
    removeButton.setAttribute("id", book.id);
    removeButton.innerHTML = "Remove Book";
    buttonCell.appendChild(removeButton);

    removeButton.addEventListener("click", () => removeBook(book.id));
}

function removeBook(id){
    // remove the offending section
    myLibrary.splice(id, 1);
    // refresh the table, and thus the buttons
    showLibrary();
}

function showLibrary() {
    removeTable(); //this refreshes the table when you want to show new books.
    // this will refresh the button id too!

    for(let i = 0; i < myLibrary.length; i++) {
        addBookToTable(myLibrary[i]);
        myLibrary[i].id = i;
    }
}

function removeTable() {
    while(bookTable.rows.length > 2){
        bookTable.deleteRow(2);
    };
}

function addForm(){
    // Create a break line element
    let breakLine = document.createElement("br");

    // make the form not submit, instead run a function to pull the data
    let newForm = document.createElement("form");
    newForm.setAttribute("onsubmit", "return");
    newForm.setAttribute("id", "newForm");

    // create input for Title (text)
    let title = document.createElement("input");
    title.setAttribute("type", "text");
    title.setAttribute("name", "title");
    title.setAttribute("placeholder", "Title");

    // input for Author (text)
    let author = document.createElement("input");
    author.setAttribute("type", "text");
    author.setAttribute("name", "author");
    author.setAttribute("placeholder", "Author");

    // input for Pages (number)
    let pages = document.createElement("input");
    pages.setAttribute("type", "number");
    pages.setAttribute("name", "pages");
    pages.setAttribute("placeholder", "Pages");

    // input for Have Read It (checkbox)
    let read = document.createElement("input");
    read.setAttribute("type", "checkbox");
    read.setAttribute("id", "read");
    read.setAttribute("name", "read");
    read.setAttribute("value","Have read it");

    let readLabel = document.createElement("label");
    readLabel.setAttribute("for", "read");
    readLabel.textContent = "Have you read it?";

    // will need a submit button to add the book

    let submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Add book to library");

    newForm.appendChild(title);
    newForm.appendChild(breakLine);
    newForm.appendChild(author);
    newForm.appendChild(breakLine);
    newForm.appendChild(pages);
    newForm.appendChild(breakLine);
    newForm.appendChild(readLabel);
    newForm.appendChild(read);
    newForm.appendChild(breakLine);
    newForm.appendChild(submitButton);

    document.getElementsByTagName("body")[0].appendChild(newForm);

    newForm.addEventListener('submit', callbackFunction);

}

function callbackFunction(event) {
    event.preventDefault();
    
    const myFormData = new FormData(event.target);

    const formDataObj = Object.fromEntries(myFormData.entries());

    // the id is the current library length (which will be the new array position once added, smart!)
    // it assumes the library array is the same as what's showing, will need to fix that.
    parseBook(formDataObj.title, formDataObj.author, formDataObj.pages, formDataObj.read, myLibrary.length);

};

// this is where i pull the form info from
function parseBook(title, author, pages, read = `haven't read it`, id){

    const newBook = new Book(title, author, pages, read, id);

    // add to array
    addBookToLibrary(newBook);

    // refresh library
    showLibrary();

    // remove form and break
    let node = document.getElementById("newForm");
    console.log(node);

    let garbage = node.parentNode.removeChild(node);
}

// when button is clicked, pop up the form via the function
addButton.addEventListener("click", () => addForm());

