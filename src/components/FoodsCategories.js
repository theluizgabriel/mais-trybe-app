import React, { useContext, useState } from 'react';
import globalContext from '../context/globalContext';
import getMealApi from '../service/MealApi';

const CINCO = 5;

function FoodsCategories() {
  const { foodsCategories, setDataFoods } = useContext(globalContext);
  const [currentCat, setCurrentCat] = useState('');

  const handleCategory = async ({ target }) => {
    if (currentCat === target.value) {
      const filterCategory = await getMealApi('name', '');
      setDataFoods(filterCategory.meals);
      setCurrentCat('');
    } else {
      const filterCategory = await getMealApi('category', target.value);
      setDataFoods(filterCategory.meals);
      setCurrentCat(target.value);
    }
  };

  const handleAllFilter = async () => {
    const allData = await getMealApi('name', '');
    setDataFoods(allData.meals);
  };

  return (
    <div className="category-area">
      <button
        type="button"
        data-testid="All-category-filter"
        className="categories"
        onClick={ handleAllFilter }
      >
        All
      </button>
      { foodsCategories && foodsCategories.map((category, index) => (
        index < CINCO && (
          <button
            value={ category.strCategory }
            type="button"
            className="categories"
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ handleCategory }
          >
            { category.strCategory }
          </button>
        )
      )) }
    </div>
  );
}

export default FoodsCategories;
