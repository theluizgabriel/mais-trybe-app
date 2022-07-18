import { useState } from 'react';

const useCustomHook = () => {
  const [title, setTitle] = useState('oi');
  const [showSearch, setShowSearch] = useState(true);
  const [dataFoods, setDataFoods] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [foodsCategories, setFoodsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  return { title,
    setTitle,
    showSearch,
    setShowSearch,
    dataFoods,
    setDataFoods,
    dataDrinks,
    setDataDrinks,
    foodsCategories,
    setFoodsCategories,
    drinksCategories,
    setDrinksCategories };
};

export default useCustomHook;
