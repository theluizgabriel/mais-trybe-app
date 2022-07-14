import React, { useEffect, useContext } from 'react';
import contextProvider from '../context/contextProvider';

function Drinks() {
  const { setTitle } = useContext(contextProvider);
  useEffect(() => { setTitle('Drinks'); }, []);
  return (
    <div>Drinks</div>
  );
}

export default Drinks;
