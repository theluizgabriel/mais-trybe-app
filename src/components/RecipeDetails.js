import React from 'react';
import PropTypes from 'prop-types';
import DrinkDetails from './DrinkDetails';
import FoodDetails from './FoodDetails';

function RecipeDetails({ history }) {
  const currentPage = (history.location.pathname).split('/')[1];
  const currentID = (history.location.pathname).split('/')[2];

  const startRecipeBtn = () => {
    history.push(`/${currentPage}/${currentID}/in-progress`);
  };

  return (
    <div>
      { currentPage === 'foods' && (<FoodDetails
        recipeID={ currentID }
        startRecipeBtn={ startRecipeBtn }
      />)}
      { currentPage === 'drinks' && (<DrinkDetails
        recipeID={ currentID }
        startRecipeBtn={ startRecipeBtn }
      />)}
    </div>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default RecipeDetails;
