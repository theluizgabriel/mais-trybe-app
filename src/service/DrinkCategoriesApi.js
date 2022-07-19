async function getDrinksCategories() {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const drinkCategories = await response.json();
    return drinkCategories;
  } catch (error) {
    console.log(error);
  }
}

export default getDrinksCategories;
