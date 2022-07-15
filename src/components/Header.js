import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import globalContext from '../context/globalContext';
import SearchBar from './SearchBar';

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
    <div>
      <h1
        data-testid="page-title"
        id="Title"
      >
        {title}

      </h1>
      <button type="button" onClick={ () => { history.push('/profile'); } }>
        <img
          data-testid="profile-top-btn"
          src="../images/profileIcon.svg"
          alt="Profile Icon"
        />
      </button>
      {showSearch
      && (
        <button
          type="button"
          onClick={ showSearchBar }
        >
          <img
            data-testid="search-top-btn"
            src="../images/searchIcon.svg"
            alt="Search Icon"
          />

        </button>)}
      {searchBar && <SearchBar />}

    </div>
  );
}

//

export default Header;
