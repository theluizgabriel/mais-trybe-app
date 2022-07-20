/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import globalContext from '../context/globalContext';
import getMealApi from '../service/MealApi';

function FoodDetails({ recipeID, startRecipeBtn }) {
  const { recipeDetails, setRecipeDetails } = useContext(globalContext);

  useEffect(() => {
    const mealDetails = async (id) => {
      const mealApi = await getMealApi('details', id);
      console.log(mealApi.meals);
      setRecipeDetails(mealApi.meals);
    };
    mealDetails(recipeID);
  }, []);

  return (
    <div>
      { recipeDetails && recipeDetails.map((item, index) => (
        <div key={ index }>
          <img
            src={ item.strMealThumb }
            alt={ item.strMeal }
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-title">{item.strMeal}</h3>
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
          <iframe
            width="420"
            height="315"
            data-testid="video"
            src={ `https://www.youtube.com/embed/${item.strYoutube.split('https://www.youtube.com/watch?v=')[1]}` }
            title={ item.strMeal }
          />
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

export default FoodDetails;
