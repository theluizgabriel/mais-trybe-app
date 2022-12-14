import { useState } from 'react';

const useCustomHook = () => {
  const [title, setTitle] = useState('');
  const [showSearch, setShowSearch] = useState(true);
  const [dataFoods, setDataFoods] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [mealID, setMealID] = useState('');
  const [drinkID, setDrinkID] = useState('');
  const [foodsCategories, setFoodsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [currentID, setCurrentID] = useState([]);
  const [mealDetails, setMealDetails] = useState([]);
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [mealIng, setMealIng] = useState([]);
  const [drinkIng, setDrinkIng] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  return { title,
    setTitle,
    showSearch,
    setShowSearch,
    dataFoods,
    setDataFoods,
    dataDrinks,
    setDataDrinks,
    mealID,
    setMealID,
    drinkID,
    setDrinkID,
    foodsCategories,
    setFoodsCategories,
    drinksCategories,
    setDrinksCategories,
    currentID,
    setCurrentID,
    mealDetails,
    setMealDetails,
    drinkDetails,
    setDrinkDetails,
    mealIng,
    setMealIng,
    drinkIng,
    setDrinkIng,
    favoriteRecipes,
    setFavoriteRecipes };
};

export default useCustomHook;
