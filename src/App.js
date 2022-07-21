import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Drinks from './pages/Drinks';
import Foods from './pages/Foods';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeDetails from './components/RecipeDetails';
import RecipeInProgress from './components/RecipeInProgress';
import DoneRecipes from './pages/DoneRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/foods/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route exact path="/recipe-in-progress/:id" component={ RecipeInProgress } />
    </Switch>
  );
}

export default App;
