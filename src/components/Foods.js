import React, { useEffect, useContext } from 'react';
import globalContext from '../context/globalContext';
import CardsFoods from './CardsFoods';
import Header from './Header';

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
    </>
  );
}

export default Foods;
