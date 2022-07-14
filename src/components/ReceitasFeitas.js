import React, { useEffect, useContext } from 'react';
import contextProvider from '../context/contextProvider';

function ReceitasFeitas() {
  const { setTitle } = useContext(contextProvider);
  useEffect(() => { setTitle('Receitas Feitas'); }, []);
  return (
    <div>ReceitasFeitas</div>
  );
}

export default ReceitasFeitas;
