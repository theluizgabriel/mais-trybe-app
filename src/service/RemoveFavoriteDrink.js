const removeFavoriteDrink = (drinkDetails) => {
  const getlocalStorage = localStorage.getItem('favoriteRecipes');
  const parseLocal = JSON.parse(getlocalStorage);
  const newLocalStorage = parseLocal.filter(
    (item) => item.id !== drinkDetails[0].idDrink,
  );
  localStorage.setItem('favoriteRecipes', JSON.stringify(newLocalStorage));
};

export default removeFavoriteDrink;
