/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import globalContext from '../context/globalContext';
import getDrinkApi from '../service/DrinkApi';
import getMealApi from '../service/MealApi';

function DrinkDetails({ recipeID, startRecipeBtn }) {
  const { drinkDetails,
    setDrinkDetails,
    setDataFoods,
    dataFoods,
    setMealID,
    drinkIng,
    setDrinkIng } = useContext(globalContext);
  const history = useHistory();
  const SEIS = 6;

  useEffect(() => {
    const fetchDrinkDetails = async (id) => {
      const drinkApi = await getDrinkApi('details', id);
      const array = Object.entries(drinkApi.drinks[0])
        .map((detail) => detail);
      const arrayFilter1 = array.filter((a) => a[1] !== '' && ' ' && a[1] !== null);
      const arrayIng = (arrayFilter1.filter((str) => (str[0]
        .includes('strIngredient')))).map((b) => b[1]);
      const arrayMea = (arrayFilter1.filter((str) => (str[0]
        .includes('strMeasure')))).map((b) => b[1]);
      setDrinkIng(arrayIng.map((a, i) => ({ ingredient: `${a}`,
        measure: `${arrayMea[i]}` })));
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
          <p data-testid="recipe-category">
            {item.strCategory}
            ,
            {' '}
            {item.strAlcoholic}
          </p>
          {/* cada ingrediente deve ter um data-testid="${index}-ingredient-name-and-measure" */}
          <ul>
            {drinkIng.map((detail, i) => (
              <li
                key={ i }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                {`${detail.ingredient}: ${detail.measure}`}

              </li>
            ))}
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

DrinkDetails.propTypes = {
  recipeID: PropTypes.string.isRequired,
  startRecipeBtn: PropTypes.func.isRequired,
};

export default DrinkDetails;
