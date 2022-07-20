/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import globalContext from '../context/globalContext';
import getMealApi from '../service/MealApi';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FoodDetails({ recipeID, startRecipeBtn }) {
  const {
    recipeDetails,
    setRecipeDetails,
  } = useContext(globalContext);
  const [detailsArray, setDetailsArray] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();

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
      setRecipeDetails(mealApi.meals);
    };
    mealDetails(recipeID);
  }, []);

  const copyToClipboard = () => {
    const url = history.location.pathname;
    // const copy = require('clipboard-copy');
    // copy(`http://localhost:3000${url}`);
    navigator.clipboard.writeText(`http://localhost:3000${url}`);
    global.alert('Link copied!');
  };

  // Salva a mesma receita a cada click
  const addFavorite = () => {
    const mealInfo = {
      id: recipeDetails[0].idMeal,
      type: 'food',
      nationality: recipeDetails[0].strArea,
      category: recipeDetails[0].strCategory,
      alcoholicOrNot: '',
      name: recipeDetails[0].strMeal,
      image: recipeDetails[0].strMealThumb,
    };
    const getFavoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (getFavoriteRecipes === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([mealInfo]));
    } else {
      const parse = JSON.parse(getFavoriteRecipes);
      console.log(parse);
      const prevLocalStorage = [...parse, mealInfo];
      localStorage.setItem('favoriteRecipes', JSON.stringify(prevLocalStorage));
    }
    setIsFavorite(true);
  };

  // a fazer

  const removeFavorite = () => {
    // const getlocalStorage = localStorage.getItem('favoriteRecipes');
    // const parseLocal = JSON.parse(getlocalStorage);
    // const favoriteItem = parseLocal.filter((item) = (
    //   item.id === recipeDetails[0].idMeal
    // ));

    // localStorage.removeItem('favoriteRecipes', favoriteItem);
    // setIsFavorite(false);
  };

  return (
    <div>
      { recipeDetails && recipeDetails.map((item, index) => (
        <div key={ index }>
          <img
            src={ item.strMealThumb }
            alt={ item.strMeal }
            data-testid="recipe-photo"
          />
          <div id="topper">
            <h3 data-testid="recipe-title">{item.strMeal}</h3>
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
                  onClick={ addFavorite }
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
                  onClick={ removeFavorite }
                >
                  <img
                    src={ blackHeartIcon }
                    alt="Profile Icon"
                  />
                </button>
              )}
            </div>
          </div>
          <p data-testid="recipe-category">{item.strCategory}</p>
          <ul>
            {detailsArray.map((detail, i = 1) => (
              <li
                key={ i }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${detail.ingredient}: ${detail.measure}`}
              </li>
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
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
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
