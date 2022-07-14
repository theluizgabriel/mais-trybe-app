import React from 'react';

function Header() {
  return (
    <>
      <h1 datatest-id="page-title">Oi</h1>
      <img
        data-testid="profile-top-btn"
        src="src/images/profileIcon.svg"
        alt="Profile Icon"
      />
      <img
        data-testid="search-top-btn"
        src="src/images/searchIcon.svg"
        alt="Profile Icon"
      />

    </>
  );
}

export default Header;
