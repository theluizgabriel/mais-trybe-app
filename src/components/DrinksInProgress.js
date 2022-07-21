import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import globalContext from '../context/globalContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import getDrinkApi from '../service/DrinkApi';

function DrinksInProgress({ currentId }) {
  const { recipeDetails, detailsArray,
    setDetailsArray, setRecipeDetails } = useContext(globalContext);
  const [arrayStorage, setArrayStorage] = useState('');

  useEffect(() => {
    const drinkDetails = async (id) => {
      const drinkApi = await getDrinkApi('details', id);
      const array = Object.entries(drinkApi.drinks[0])
        .map((detail) => detail);
      const arrayFilter1 = array
        .filter((a) => a[1] !== '' && ' ' && a[1] !== null);
      const arrayIng = (arrayFilter1.filter((str) => (str[0]
        .includes('strIngredient')))).map((b) => b[1]);
      const arrayDri = (arrayFilter1.filter((str) => (str[0]
        .includes('strMeasure')))).map((b) => b[1]);
      setDetailsArray(arrayIng.map((a, i) => ({ ingredient: `${a}`,
        measure: `${arrayDri[i]}` })));
      setRecipeDetails(drinkApi.drinks);
    };
    drinkDetails(currentId);
    setArrayStorage([JSON.parse(localStorage.getItem('inProgressRecipes'))]);
  }, []);

  const pushCheck = ({ target: { name } }) => {
    const getItem = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getItem === null) {
      const estrutura = {
        cocktails: {
          [currentId]: [name],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(estrutura));
      setArrayStorage([estrutura]);
    } else {
      const idsOnStorage = Object.keys(getItem.cocktails)
        .some((key) => key === currentId);
      if (idsOnStorage) {
        const someIng = getItem.cocktails[currentId].some((ing) => ing === name);
        if (someIng) {
          const excluirIng = getItem.cocktails[currentId].filter((ing) => ing !== name);
          const estruturaExcluir = {
            cocktails: {
              ...getItem.cocktails,
              [currentId]: [...excluirIng],
            },
          };
          setArrayStorage([estruturaExcluir]);
          return localStorage.setItem('inProgressRecipes', JSON
            .stringify(estruturaExcluir));
        }
        const estrutura = {
          cocktails: {
            ...getItem.cocktails,
            [currentId]: [...getItem.cocktails[currentId], name],
          },
        };
        setArrayStorage([estrutura]);
        localStorage.setItem('inProgressRecipes', JSON
          .stringify(estrutura));
      } else {
        const estrutura = {
          cocktails: {
            ...getItem.cocktails,
            [currentId]: [name],
          },
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
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-title">{item.strDrink}</h3>
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
                    checked={ arrayStorage[0].cocktails[currentId]
                      .includes(detail.ingredient) }
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

DrinksInProgress.propTypes = {
  currentId: PropTypes.string.isRequired,
};

export default DrinksInProgress;
