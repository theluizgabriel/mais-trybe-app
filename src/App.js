import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
