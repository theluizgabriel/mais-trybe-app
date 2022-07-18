import React, { useContext, useEffect } from 'react';
import globalContext from '../context/globalContext';
import CardsFoods from './CardsFoods';
import CardsDrinks from './CardsDrinks';
import FoodsCategories from './FoodsCategories';
import DrinksCategories from './DrinksCategories';
import getMealApi from '../service/MealApi';
import getDrinkApi from '../service/DrinkApi';

function Recipes() {
  const { title, setDataFoods, setDataDrinks } = useContext(globalContext);
  useEffect(() => {
    async function fetchInit() {
      if (title === 'Foods') {
        const data = await getMealApi('name', '');
        setDataFoods(data.meals);
      }
      if (title === 'Drinks') {
        const data = await getDrinkApi('name', '');
        setDataDrinks(data.drinks);
      }
    }
    fetchInit();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {
        title === 'Foods'
        && (
          <>
            <FoodsCategories />
            <CardsFoods />
          </>)
      }
      {
        title === 'Drinks'
        && (
          <>
            <DrinksCategories />
            <CardsDrinks />
          </>)
      }
    </div>
  );
}

export default Recipes;
