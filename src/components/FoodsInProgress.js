import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import globalContext from '../context/globalContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import getMealApi from '../service/MealApi';

function FoodsInProgress({ currentId }) {
  const { recipeDetails, detailsArray,
    setDetailsArray, setRecipeDetails } = useContext(globalContext);
  const [arrayStorage, setArrayStorage] = useState([]);

  useEffect(() => {
    const mealDetails = async (id) => {
      const mealApi = await getMealApi('details', id);
      const array = Object.entries(mealApi.meals[0])
        .map((detail) => detail);
      const arrayFilter1 = array
        .filter((a) => a[1] !== '' && ' ' && a[1] !== null);
      const arrayIng = (arrayFilter1.filter((str) => (str[0]
        .includes('strIngredient')))).map((b) => b[1]);
      const arrayMea = (arrayFilter1.filter((str) => (str[0]
        .includes('strMeasure')))).map((b) => b[1]);
      setDetailsArray(arrayIng.map((a, i) => ({ ingredient: `${a}`,
        measure: `${arrayMea[i]}` })));
      setRecipeDetails(mealApi.meals);
      setArrayStorage(JSON.parse(localStorage.getItem('inProgressRecipes')));
    };
    mealDetails(currentId);
  }, []);

  const pushCheck = ({ target: { name } }) => {
    const getItem = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getItem === null || getItem.meals === undefined) {
      const estrutura = {
        ...getItem,
        meals: {
          [currentId]: [name],
        },
      };
      setArrayStorage(estrutura);
      localStorage.setItem('inProgressRecipes', JSON.stringify(estrutura));
    } if (getItem.meals) {
      const idsOnStorage = Object.keys(getItem.meals)
        .some((key) => key === currentId);
      if (idsOnStorage) {
        const someIng = getItem.meals[currentId].some((ing) => ing === name);
        if (someIng) {
          const excluirIng = getItem.meals[currentId].filter((ing) => ing !== name);
          const estruturaExcluir = {
            ...getItem,
            meals: {
              ...getItem.meals,
              [currentId]: [...excluirIng],
            },
          };
          setArrayStorage(estruturaExcluir);
          return localStorage.setItem('inProgressRecipes', JSON
            .stringify(estruturaExcluir));
        }
        const estrutura = {
          ...getItem,
          meals: {
            ...getItem.meals,
            [currentId]: [...getItem.meals[currentId], name],
          },
        };
        setArrayStorage(estrutura);
        localStorage.setItem('inProgressRecipes', JSON
          .stringify(estrutura));
      } else {
        const estrutura = {
          ...getItem,
          meals: {
            ...getItem.meals,
            [currentId]: [name],
          },
        };
        setArrayStorage(estrutura);
        localStorage.setItem('inProgressRecipes', JSON
          .stringify(estrutura));
      }
    }
  };

  const checkedHandle = (ing) => {
    const getItem = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getItem && getItem.meals) {
      return getItem.meals[currentId].includes(ing);
    }
  };

  return (
    <>
      { recipeDetails.map((item, index) => (
        <div key={ index }>
          <img
            src={ item.strMealThumb }
            alt={ item.strMeal }
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-title">{item.strMeal}</h3>
          <button
            type="button"
            data-testid="share-btn"
          >
            <img
              src={ shareIcon }
              alt="Share"
            />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            <img
              src={ blackHeartIcon }
              alt="Share"
            />
          </button>
          <p data-testid="recipe-category">{item.strCategory}</p>
          <ul>
            {detailsArray.map((detail, i) => (
              <div
                key={ i }
                data-testid={ `${i}-ingredient-step` }
              >
                <li>
                  <input
                    type="checkbox"
                    id={ detail.ingredient }
                    name={ detail.ingredient }
                    onChange={ pushCheck }
                    checked={ checkedHandle(detail.ingredient) }
                  />
                  <span style={ risco }>
                    {/* style={ document.getElementById(`${detail.ingredient}`).checked
                      ? { textDecoration: 'line-through' } : { color: 'black' } } */}
                    {`${detail.ingredient}: ${detail.measure}`}

                  </span>

                </li>
              </div>
            ))}
          </ul>
          <p data-testid="instructions">{item.strInstructions}</p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finish

          </button>
        </div>
      )) }
    </>
  );
}

FoodsInProgress.propTypes = {
  currentId: PropTypes.string.isRequired,
};

export default FoodsInProgress;
