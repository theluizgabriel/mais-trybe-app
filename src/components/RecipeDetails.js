/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import DrinkDetails from './DrinkDetails';
import FoodDetails from './FoodDetails';

function RecipeDetails({ history }) {
  const currentPage = (history.location.pathname).split('/')[1];

  return (
    <div>
      { currentPage === 'foods' && (<FoodDetails
        recipeID={ (history.location.pathname).split('/')[2] }
      />)}
      { currentPage === 'drinks' && (<DrinkDetails
        recipeID={ (history.location.pathname).split('/')[2] }
      />)}
    </div>
  );
}

export default RecipeDetails;
