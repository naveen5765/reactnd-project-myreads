import React from 'react';
import PropTypes from "prop-types";

const Book = function(props){
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" 
                    style={{ 
                        width: 128, 
                        height: 193, 
                        backgroundImage: `url(${props.url})`
                    }} />
                <div className="book-shelf-changer">
                    <select value={props.shelf} onChange={(event) => props.changeShelf(event.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props.title}</div>
            <div className="book-authors">{props.authors}</div>
        </div>
    );
}

Book.propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    url: PropTypes.string,
    shelf: PropTypes.string,
    changeShelf: PropTypes.func
};

export default Book;