import React, { useEffect, useContext } from 'react';
import globalContext from '../context/globalContext';
import Header from '../components/Header';
import CardsFoods from '../components/CardsFoods';
import Footer from '../components/Footer';

function Foods() {
  const { setTitle, setShowSearch } = useContext(globalContext);

  useEffect(() => {
    setTitle('Foods');
    setShowSearch(true);
  });

  return (
    <>
      <Header />
      <CardsFoods />
      <Footer />
    </>
  );
}

export default Foods;
