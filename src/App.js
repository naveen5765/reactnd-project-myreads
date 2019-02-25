import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

import Header from './components/header'
import Bookshelf from './components/bookshelf'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
        <div className="list-books">
            <Header title="My Reads" />
            <div className="list-books-content">
              <Bookshelf title="Currently Reading" />
              <Bookshelf title="Want to Read" />
              <Bookshelf title="Read" />
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
