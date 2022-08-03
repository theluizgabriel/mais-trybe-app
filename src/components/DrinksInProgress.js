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
  const [isFinishButtonDisabled, setIsFinishButtonDisabled] = useState(true);
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
    if (checkIng.length === drinkIng.length) {
      setIsFinishButtonDisabled(false);
    } else {
      setIsFinishButtonDisabled(true);
    }
  },
  [checkIng]);

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

  const finishButton = () => {
    history.push('/done-recipes');
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
    <div className="text-center">
      { drinkDetails && drinkDetails.map((item, index) => (
        <div
          key={ index }
          className="flex flex-wrap justify-center items-center min-h-max
        mt-24"
        >
          <div className="flex flex-col w-11/12 bg-[#E32929] items-center justify-center">
            <img
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
              data-testid="recipe-photo"
              className="w-100 h-48 object-cover"
            />
            <div
              className="flex flex-col ml-4 mt-2 items-center justify-center"
            >
              <h3
                data-testid="recipe-title"
                className="mb-3 text-white"
              >
                {item.strDrink}

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
                  onClick={ copyToClipboard }
                  data-testid="share-btn"
                >
                  <img
                    src={ shareIcon }
                    alt="Share"
                    className="ml-1 w-7"
                  />
                </button>
                {isCopied && <MessageLinkCopied />}
              </div>
              <p
                data-testid="recipe-category"
                className="mb-3 text-white"
              >
                {item.strCategory}

              </p>
            </div>
          </div>
          <div className="mt-14 bg-[#FF611D] p-6 text-center mb-14 rounded-lg text-white">
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
          </div>
          <p
            data-testid="instructions"
            className="w-60 text-center ml-4 mb-14 mt-10"
          >
            {item.strInstructions}

          </p>
        </div>
      )) }
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isFinishButtonDisabled }
        onClick={ finishButton }
        className="bottom-0 bg-[#FF611D] pr-12 pl-12 pt-2 pb-2 text-white
            rounded disabled:bg-current disabled:text-slate-800"
      >
        Finish

      </button>
    </div>
  );
}

DrinksInProgress.propTypes = {
  currentId: PropTypes.string.isRequired,
};

export default DrinksInProgress;
