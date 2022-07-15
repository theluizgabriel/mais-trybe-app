import React, { useEffect, useContext } from 'react';
import Header from './Header';
import globalContext from '../context/globalContext';

function ReceitasFavoritas() {
  const { setTitle, setShowSearch } = useContext(globalContext);

  useEffect(() => {
    setTitle('Favorite Recipes');
    setShowSearch(false);
  });

  return (
    <>
      <Header />
      <div>ReceitasFavoritas</div>
    </>
  );
}

export default ReceitasFavoritas;
