import React, { useEffect, useContext } from 'react';
import globalContext from '../context/globalContext';
import Header from '../components/Header';
import CardsDrinks from '../components/CardsDrinks';
import Footer from '../components/Footer';

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
