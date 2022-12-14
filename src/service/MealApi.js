async function getMealApi(type, text) {
  try {
    if (type === 'ingredient') {
      const responseIngredient = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`);
      const dataIngredient = await responseIngredient.json();
      return dataIngredient;
    } if (type === 'name') {
      const responseName = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`);
      const dataName = await responseName.json();
      return dataName;
    } if (type === 'first-letter') {
      const responseFL = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${text}`);
      const dataFL = await responseFL.json();
      return dataFL;
    } if (type === 'details') {
      const responseFL = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${text}`);
      const dataDetail = await responseFL.json();
      return dataDetail;
    } if (type === 'category') {
      const responseCat = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${text}`);
      const dataCat = await responseCat.json();
      return dataCat;
    }
  } catch (error) {
    console.log(error);
  }
}

export default getMealApi;
