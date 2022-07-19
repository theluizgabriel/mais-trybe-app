/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import getDrinkApi from '../service/DrinkApi';

function DrinkDetails({ recipeID }) {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const drinkDetails = async (id) => {
      const drinkApi = await getDrinkApi('details', id);
      setDetails(drinkApi.drinks);
    };
    drinkDetails(recipeID);
  }, []);

  return (
    <div>
      { details && details.map((item, index) => (
        <div key={ index }>
          <img
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-title">{item.strDrink}</h3>
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
          {/* <div data-testid="${index}-recomendation-card">
            {item.strRecomendation}
          </div> */}
        </div>
      )) }
    </div>
  );
}

export default DrinkDetails;
