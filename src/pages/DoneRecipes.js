import React, { useContext, useEffect, useState } from 'react';
import DoneCards from '../components/DoneCards';
import Header from '../components/Header';
import globalContext from '../context/globalContext';
import '../styles/doneRecipes.css';

function RecipesDone() {
  const { setTitle, setShowSearch } = useContext(globalContext);
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [doneRecipes, setDoneRecipes] = useState(recipes);
  const [filters, setFilters] = useState('all');

  useEffect(() => {
    setTitle('Done Recipes');
    setShowSearch(false);
  }, []);

  useEffect(() => {
    if (filters === 'all') {
      setDoneRecipes(recipes);
    } else {
      setDoneRecipes(recipes.filter((done) => done.type === filters));
    }
  }, [filters]);

  const handleClick = ({ target }) => {
    const text = target.innerHTML;
    if (text === 'All') {
      setFilters('all');
    } else if (text === 'Foods') {
      setFilters('food');
    } else if (text === 'Drinks') {
      setFilters('drink');
    }
  };

  if (!recipes || recipes.length === 0) {
    return (
      <div>
        <Header />
        <p>Opa, nenhuma receita finalizada!</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div>
        <div className="btns-filter">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ handleClick }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ handleClick }
          >
            Foods
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ handleClick }
          >
            Drinks
          </button>
        </div>
        <DoneCards doneRecipes={ doneRecipes } />
      </div>
    </div>
  );
}

export default RecipesDone;
