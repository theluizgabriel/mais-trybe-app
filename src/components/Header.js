import React, { useContext } from 'react';
import contextProvider from '../context/contextProvider';

function Header() {
  const { title } = useContext(contextProvider);
  return (
    <>
      <h1 datatest-id="page-title">{title}</h1>
      <img
        data-testid="profile-top-btn"
        src="src/images/profileIcon.svg"
        alt="Profile Icon"
      />
      <img
        data-testid="search-top-btn"
        src="src/images/searchIcon.svg"
        alt="Search Icon"
      />

    </>
  );
}

export default Header;
