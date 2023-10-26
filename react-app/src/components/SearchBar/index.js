import React, { useEffect, useState } from "react";
import {DebounceInput} from 'react-debounce-input'
import { useHistory, useLocation } from "react-router-dom";
import './SearchBar.css'

function SearchBar() {
  const history = useHistory()
  const location = useLocation()
  const [term, setTerm] = useState("");

  useEffect(() => {
    if (location.pathname === '/search') {
      setTerm(location.search.slice(7))
    }
  }, [location])

  const clearSearch = () => {
    setTerm('')
  }

  const handleChange = e => {
    setTerm(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    history.push(`/search?query=${term}`)

  };

  return (
    <div className='search-bar'>
      <form onSubmit={handleSubmit}>
          <button
              type="submit"
              className="search-button">
              <i className="fa-solid fa-magnifying-glass" />
          </button>
          <DebounceInput
              type="text"
              minLength={2}
              debounceTimeout={500}
              placeholder="Food, groceries, drinks, etc"
              value={term}
              onChange={handleChange}
              className="search-input"
          />
      </form>
      <div className="buttons-div">
        <button
          onClick={clearSearch}
          className={`clear-search ${term.length === 0 ? 'hide' : ''}`}>
          <i className="fa-solid fa-x" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
