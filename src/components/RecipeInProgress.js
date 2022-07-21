import React from 'react';
import { useHistory } from 'react-router-dom';
import DrinksInProgress from './DrinksInProgress';
import FoodsInProgress from './FoodsInProgress';

function RecipeInProgress() {
  const history = useHistory().location.pathname;
  const currentID = useHistory().location.pathname.split('/')[2];

  return (
    <div>
      { history.includes('foods') && <FoodsInProgress currentId={ currentID } />}
      { history.includes('drinks') && <DrinksInProgress currentId={ currentID } />}
    </div>

  );
}

export default RecipeInProgress;
