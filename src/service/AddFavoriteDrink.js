const addFavoriteDrink = (drinkDetails) => {
  const drinkInfo = {
    id: drinkDetails[0].idDrink,
    type: 'drink',
    nationality: '',
    category: drinkDetails[0].strCategory,
    alcoholicOrNot: drinkDetails[0].strAlcoholic,
    name: drinkDetails[0].strDrink,
    image: drinkDetails[0].strDrinkThumb,
  };
  const getFavoriteRecipes = localStorage.getItem('favoriteRecipes');
  if (getFavoriteRecipes === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([drinkInfo]));
  } else {
    const parse = JSON.parse(getFavoriteRecipes);
    const prevLocalStorage = [...parse, drinkInfo];
    localStorage.setItem('favoriteRecipes', JSON.stringify(prevLocalStorage));
  }
};

export default addFavoriteDrink;
