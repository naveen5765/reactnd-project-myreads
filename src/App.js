import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Header from './components/header'
import Bookshelf from './components/bookshelf'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books
        })
      })
  }

  changeShelf = (id, value) => {
    if(value !== "none"){
      const params = {"id": id};
      BooksAPI.update(params, value)
        .then((updatedBookShelfInfo) => {
          this.updateBookShelf(updatedBookShelfInfo);
        })
    }
  }

  updateBookShelf = (updatedBookShelfInfo) => {
    this.setState((currentState) => ({
      books : currentState.books.map((book) => {
        if (updatedBookShelfInfo.currentlyReading.includes(book.id))
          book.shelf = "currentlyReading";
        else if (updatedBookShelfInfo.wantToRead.includes(book.id))
          book.shelf = "wantToRead";
        else if (updatedBookShelfInfo.read.includes(book.id))
          book.shelf = "read";
        return book;
      })
    }))
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
        <div className="list-books">
            <Header title="My Reads" />
            <div className="list-books-content">
              <Bookshelf title="Currently Reading" books={currentlyReadingBooks} changeShelf={this.changeShelf}/>
              <Bookshelf title="Want to Read" books={wantToReadBooks} changeShelf={this.changeShelf}/>
              <Bookshelf title="Read" books={readBook} changeShelf={this.changeShelf}/>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
      </div>
    )
  }
}

export default BooksApp;
