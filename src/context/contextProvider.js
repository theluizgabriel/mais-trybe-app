import React from 'react';
import PropTypes from 'prop-types';
import globalContext from './globalContext';

function GlobalProvider({ children }) {
  const value = {

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
