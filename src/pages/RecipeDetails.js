/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import globalContext from '../context/globalContext';
import getMealApi from '../service/MealApi';

function RecipeDetails() {
  const { mealID } = useContext(globalContext);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const mealDetails = async (id) => {
      const mealApi = await getMealApi('details', id);
      setDetails(mealApi.meals);
      console.log(mealApi.meals);
    };
    mealDetails(mealID);
  }, []);

  return (
    <div>
      { details.map((item, index) => (
        <div key={ index }>
          <img
            src={ item.strMealThumb }
            alt={ item.strMeal }
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-title">{item.strMeal}</h3>
          <p data-testid="recipe-category">{item.strCategory}</p>
          {/* Os ingredientes devem possuir o atributo data-testid="${index}-ingredient-name-and-measure"; */}
          <ul>
            <li>{`${item.strIngredient1}: ${item.strMeasure1}`}</li>
            <li>{`${item.strIngredient2}: ${item.strMeasure2}`}</li>
            <li>{`${item.strIngredient3}: ${item.strMeasure3}`}</li>
            <li>{`${item.strIngredient4}: ${item.strMeasure4}`}</li>
            <li>{`${item.strIngredient5}: ${item.strMeasure5}`}</li>
            <li>{`${item.strIngredient6}: ${item.strMeasure6}`}</li>
            <li>{`${item.strIngredient7}: ${item.strMeasure7}`}</li>
            <li>{`${item.strIngredient8}: ${item.strMeasure8}`}</li>
            <li>{`${item.strIngredient9}: ${item.strMeasure9}`}</li>
            <li>{`${item.strIngredient10}: ${item.strMeasure10}`}</li>
            <li>{`${item.strIngredient11}: ${item.strMeasure11}`}</li>
            <li>{`${item.strIngredient12}: ${item.strMeasure12}`}</li>
            <li>{`${item.strIngredient13}: ${item.strMeasure13}`}</li>
            <li>{`${item.strIngredient14}: ${item.strMeasure14}`}</li>
            <li>{`${item.strIngredient15}: ${item.strMeasure15}`}</li>
            <li>{`${item.strIngredient16}: ${item.strMeasure16}`}</li>
            <li>{`${item.strIngredient17}: ${item.strMeasure17}`}</li>
            <li>{`${item.strIngredient18}: ${item.strMeasure18}`}</li>
            <li>{`${item.strIngredient19}: ${item.strMeasure19}`}</li>
            <li>{`${item.strIngredient20}: ${item.strMeasure20}`}</li>
          </ul>
          <p data-testid="instructions">{item.strInstructions}</p>
          <iframe
            width="420"
            height="315"
            data-testid="video"
            src={ `https://www.youtube.com/embed/${item.strYoutube.split('https://www.youtube.com/')[1]}` }
            title={ item.strMeal }
          />
          {/* <div data-testid="${index}-recomendation-card">
            {item.strRecomendation}
          </div> */}
        </div>
      )) }
    </div>
  );
}

export default RecipeDetails;
