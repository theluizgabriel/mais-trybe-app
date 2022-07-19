/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import globalContext from '../context/globalContext';
import getDrinkApi from '../service/DrinkApi';

function DrinkDetails({ recipeID, startRecipeBtn }) {
  const { recipeDetails, setRecipeDetails } = useContext(globalContext);

  useEffect(() => {
    const drinkDetails = async (id) => {
      const drinkApi = await getDrinkApi('details', id);
      setRecipeDetails(drinkApi.drinks);
    };
    drinkDetails(recipeID);
  }, []);

  return (
    <div>
      { recipeDetails && recipeDetails.map((item, index) => (
        <div key={ index }>
          <img
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-title">{item.strDrink}</h3>
          <p data-testid="recipe-category">{item.strCategory}</p>
          {/* cada ingrediente deve ter um data-testid="${index}-ingredient-name-and-measure" */}
          <ul>
            <li>{`${item.strIngredient1}: ${item.strMeasure1}`}</li>
            <li>{`${item.strIngredient2}: ${item.strMeasure2}`}</li>
            <li>{`${item.strIngredient3}: ${item.strMeasure3}`}</li>
            <li>{`${item.strIngredient4}: ${item.strMeasure4}`}</li>
            <li>{`${item.strIngredient5}: ${item.strMeasure5}`}</li>
          </ul>
          <p data-testid="instructions">{item.strInstructions}</p>
          {/* <div data-testid="${index}-recomendation-card">
            {item.strRecomendation}
          </div> */}
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ startRecipeBtn }
          >
            Start Recipe
          </button>
        </div>
      )) }
    </div>
  );
}

export default DrinkDetails;
