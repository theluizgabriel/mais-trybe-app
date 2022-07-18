import React, { useEffect, useContext } from 'react';
import globalContext from '../context/globalContext';
import Header from '../components/Header';

function Drinks() {
  const { setTitle, setShowSearch } = useContext(globalContext);

  useEffect(() => {
    setTitle('Drinks');
    setShowSearch(true);
  });

  return (
    <Header />
  );
}

export default Drinks;
