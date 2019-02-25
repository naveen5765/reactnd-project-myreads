import React from 'react';
import PropTypes from "prop-types";
import Book from "./book";

const Bookshelf = function(props){
    return (
        <div className="bookshelf">
        <h2 className="bookshelf-title">{props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {props.books.map(book => (
                <li key={book.title}>
                    <Book 
                        title={book.title} 
                        authors={book.authors}
                        url={book.imageLinks.thumbnail}
                    />
                </li>
            ))}
          </ol>
        </div>
      </div>
    );
}

Bookshelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array
};

export default Bookshelf;