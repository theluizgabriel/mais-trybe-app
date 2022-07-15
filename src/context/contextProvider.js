import React from 'react';
import PropTypes from 'prop-types';
import globalContext from './globalContext';
import useCustomHook from '../hook/useCustomHook';

function GlobalProvider({ children }) {
  const { title,
    setTitle,
    showSearch,
    setShowSearch,
    dataFoods,
    setDataFoods,
    dataDrinks,
    setDataDrinks } = useCustomHook();
  const value = {
    title,
    setTitle,
    showSearch,
    setShowSearch,
    dataFoods,
    setDataFoods,
    dataDrinks,
    setDataDrinks,
  };
  return (
    <globalContext.Provider value={ value }>
      {children}
    </globalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
