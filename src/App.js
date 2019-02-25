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
        console.log(books);
        this.setState({
          books
        })
      })
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
              <Bookshelf title="Currently Reading" books={currentlyReadingBooks} />
              <Bookshelf title="Want to Read" books={wantToReadBooks} />
              <Bookshelf title="Read" books={readBook} />
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
