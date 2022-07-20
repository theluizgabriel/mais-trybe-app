/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import globalContext from '../context/globalContext';
import getDrinkApi from '../service/DrinkApi';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DrinkDetails({ recipeID, startRecipeBtn }) {
  const {
    recipeDetails,
    setRecipeDetails,
  } = useContext(globalContext);
  const [detailsArray, setDetailsArray] = useState([]);
  // const history = useHistory();

  useEffect(() => {
    const drinkDetails = async (id) => {
      const drinkApi = await getDrinkApi('details', id);
      const array = Object.entries(drinkApi.drinks[0])
        .map((detail) => detail);
      const arrayFilter1 = array.filter((a) => a[1] !== '' && a[1] !== ' ');
      const arrayIng = (arrayFilter1.filter((str) => (str[0]
        .includes('strIngredient')))).map((b) => b[1]);
      const arrayMea = (arrayFilter1.filter((str) => (str[0]
        .includes('strMeasure')))).map((b) => b[1]);
      setDetailsArray(arrayIng.map((a, i) => ({ ingredient: a,
        measure: arrayMea[i] })));
      setRecipeDetails(drinkApi.drinks);
    };
    drinkDetails(recipeID);
  }, []);

  // Salva a mesma receita a cada click
  const favoriteRecipe = () => {
    const drinkInfo = {
      id: recipeDetails[0].idDrink,
      type: 'drink',
      nationality: '',
      category: recipeDetails[0].strCategory,
      alcoholicOrNot: recipeDetails[0].strAlcoholic,
      name: recipeDetails[0].strDrink,
      image: recipeDetails[0].strDrinkThumb,
    };
    const getFavoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (getFavoriteRecipes === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([drinkInfo]));
    } else {
      const parse = JSON.parse(getFavoriteRecipes);
      console.log(parse);
      const prevLocalStorage = [...parse, drinkInfo];
      localStorage.setItem('favoriteRecipes', JSON.stringify(prevLocalStorage));
    }
  };

  return (
    <div>
      { recipeDetails && recipeDetails.map((item, index) => (
        <div key={ index }>
          <img
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
            data-testid="recipe-photo"
          />
          <div id="topper">
            <h3 data-testid="recipe-title">{item.strMeal}</h3>
            {/* <div> */}
            <button
              type="button"
              className="details-btn"
              data-testid="share-btn"
              // onClick={ copyToClipboard }
            >
              <img
                src={ shareIcon }
                alt="Profile Icon"
              />
            </button>
            <button
              type="button"
              className="details-btn"
              data-testid="favorite-btn"
              onClick={ favoriteRecipe }
            >
              <img
                src={ whiteHeartIcon }
                alt="Profile Icon"
              />
            </button>
            {/* </div> */}
          </div>
          <p data-testid="recipe-category">{item.strCategory}</p>
          {/* cada ingrediente deve ter um data-testid="${index}-ingredient-name-and-measure" */}
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

export default DrinkDetails;
