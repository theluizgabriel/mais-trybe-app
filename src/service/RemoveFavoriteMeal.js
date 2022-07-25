const removeFavoriteMeal = (mealDetails) => {
  const getlocalStorage = localStorage.getItem('favoriteRecipes');
  const parseLocal = JSON.parse(getlocalStorage);
  console.log(parseLocal);
  const newLocalStorage = parseLocal.filter(
    (item) => item.id !== mealDetails[0].idMeal,
  );
  localStorage.setItem('favoriteRecipes', JSON.stringify(newLocalStorage));
};

export default removeFavoriteMeal;
