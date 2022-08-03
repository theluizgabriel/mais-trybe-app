import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import globalContext from '../context/globalContext';
import getMealApi from '../service/MealApi';
import getDrinkApi from '../service/DrinkApi';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import MessageLinkCopied from './MessageLinkCopied';
import addFavoriteMeal from '../service/AddFavoriteMeal';
import removeFavoriteMeal from '../service/RemoveFavoriteMeal';

function FoodDetails({ recipeID, startRecipeBtn }) {
  const { mealDetails,
    setMealDetails,
    setDataDrinks,
    dataDrinks,
    setDrinkID,
    mealIng,
    setMealIng } = useContext(globalContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const history = useHistory();
  const SEIS = 6;

  useEffect(() => {
    const fetchMealDetails = async (id) => {
      const mealApi = await getMealApi('details', id);
      const array = Object.entries(mealApi.meals[0])
        .map((detail) => detail);
      const arrayFilter1 = array.filter((a) => a[1] !== '' && ' ' && a[1] !== null);
      const arrayIng = (arrayFilter1.filter((str) => (str[0]
        .includes('strIngredient')))).map((b) => b[1]);
      const arrayMea = (arrayFilter1.filter((str) => (str[0]
        .includes('strMeasure')))).map((b) => b[1]);
      setMealIng(arrayIng.map((a, i) => ({ ingredient: `${a}`,
        measure: `${arrayMea[i]}` })));
      setMealDetails(mealApi.meals);
    };
    fetchMealDetails(recipeID);
  }, []);

  useEffect(() => {
    const recomendationCards = async () => {
      const rec = await getDrinkApi('name', '');
      setDataDrinks(rec.drinks);
    };
    recomendationCards();
  }, []);

  const copyToClipboard = () => {
    const url = history.location.pathname;
    navigator.clipboard.writeText(`http://localhost:3000${url}`);
    setIsCopied(true);
  };

  const addFav = () => {
    addFavoriteMeal(mealDetails);
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
    removeFavoriteMeal(mealDetails);
    setIsFavorite(false);
  };

  useEffect(() => {
    const getItem = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getItem && getItem.meals) {
      const id = Object.keys(getItem.meals).includes(recipeID);
      if (id === true) {
        setIsInProgress(true);
      } else {
        setIsInProgress(false);
      }
    }
  }, []);

  return (
    <div>
      { mealDetails && mealDetails.map((item, index) => (
        <div
          key={ index }
          className="flex flex-wrap justify-center items-center min-h-max mt-24"
        >
          <div className="flex flex-col w-11/12 bg-[#E32929] items-center justify-center">
            <img
              src={ item.strMealThumb }
              alt={ item.strMeal }
              data-testid="recipe-photo"
              className="w-100 h-48 object-cover"
            />
            <div
              id="topper"
              className="flex flex-col ml-4 mt-2 items-center justify-center"
            >

              <h3
                data-testid="recipe-title"
                className="mb-3 text-white"
              >
                {item.strMeal}

              </h3>
              <div className="mb-2">
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
                      className="mr-1 w-7"
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
                      className="mr-1 w-7"
                    />
                  </button>
                )}
                <button
                  type="button"
                  className="details-btn"
                  data-testid="share-btn"
                  onClick={ copyToClipboard }
                >
                  <img
                    src={ shareIcon }
                    alt="Profile Icon"
                    className="ml-1 w-7"
                  />
                </button>
                {
                  isCopied && <MessageLinkCopied />
                }
              </div>
              <p
                data-testid="recipe-category"
                className="text-white"
              >
                {item.strCategory}

              </p>
            </div>
          </div>
          <div className="mt-14 bg-[#FF611D] p-6 text-center mb-14 rounded-lg text-white">
            <ul className="mt-2">
              {mealIng.map((detail, i = 1) => (
                <li
                  key={ i }
                  data-testid={ `${i}-ingredient-name-and-measure` }
                >
                  {`${detail.ingredient}: ${detail.measure}`}
                </li>
              ))}
            </ul>
          </div>
          <p
            data-testid="instructions"
            className="w-60 text-center ml-4 mb-14 mt-10"
          >
            {item.strInstructions}

          </p>
          <iframe
            width="320"
            height="215"
            className="mb-14"
            data-testid="video"
            src={ `https://www.youtube.com/embed/${item.strYoutube.split('https://www.youtube.com/watch?v=')[1]}` }
            title={ item.strMeal }
          />

          <button
            type="button"
            data-testid="start-recipe-btn"
            className="fixed bottom-0 bg-[#FF611D] pr-12 pl-12 pt-2 pb-2 text-white
            rounded"
            onClick={ startRecipeBtn }
          >
            { isInProgress
              ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        </div>
      )) }
      <div className="flex flex-wrap justify-center mb-20 mt-14">
        {dataDrinks && dataDrinks.map((drink, index) => (
          index < SEIS && (
            <div
              className="recomendation-container"
              data-testid={ `${index}-recomendation-card` }
            >
              <button
                type="button"
                key={ drink.idDrink }
                onClick={ () => {
                  setDrinkID(drink.idDrink);
                  history.push(`/drinks/${drink.idDrink}`);
                } }
              >
                <img
                  width="150px"
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb }
                  alt={ `drink-${index}` }
                />
                <h2 data-testid={ `${index}-recomendation-title` }>
                  {drink.strDrink}
                </h2>
              </button>
            </div>
          )

        ))}
      </div>
    </div>
  );
}

FoodDetails.propTypes = {
  recipeID: PropTypes.string.isRequired,
  startRecipeBtn: PropTypes.func.isRequired,
};

export default FoodDetails;
