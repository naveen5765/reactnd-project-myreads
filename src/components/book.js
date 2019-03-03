import React from 'react';
import PropTypes from "prop-types";

class Book extends React.Component {
    state={
        bookShelf : this.props.shelf
    }

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" 
                        style={{ 
                            width: 128, 
                            height: 193, 
                            backgroundImage: `url(${this.props.url})`
                        }} />
                    <div className="book-shelf-changer">
                        <select 
                            value={this.state.bookShelf ? this.state.bookShelf : "none"} 
                            onChange={(event) => {
                                this.setState({
                                    bookShelf: event.target.value
                                })
                                this.props.changeShelf(event.target.value)
                            }}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.authors}</div>
            </div>
        ) 
    }
}

Book.propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    url: PropTypes.string,
    shelf: PropTypes.string,
    changeShelf: PropTypes.func
};

export default Book;