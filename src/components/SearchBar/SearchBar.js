import React, { useCallback } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch, term, setTerm }) => {
  
  const handleTermChange = useCallback(({ target: { value } }) => {
    setTerm(value);
  }, [setTerm]);

  const clearInput = useCallback(() => {
    setTerm("");

  }, [setTerm]);

  const search = useCallback(() => {
    onSearch(term);
  }, [onSearch, term]);

  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song Title" value={term} onChange={handleTermChange} onFocus={clearInput} />
      <button id="submit" className="SearchButton" onClick={search}>
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;