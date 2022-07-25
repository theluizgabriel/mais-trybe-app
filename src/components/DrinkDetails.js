/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import globalContext from '../context/globalContext';
import getDrinkApi from '../service/DrinkApi';
import getMealApi from '../service/MealApi';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import MessageLinkCopied from './MessageLinkCopied';
import addFavoriteDrink from '../service/AddFavoriteDrink';
import removeFavoriteDrink from '../service/RemoveFavoriteDrink';

function DrinkDetails({ recipeID, startRecipeBtn }) {
  const { drinkDetails,
    setDrinkDetails,
    setDataFoods,
    dataFoods,
    setMealID,
    drinkIng,
    setDrinkIng } = useContext(globalContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
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

  const copyToClipboard = () => {
    const url = history.location.pathname;
    navigator.clipboard.writeText(`http://localhost:3000${url}`);
    setIsCopied(true);
  };

  const addFav = () => {
    addFavoriteDrink(drinkDetails);
    setIsFavorite(true);
  };

  useEffect(() => {
    const func = () => {
      const getlocalStorage = localStorage.getItem('favoriteRecipes');
      const parseLocal = JSON.parse(getlocalStorage);
      if (parseLocal !== null) {
        setIsFavorite(parseLocal.some((item) => (item.id === recipeID)));
      }
    };
    func();
  }, []);

  const removeFav = () => {
    removeFavoriteDrink(drinkDetails);
    setIsFavorite(false);
  };

  useEffect(() => {
    const getItem = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getItem && getItem.cocktails) {
      const id = Object.keys(getItem.cocktails).includes(recipeID);
      if (id === true) {
        setIsInProgress(true);
      } else {
        setIsInProgress(false);
      }
    }
  }, []);

  return (
    <div>
      { drinkDetails && drinkDetails.map((item, index) => (
        <div key={ index }>
          <img
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
            data-testid="recipe-photo"
            className="recipe-photo"
          />
          <div id="topper">
            <h3 data-testid="recipe-title">{item.strDrink}</h3>
            <div>
              <button
                type="button"
                className="details-btn"
                data-testid="share-btn"
                onClick={ copyToClipboard }
              >
                <img
                  src={ shareIcon }
                  alt="Profile Icon"
                />
              </button>
              { isFavorite === false ? (
                <button
                  type="button"
                  className="details-btn"
                  data-testid="favorite-btn"
                  src={ whiteHeartIcon }
                  onClick={ addFav }
                >
                  <img
                    src={ whiteHeartIcon }
                    alt="Profile Icon"
                  />
                </button>
              ) : (
                <button
                  type="button"
                  className="details-btn"
                  data-testid="favorite-btn"
                  src={ blackHeartIcon }
                  onClick={ removeFav }
                >
                  <img
                    src={ blackHeartIcon }
                    alt="Profile Icon"
                  />
                </button>
              )}
              {
                isCopied && <MessageLinkCopied />
              }
            </div>
          </div>
          <p data-testid="recipe-category">{item.strAlcoholic}</p>
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
            className="start-recipe-btn"
            onClick={ startRecipeBtn }
          >
            { isInProgress
              ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        </div>
      )) }
      <div className="recomendation-container">
        { dataFoods && dataFoods.map((food, index) => (
          index < SEIS && (
            <div
              data-testid={ `${index}-recomendation-card` }
              className="recomendation-item"
            >
              <button
                type="button"
                // tabIndex={ 0 } // Lint issue
                key={ food.idMeal }
                onClick={ () => {
                  setMealID(food.idMeal);
                  history.push(`/foods/${food.idMeal}`);
                } }
              >
                <img
                  width="150px"
                  data-testid={ `${index}-card-img` }
                  src={ food.strMealThumb }
                  alt={ `food-${index}` }
                />
                <h2
                  data-testid={ `${index}-recomendation-title` }
                >
                  {food.strMeal}

                </h2>
              </button>
            </div>
          )
        )) }
      </div>
    </div>
  );
}

DrinkDetails.propTypes = {
  recipeID: PropTypes.string.isRequired,
  startRecipeBtn: PropTypes.func.isRequired,
};

export default DrinkDetails;
