const addFavoriteMeal = (mealDetails) => {
  const mealInfo = {
    id: mealDetails[0].idMeal,
    type: 'food',
    nationality: mealDetails[0].strArea,
    category: mealDetails[0].strCategory,
    alcoholicOrNot: '',
    name: mealDetails[0].strMeal,
    image: mealDetails[0].strMealThumb,
  };
  const getFavoriteRecipes = localStorage.getItem('favoriteRecipes');
  if (getFavoriteRecipes === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([mealInfo]));
  } else {
    const parse = JSON.parse(getFavoriteRecipes);
    const prevLocalStorage = [...parse, mealInfo];
    localStorage.setItem('favoriteRecipes', JSON.stringify(prevLocalStorage));
  }
};

export default addFavoriteMeal;
