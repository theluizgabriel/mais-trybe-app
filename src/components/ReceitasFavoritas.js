import React, { useEffect, useContext } from 'react';
import Header from './Header';
import contextProvider from '../context/contextProvider';

function ReceitasFavoritas() {
  const { setTitle } = useContext(contextProvider);
  useEffect(() => { setTitle('Receitas Favoritas'); }, []);
  return (
    <>
      <Header />
      <div>ReceitasFavoritas</div>
    </>
  );
}

export default ReceitasFavoritas;
