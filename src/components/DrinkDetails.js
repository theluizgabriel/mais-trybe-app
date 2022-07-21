/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import globalContext from '../context/globalContext';
import getDrinkApi from '../service/DrinkApi';
import getMealApi from '../service/MealApi';

function DrinkDetails({ recipeID, startRecipeBtn }) {
  const { drinkDetails,
    setDrinkDetails,
    setDataFoods,
    dataFoods,
    setMealID } = useContext(globalContext);
  const history = useHistory();
  const SEIS = 6;

  useEffect(() => {
    const fetchDrinkDetails = async (id) => {
      const drinkApi = await getDrinkApi('details', id);
      setDrinkDetails(drinkApi.drinks);
    };
    fetchDrinkDetails(recipeID);
  }, []);

  useEffect(() => {
    const recomendationCards = async () => {
      const rec = await getMealApi('name', '');
      setDataFoods(rec.meals);
    };
    recomendationCards();
  }, []);

  return (
    <div>
      { drinkDetails && drinkDetails.map((item, index) => (
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
      { dataFoods && dataFoods.map((food, index) => (
        index < SEIS && (
          <div
            role="button"
            tabIndex={ 0 } // Lint issue
            key={ food.idMeal }
            data-testid={ `${index}-recomendation-card` }
            onClick={ () => {
              setMealID(food.idMeal);
              history.push(`/foods/${food.idMeal}`);
            } }
            className="food-card"
            onKeyPress={ () => { history.push(`/foods/${food.idMeal}`); } } // Lint issue
          >
            <img
              width="150px"
              data-testid={ `${index}-card-img` }
              src={ food.strMealThumb }
              alt={ `food-${index}` }
            />
            <h2
              data-testid={ `${index}-card-name` }
            >
              {food.strMeal}

            </h2>
          </div>
        )
      )) }
    </div>
  );
}

export default DrinkDetails;
