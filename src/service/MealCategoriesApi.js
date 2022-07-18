async function getMealsCategories() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const mealCategories = await response.json();
    return mealCategories;
  } catch (error) {
    console.log(error);
  }
}

export default getMealsCategories;
