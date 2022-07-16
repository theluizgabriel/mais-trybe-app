import React, { useEffect, useContext } from 'react';
import globalContext from '../context/globalContext';
import Header from './Header';
import Footer from './Footer';

function Profile() {
  const { setTitle, setShowSearch } = useContext(globalContext);

  useEffect(() => {
    setTitle('Profile');
    setShowSearch(false);
  });

  return (
    <>
      <Header />
      <Footer />
    </>
  );
}

export default Profile;
