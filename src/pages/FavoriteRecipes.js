/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import RecipeCard from '../components/RecipeCard';

function FavoriteRecipes() {
  const favoritesRecipes = JSON
    .parse(localStorage.getItem('favoriteRecipes'));
  const [filters, setFilters] = useState('all');
  const [favorites, setFavorites] = useState(favoritesRecipes);

  useEffect(() => {
    if (filters === 'all') {
      setFavorites(favoritesRecipes);
    } else {
      setFavorites(favoritesRecipes.filter((done) => done.type === filters));
    }
  }, [filters]);

  // const testFavoritesFood = [{ id: '52882', type: 'foods', nationality: 'British', category: 'Seafood', alcoholicOrNot: 'Not', name: 'Yes-Drink', image: 'https:\/\/www.themealdb.com\/images\/media\/meals\/spswqs1511558697.jpg' }];
  // const testFavoritesDrink = [{ id: "17256", type: "drinks", nationality: "Brazil", category: "Cocktail", alcoholicOrNot: "Alcoholic", name: "Martinez 2", image: "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/fs6kiq1513708455.jpg" }];

  const reloadFavorites = () => {
    setFavorites(JSON
      .parse(localStorage.getItem('favoriteRecipes')));
  };

  if (!favorites || favorites.length === 0) {
    return (
      <div>
        <Header />
        <p>Opa, nenhuma receita favoritada!</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Filters setFilters={ setFilters } />
      {favorites ? (
        <RecipeCard
          recipes={ favorites }
          isFavoritePage
          handleReload={ reloadFavorites }
        />
      ) : 'Nenhuma receita favoritada'}
    </div>
  );
}

export default FavoriteRecipes;
