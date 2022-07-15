import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import getMealApi from '../service/MealApi';
import getDrinkApi from '../service/DrinkApi';
import globalContext from '../context/globalContext';

function SearchBar() {
  const { title, setDataFoods, setDataDrinks } = useContext(globalContext);
  const history = useHistory();
  const [valueSearch, setValueSearch] = useState({
    search: '',
    radio: 'ingredient',
  });

  const handleChange = ({ target: { name, value } }) => {
    setValueSearch({
      ...valueSearch,
      [name]: value });
  };

  const handleButton = async () => {
    if (valueSearch.radio === 'first-letter' && valueSearch.search.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    if (title === 'Foods') {
      const data = await getMealApi(valueSearch.radio, valueSearch.search);
      console.log(data);
      if (data.meals === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        return setDataFoods([]);
      }
      if (data.meals.length === 1) {
        history.push(`/foods/${data.meals[0].idMeal}`);
      } setDataFoods(data.meals);
    } else if (title === 'Drinks') {
      const data = await getDrinkApi(valueSearch.radio, valueSearch.search);
      if (!data || data.drinks === undefined || data.drinks === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        return setDataFoods([]);
      }
      if (data.drinks.length === 1) {
        history.push(`/drinks/${data.drinks[0].idDrink}`);
      }
      setDataDrinks(data.drinks);
    }
  };

  return (
    <>
      <input
        type="text"
        name="search"
        id="search-input"
        data-testid="search-input"
        value={ valueSearch.search }
        onChange={ handleChange }
      />
      <label htmlFor="ingredient-search-radio">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredient-search-radio"
          name="radio"
          value="ingredient"
          onChange={ handleChange }
          defaultChecked
        />
        Ingredient
      </label>
      <label htmlFor="name-search-radio">
        <input
          data-testid="name-search-radio"
          type="radio"
          id="name-search-radio"
          name="radio"
          value="name"
          onChange={ handleChange }
        />
        Name
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="first-letter-search-radio"
          name="radio"
          value="first-letter"
          onChange={ handleChange }
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleButton }
      >
        Search

      </button>

    </>
  );
}

export default SearchBar;
