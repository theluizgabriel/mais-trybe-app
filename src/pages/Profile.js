import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import globalContext from '../context/globalContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const { setTitle, setShowSearch } = useContext(globalContext);

  const history = useHistory();

  useEffect(() => {
    setTitle('Profile');
    setShowSearch(false);
  });

  const getEmail = () => {
    const userEmail = localStorage.getItem('user');
    const email = JSON.parse(userEmail);
    if (email === null) {
      return 'email@email.com';
    }
    return email.email;
  };

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div id="profile-page">
      <Header />
      <div className="flex flex-col items-center mt-4">
        <h3 data-testid="profile-email" className="mb-8">
          {getEmail()}
        </h3>
        <button
          data-testid="profile-done-btn"
          type="button"
          className="bg-[#FF611D] pt-2 pb-2 pl-6 pr-6 rounded-md mb-6 w-80"
          onClick={ () => { history.push('/done-recipes'); } }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          className="bg-[#FF611D] pt-2 pb-2 pl-6 pr-6 rounded-md mb-6 w-80"
          onClick={ () => { history.push('/favorite-recipes'); } }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          className="bg-black pt-2 pb-2 pl-6 pr-6 rounded-md mb-6 w-60 text-white"
          type="button"
          onClick={ handleClick }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>

  );
}

export default Profile;
