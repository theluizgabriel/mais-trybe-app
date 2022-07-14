import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Drinks from './components/Drinks';
import Foods from './components/Foods';
import Profile from './components/Profile';
import ReceitasFavoritas from './components/ReceitasFavoritas';
import ReceitasFeitas from './components/ReceitasFeitas';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalProvider from './context/contextProvider';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ ReceitasFeitas } />
          <Route exact path="/favorite-recipes" component={ ReceitasFavoritas } />
        </Switch>
        <div className="meals">
          <span className="logo">TRYBE</span>
          <object
            className="rocksGlass"
            type="image/svg+xml"
            data={ rockGlass }
          >
            Glass
          </object>
        </div>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
