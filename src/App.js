import React from 'react'
import {Route, Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import Header from './components/header'
import Bookshelf from './components/bookshelf'
import SearchBooks from './components/searchBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: []
  }

  componentDidMount(){
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books
        })
      })
  }

  addToShelf = (book, value) => {
    if(book.shelf === undefined){
      book.shelf = value;
      this.setState((currentState) => ({
        books: currentState.books.concat(book)
      }))
    }
    this.changeShelf(book.id, value);
  }

  changeShelf = (id, value) => {
    const params = {"id": id};
    BooksAPI.update(params, value)
      .then((updatedBookShelfInfo) => {
        this.updateBookShelf(updatedBookShelfInfo);
      })
  }

  updateBookShelf = (updatedBookShelfInfo) => {
    this.setState((currentState) => ({
      books : currentState.books.map((book) => {
        this.setShelf(updatedBookShelfInfo.currentlyReading, updatedBookShelfInfo.wantToRead, updatedBookShelfInfo.read, book);
        return book;
      })
    }))
  }

  setShelf = (currentlyReading, wantToRead, read, book) => {
    if (currentlyReading.includes(book.id))
      book.shelf = "currentlyReading";
    else if (wantToRead.includes(book.id))
      book.shelf = "wantToRead";
    else if (read.includes(book.id))
      book.shelf = "read";
    else 
      book.shelf = "none";
  }

  getBooksBasedOnSearch = (searchQuery) => {
    if(searchQuery === "")
      this.setState({
        searchBooks: []
      }) 
    else 
      BooksAPI.search(searchQuery)
      .then((books) => {
        if(books.error === undefined )
          books = this.compareBookShelf(books);
        this.setState({
          searchBooks: books
        })
      })   
  }

  compareBookShelf = (books) => {
    let currentlyReadingBooksID = [], wantToReadBooksID = [], readBookID = [];
    this.state.books.forEach(book => {
      if(book.shelf === "currentlyReading")
        currentlyReadingBooksID.push(book.id);
      else if(book.shelf === "wantToRead")
        wantToReadBooksID.push(book.id);
      else if(book.shelf === "read")
        readBookID.push(book.id);
    });
    books.forEach(book => {
      this.setShelf(currentlyReadingBooksID, wantToReadBooksID, readBookID, book);
    })
    return books;
  }

  render() {
    let currentlyReadingBooks = [], wantToReadBooks = [], readBook = [];
    this.state.books.forEach(book => {
      if(book.shelf === "currentlyReading")
        currentlyReadingBooks.push(book);
      else if(book.shelf === "wantToRead")
        wantToReadBooks.push(book);
      else if(book.shelf === "read")
        readBook.push(book);
    });
    
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <Header title="My Reads" />
            <div className="list-books-content">
              <Bookshelf title="Currently Reading" books={currentlyReadingBooks} changeShelf={this.changeShelf}/>
              <Bookshelf title="Want to Read" books={wantToReadBooks} changeShelf={this.changeShelf}/>
              <Bookshelf title="Read" books={readBook} changeShelf={this.changeShelf}/>
            </div>
            <div className="open-search">
              <Link to="/search">
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        )} />

        <Route path="/search" render={() => (
          <SearchBooks 
            books={this.state.searchBooks}
            getBooksBasedOnSearch={this.getBooksBasedOnSearch}
            addToShelf={this.addToShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp;
