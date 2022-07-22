/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import globalContext from '../context/globalContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import getMealApi from '../service/MealApi';

function FoodsInProgress({ currentId }) {
  const history = useHistory();
  const { mealDetails, mealIng,
    setMealIng, setMealDetails } = useContext(globalContext);
  const [checkIng, setCheckIng] = useState([]);
  const [isFinishButtonDisabled, setIsFinishButtonDisabled] = useState(true);

  useEffect(() => {
    const fetchMealDetails = async (id) => {
      const mealApi = await getMealApi('details', id);
      const array = Object.entries(mealApi.meals[0])
        .map((detail) => detail);
      const arrayFilter1 = array
        .filter((a) => a[1] !== '' && ' ' && a[1] !== null);
      const arrayIng = (arrayFilter1.filter((str) => (str[0]
        .includes('strIngredient')))).map((b) => b[1]);
      const arrayMea = (arrayFilter1.filter((str) => (str[0]
        .includes('strMeasure')))).map((b) => b[1]);
      setMealIng(arrayIng.map((a, i) => ({ ingredient: `${a}`,
        measure: `${arrayMea[i]}` })));
      setMealDetails(mealApi.meals);
    };
    fetchMealDetails(currentId);
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
      localStorage.setItem('inProgressRecipes', JSON.stringify(estrutura));
      setCheckIng(estrutura.meals[currentId]);
    } else {
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
          setCheckIng(estruturaExcluir.meals[currentId]);
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
        setCheckIng(estrutura.meals[currentId]);
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
        setCheckIng(estrutura.meals[currentId]);
        localStorage.setItem('inProgressRecipes', JSON
          .stringify(estrutura));
      }
    }
  };

  useEffect(() => {
    if (checkIng.length === mealIng.length) {
      setIsFinishButtonDisabled(false);
    } else {
      setIsFinishButtonDisabled(true);
    }
  },
  [checkIng]);

  useEffect(() => {
    const getItem = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getItem && getItem.meals) {
      const id = Object.keys(getItem.meals).includes(currentId);
      if (id === true) {
        setCheckIng(getItem.meals[currentId]);
      }
    }
  }, []);

  const checkedHandle = (ing) => {
    if (checkIng) {
      return checkIng.some((itemIng) => itemIng === ing);
    }
  };

  const finishButton = () => {
    history.push('/done-recipes');
  };

  return (
    <div>
      { mealDetails && mealDetails.map((item, index) => (
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
            {mealIng.map((detail, i) => (
              <div
                key={ i }
                data-testid={ `${i}-ingredient-step` }
              >
                <li>
                  <input
                    type="checkbox"
                    name={ detail.ingredient }
                    onChange={ pushCheck }
                    checked={ checkedHandle(detail.ingredient) }
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
            disabled={ isFinishButtonDisabled }
            onClick={ finishButton }
          >
            Finish

          </button>
        </div>
      )) }
    </div>
  );
}

FoodsInProgress.propTypes = {
  currentId: PropTypes.string.isRequired,
};

export default FoodsInProgress;
