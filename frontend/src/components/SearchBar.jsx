import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ handleSearch }) => {
  const [location, setLocation] = useState('');

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(location);
  };

  return (
    <div className="search-form">
      <h1 className="header-text">What&#39;s the weather?</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input className="search-input" type="text" placeholder="Location" onChange={handleChange} />
        <input type="submit" className="search-submit" value="🔎" />
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func,
};

SearchBar.defaultProps = {
  handleSearch: null,
};

export default SearchBar;
