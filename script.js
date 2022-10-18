let myLibrary = [];

const bookTable = document.getElementById("bookTable");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return title + ", by " + author + " at " + pages + " pages and " + read + ".";
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function addBookToTable(book) {
    let newRow = bookTable.insertRow(-1);
    let titleCell = newRow.insertCell(0);
    let authorCell = newRow.insertCell(1);
    let pagesCell = newRow.insertCell(2);
    let readCell = newRow.insertCell(3);

    let newTitle = document.createTextNode(book.title);
    titleCell.appendChild(newTitle);

    let newAuthor = document.createTextNode(book.author);
    authorCell.appendChild(newAuthor);

    let newPages = document.createTextNode(book.pages);
    pagesCell.appendChild(newPages);

    let newRead = document.createTextNode(book.read);
    readCell.appendChild(newRead);
}

function showLibrary() {
    removeTable(); //this refreshes the table when you want to show new books.
    for(let i = 0; i < myLibrary.length; i++) {
        addBookToTable(myLibrary[i]);
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
    newForm.setAttribute("onsubmit", "return doForm()");

    // create input for Title (text)
    let title = document.createElement("input");
    title.setAttribute("type", "text");
    title.setAttribute("name", "title");
    title.setAttribute("placeholder", "Title");

    // input for Author (text)

    // input for Pages (number)

    // input for Have Read It (radio button)

    // add the title input to the form

    newForm.appendChild(title);

    document.getElementsByTagName("body")[0].appendChild(breakLine);
    document.getElementsByTagName("body")[0].appendChild(newForm);
}

// this is where i pull the form info from
function doForm(){

}

const hitchhikers = new Book("HHTGT", "Douglas Adams", 287, "have read it");

const mybook = new Book("Untitiled", "Evan Dumas", 128, "haven't read it");

const bibble = new Book("Bibble", "Jesus", 666, "haven't read it");

addBookToLibrary(hitchhikers);
addBookToLibrary(mybook);
addBookToLibrary(bibble);

console.log(myLibrary.length);


showLibrary();
