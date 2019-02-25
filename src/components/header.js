import React from 'react';
import PropTypes from "prop-types";

const Header = function(props){
    return (
    <div className="list-books-title">
        <h1>{props.title}</h1>
    </div>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired
};

export default Header;