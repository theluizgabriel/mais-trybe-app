import React, { useContext, useState } from 'react';
import globalContext from '../context/globalContext';
import getDrinkApi from '../service/DrinkApi';

const CINCO = 5;

function DrinksCategories() {
  const { drinksCategories, setDataDrinks } = useContext(globalContext);
  const [currentCat, setCurrentCat] = useState('');

  const handleCategory = async ({ target }) => {
    if (currentCat === target.value) {
      const filterCategory = await getDrinkApi('name', '');
      setDataDrinks(filterCategory.drinks);
      setCurrentCat('');
    } else {
      const filterCategory = await getDrinkApi('category', target.value);
      setDataDrinks(filterCategory.drinks);
      setCurrentCat(target.value);
    }
  };

  const handleAllFilter = async () => {
    const allData = await getDrinkApi('name', '');
    setDataDrinks(allData.drinks);
  };

  return (
    <div>
      { drinksCategories && drinksCategories.map((category, index) => (
        index < CINCO && (
          <button
            value={ category.strCategory }
            key={ index }
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ handleCategory }
          >
            { category.strCategory }
          </button>
        )
      )) }
      <button
        onClick={ handleAllFilter }
        type="button"
        data-testid="All-category-filter"
      >
        All
      </button>
    </div>
  );
}

export default DrinksCategories;
