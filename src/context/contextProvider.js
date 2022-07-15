import React from 'react';
import PropTypes from 'prop-types';
import globalContext from './globalContext';
import useCustomHook from '../hook/useCustomHook';

function GlobalProvider({ children }) {
  const { title,
    setTitle,
    showSearch,
    setShowSearch } = useCustomHook();
  const value = {
    title,
    setTitle,
    showSearch,
    setShowSearch,
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
