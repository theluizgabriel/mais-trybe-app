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
  const [recipeDetails, setRecipeDetails] = useState([]);
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
    recipeDetails,
    setRecipeDetails,
    favoriteRecipes,
    setFavoriteRecipes };
};

export default useCustomHook;
