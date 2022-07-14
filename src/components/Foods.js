import React, { useEffect, useContext } from 'react';
import contextProvider from '../context/contextProvider';

function Foods() {
  const { setTitle } = useContext(contextProvider);
  useEffect(() => { setTitle('Foods'); }, []);
  return (
    <div>Foods</div>
  );
}

export default Foods;
