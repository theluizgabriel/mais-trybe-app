import React, { useEffect, useContext } from 'react';
import globalContext from '../context/globalContext';
import CardsDrinks from './CardsDrinks';
import Header from './Header';
import Footer from './Footer';

function Drinks() {
  const { setTitle, setShowSearch } = useContext(globalContext);

  useEffect(() => {
    setTitle('Drinks');
    setShowSearch(true);
  });

  return (
    <>
      <Header />
      <CardsDrinks />
      <Footer />
    </>
  );
}

export default Drinks;
