import React, { useEffect, useContext } from 'react';
import globalContext from '../context/globalContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import getDrinksCategories from '../service/DrinkCategoriesApi';

function Drinks() {
  const { title,
    setTitle,
    setShowSearch,
    setDrinksCategories } = useContext(globalContext);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getDrinksCategories();
      setDrinksCategories(data.drinks);
    }
    fetchCategories();
    setTitle('Drinks');
    setShowSearch(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      { title === 'Drinks' && <Recipes /> }
      <Footer />
    </>
  );
}

export default Drinks;
