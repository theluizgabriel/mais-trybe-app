/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import getMealApi from '../service/MealApi';

function FoodDetails({ recipeID }) {
  const [details, setDetails] = useState([]);
  const [detailsArray, setDetailsArray] = useState([]);

  useEffect(() => {
    const mealDetails = async (id) => {
      const mealApi = await getMealApi('details', id);
      const array = Object.entries(mealApi.meals[0])
        .map((detail) => detail);
      const arrayFilter1 = array.filter((a) => a[1] !== '' && a[1] !== ' ');
      const arrayIng = (arrayFilter1.filter((str) => (str[0]
        .includes('strIngredient')))).map((b) => b[1]);
      const arrayMea = (arrayFilter1.filter((str) => (str[0]
        .includes('strMeasure')))).map((b) => b[1]);
      setDetailsArray(arrayIng.map((a, i) => ({ ingredient: a,
        measure: arrayMea[i] })));
      setDetails(mealApi.meals);
    };
    mealDetails(recipeID);
  }, []);

  return (
    <div>
      { details && details.map((item, index) => (
        <div key={ index }>
          <img
            src={ item.strMealThumb }
            alt={ item.strMeal }
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-title">{item.strMeal}</h3>
          <p data-testid="recipe-category">{item.strCategory}</p>
          {/* Os ingredientes devem possuir o atribut data-testid="${index}-ingredient-name-and-measure"; */}
          <ul>
            {detailsArray.map((detail, i = 1) => (
              <li key={ i }>{`${detail.ingredient}: ${detail.measure}`}</li>
            ))}
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
        </div>
      )) }
    </div>
  );
}

export default FoodDetails;
