import React, { useEffect, useContext } from 'react';
import globalContext from '../context/globalContext';
import Header from '../components/Header';

function Foods() {
  const { setTitle, setShowSearch } = useContext(globalContext);

  useEffect(() => {
    setTitle('Foods');
    setShowSearch(true);
  });

  return (
    <Header />
  );
}

export default Foods;
