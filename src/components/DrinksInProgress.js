/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import globalContext from '../context/globalContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import getDrinkApi from '../service/DrinkApi';
import MessageLinkCopied from './MessageLinkCopied';
import addFavoriteDrink from '../service/AddFavoriteDrink';
import removeFavoriteDrink from '../service/RemoveFavoriteDrink';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DrinksInProgress({ currentId }) {
  const history = useHistory();
  const { drinkDetails, drinkIng,
    setDrinkIng, setDrinkDetails } = useContext(globalContext);
  const [checkIng, setCheckIng] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDrinkDetails = async (id) => {
      const drinkApi = await getDrinkApi('details', id);
      const array = Object.entries(drinkApi.drinks[0])
        .map((detail) => detail);
      const arrayFilter1 = array
        .filter((a) => a[1] !== '' && ' ' && a[1] !== null);
      const arrayIng = (arrayFilter1.filter((str) => (str[0]
        .includes('strIngredient')))).map((b) => b[1]);
      const arrayDri = (arrayFilter1.filter((str) => (str[0]
        .includes('strMeasure')))).map((b) => b[1]);
      setDrinkIng(arrayIng.map((a, i) => ({ ingredient: `${a}`,
        measure: `${arrayDri[i]}` })));
      setDrinkDetails(drinkApi.drinks);
    };
    fetchDrinkDetails(currentId);
  }, []);

  const pushCheck = ({ target: { name } }) => {
    const getItem = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getItem === null || getItem.cocktails === undefined) {
      const estrutura = {
        ...getItem,
        cocktails: {
          [currentId]: [name],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(estrutura));
      setCheckIng(estrutura.cocktails[currentId]);
    } else {
      const idsOnStorage = Object.keys(getItem.cocktails)
        .some((key) => key === currentId);
      if (idsOnStorage) {
        const someIng = getItem.cocktails[currentId].some((ing) => ing === name);
        if (someIng) {
          const excluirIng = getItem.cocktails[currentId].filter((ing) => ing !== name);
          const estruturaExcluir = {
            ...getItem,
            cocktails: {
              ...getItem.cocktails,
              [currentId]: [...excluirIng],
            },
          };
          setCheckIng(estruturaExcluir.cocktails[currentId]);
          return localStorage.setItem('inProgressRecipes', JSON
            .stringify(estruturaExcluir));
        }
        const estrutura = {
          ...getItem,
          cocktails: {
            ...getItem.cocktails,
            [currentId]: [...getItem.cocktails[currentId], name],
          },
        };
        setCheckIng(estrutura.cocktails[currentId]);
        localStorage.setItem('inProgressRecipes', JSON
          .stringify(estrutura));
      } else {
        const estrutura = {
          ...getItem,
          cocktails: {
            ...getItem.cocktails,
            [currentId]: [name],
          },
        };
        setCheckIng(estrutura.cocktails[currentId]);
        localStorage.setItem('inProgressRecipes', JSON
          .stringify(estrutura));
      }
    }
  };

  useEffect(() => {
    const getItem = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getItem && getItem.cocktails) {
      const id = Object.keys(getItem.cocktails).includes(currentId);
      if (id === true) {
        setCheckIng(getItem.cocktails[currentId]);
      }
    }
  }, []);

  const checkedHandle = (ing) => {
    if (checkIng) {
      return checkIng.some((itemIng) => itemIng === ing);
    }
  };

  const copyToClipboard = () => {
    const url = history.location.pathname.replace('/in-progress', '');
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
        setIsFavorite(parseLocal.some((item) => (item.id === currentId)));
      }
    };
    func();
  }, []);

  const removeFav = () => {
    removeFavoriteDrink(drinkDetails);
    setIsFavorite(false);
  };

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
          <button
            type="button"
            onClick={ copyToClipboard }
            data-testid="share-btn"
          >
            <img
              src={ shareIcon }
              alt="Share"
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
          {isCopied && <MessageLinkCopied />}
          <p data-testid="recipe-category">{item.strCategory}</p>
          <ul>
            {drinkIng.map((detail, i) => (
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
                    className="ingredients"
                  />
                  <label htmlFor={ detail.ingredient }>
                    {`${detail.ingredient}: ${detail.measure}`}
                  </label>
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
    </div>
  );
}

DrinksInProgress.propTypes = {
  currentId: PropTypes.string.isRequired,
};

export default DrinksInProgress;
