import React, { useEffect, useContext } from 'react';
import globalContext from '../context/globalContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import getMealsCategories from '../service/MealCategoriesApi';

function Foods() {
  const { title,
    setTitle,
    setShowSearch,
    setFoodsCategories } = useContext(globalContext);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getMealsCategories();
      setFoodsCategories(data.meals);
    }
    fetchCategories();
    setTitle('Foods');
    setShowSearch(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      { title === 'Foods' && <Recipes /> }
      <Footer />
    </>
  );
}

export default Foods;
