import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Book from "./book";

class SearchBooks extends Component {

    state = {
        books: []
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-create-contact">
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                    {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" 
                        onChange={(event) => {
                            this.props.getBooksBasedOnSearch(event.target.value);
                        }}
                        placeholder="Search by title or author"
                    />
                    </div>
                </div>
                <div className="search-books-results">
                    {this.props.books.error === undefined 
                    ? 
                        <>
                            {this.props.books.length> 0 
                            ? 
                                <ol className="books-grid">
                                    {this.props.books.map(book => (
                                        <li key={book.id}>
                                            <Book 
                                                title={book.title} 
                                                authors={book.authors}
                                                url={book.imageLinks && book.imageLinks.thumbnail}
                                                shelf={book.shelf}
                                                changeShelf={(value) => this.props.addToShelf(book, value)}
                                            />
                                        </li>
                                    ))}
                                </ol>
                            :
                                <div>Please Type the book you want to search</div>
                            }
                        </>
                    : 
                        <div>{this.props.books.error}</div>
                    }
                </div>
            </div>
        );
    }
}


SearchBooks.propTypes = {
    addToShelf: PropTypes.func
};

export default SearchBooks;
