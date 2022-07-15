import { useState } from 'react';

const useCustomHook = () => {
  const [title, setTitle] = useState('oi');
  const [showSearch, setShowSearch] = useState(true);
  const [dataFoods, setDataFoods] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  return { title,
    setTitle,
    showSearch,
    setShowSearch,
    dataFoods,
    setDataFoods,
    dataDrinks,
    setDataDrinks };
};

export default useCustomHook;
