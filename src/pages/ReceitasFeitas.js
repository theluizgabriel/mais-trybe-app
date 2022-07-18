import React, { useEffect, useContext } from 'react';
import globalContext from '../context/globalContext';
import Header from '../components/Header';

function ReceitasFeitas() {
  const { setTitle, setShowSearch } = useContext(globalContext);

  useEffect(() => {
    setTitle('Done Recipes');
    setShowSearch(false);
  });

  return (
    <Header />
  );
}

export default ReceitasFeitas;
