import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import globalContext from '../context/globalContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import getMealApi from '../service/MealApi';

function FoodsInProgress({ currentId }) {
  const { recipeDetails, detailsArray,
    setDetailsArray, setRecipeDetails } = useContext(globalContext);
  const [arrayStorage, setArrayStorage] = useState('');

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
    };
    mealDetails(currentId);
    setArrayStorage([JSON.parse(localStorage.getItem('inProgressRecipes'))]);
  }, []);

  const pushCheck = ({ target: { name } }) => {
    const getItem = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(getItem);
    if (getItem === null || undefined) {
      const estrutura = {
        cocktails: { },
        meals: {
          [currentId]: [name],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(estrutura));
      setArrayStorage([estrutura]);
    } if (getItem.meals) {
      const idsOnStorage = Object.keys(getItem.meals)
        .some((key) => key === currentId);
      if (idsOnStorage) {
        const someIng = getItem.meals[currentId].some((ing) => ing === name);
        if (someIng) {
          const excluirIng = getItem.meals[currentId].filter((ing) => ing !== name);
          const estruturaExcluir = {
            meals: {
              ...getItem.meals,
              [currentId]: [...excluirIng],
            },
            cocktails: { ...getItem.cocktails },
          };
          setArrayStorage([estruturaExcluir]);
          return localStorage.setItem('inProgressRecipes', JSON
            .stringify(estruturaExcluir));
        }
        const estrutura = {
          meals: {
            ...getItem.meals,
            [currentId]: [...getItem.meals[currentId], name],
          },
          cocktails: { ...getItem.cocktails },
        };
        setArrayStorage([estrutura]);
        localStorage.setItem('inProgressRecipes', JSON
          .stringify(estrutura));
      } else {
        const estrutura = {
          meals: {
            ...getItem.meals,
            [currentId]: [name],
          },
          cocktails: { ...getItem.cocktails },
        };
        setArrayStorage([estrutura]);
        localStorage.setItem('inProgressRecipes', JSON
          .stringify(estrutura));
      }
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
                    name={ detail.ingredient }
                    onChange={ pushCheck }
                    // checked={ arrayStorage[0].meals[currentId]
                    //   .includes(detail.ingredient) }
                  />
                  {`${detail.ingredient}: ${detail.measure}`}

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
