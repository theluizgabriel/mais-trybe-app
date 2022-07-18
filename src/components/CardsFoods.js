import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import globalContext from '../context/globalContext';

const DOZE = 12;

function CardsFoods() {
  const history = useHistory();
  const { dataFoods } = useContext(globalContext);
  return (
    <div>
      { dataFoods && dataFoods.map((food, index) => (
        index < DOZE && (
          <div
            role="button"
            tabIndex={ 0 } // Lint issue
            key={ food.idFood }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => { history.push(`/foods/${food.idMeal}`); } }
            onKeyPress={ () => { history.push(`/foods/${food.idMeal}`); } } // Lint issue
          >
            <img
              width="150px"
              data-testid={ `${index}-card-img` }
              src={ food.strMealThumb }
              alt={ `food-${index}` }
            />
            <h2
              data-testid={ `${index}-card-name` }
            >
              {food.strMeal}

            </h2>
          </div>
        )
      )) }
    </div>);
}

export default CardsFoods;
