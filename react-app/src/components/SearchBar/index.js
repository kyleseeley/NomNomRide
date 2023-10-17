import React, { useState } from "react";
import {DebounceInput} from 'react-debounce-input'
import { useHistory } from "react-router-dom";
import './SearchBar.css'

function SearchBar() {
  const history = useHistory()
  const [term, setTerm] = useState("");

  const clearSearch = () => {
    setTerm('')
  }

  const handleChange = e => {
    setTerm(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Do something with the search term
    history.push('/search')

  };

  return (
    <>
      <form
          onSubmit={handleSubmit}
          className='search-bar'>
          <DebounceInput
              type="text"
              minLength={2}
              debounceTimeout={500}
              placeholder="Food, groceries, drinks, etc"
              value={term}
              onChange={handleChange}
              className="search-input"
          />
          <div className="buttons-div">
            <button
              onClick={clearSearch}
              className={`clear-search ${term.length === 0 ? 'hide' : ''}`}>
              <i className="fa-solid fa-x" />
            </button>
            <button
                type="submit"
                className="search-button">
                <i className="fa-solid fa-magnifying-glass" />
            </button>
          </div>
      </form>
    </>
  );
};

export default SearchBar;
