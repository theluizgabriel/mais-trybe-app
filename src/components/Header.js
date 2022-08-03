import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import globalContext from '../context/globalContext';
import SearchBar from './SearchBar';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header() {
  const { title, showSearch } = useContext(globalContext);
  const [searchBar, setSearchBar] = useState(false);

  const history = useHistory();

  const showSearchBar = () => {
    if (searchBar === true) {
      setSearchBar(false);
    } else {
      setSearchBar(true);
    }
  };

  return (
    <header className="pt-4 bg-[#e32929] text-center pb-2">
      <h1
        data-testid="page-title"
        className="text-center text-white"
      >
        {title}
      </h1>
      <button
        type="button"
        className="header-btn mt-4"
        onClick={ () => { history.push('/profile'); } }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile Icon"
        />
      </button>
      {showSearch
      && (
        <button type="button" onClick={ showSearchBar } className="header-btn">
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Search Icon"
          />
        </button>)}
      {searchBar && <SearchBar />}
    </header>
  );
}

export default Header;
