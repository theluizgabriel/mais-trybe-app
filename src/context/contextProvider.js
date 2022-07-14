import React from 'react';
import PropTypes from 'prop-types';
import globalContext from './globalContext';
import useCustonHook from '../hook/useCustonHook';

function GlobalProvider({ children }) {
  const { title, setTitle } = useCustonHook();
  const value = {
    title, setTitle,
  };
  return (
    <globalContext.Provider value={ { value } }>
      {children}
    </globalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
