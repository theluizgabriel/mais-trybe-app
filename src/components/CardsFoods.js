import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import globalContext from '../context/globalContext';

const DOZE = 12;

function CardsFoods() {
  const { dataFoods, setMealID } = useContext(globalContext);

  const history = useHistory();

  const handleClick = (id) => {
    setMealID(id);
    history.push('/recipe-details');
  };

  return (
    <div>
      {dataFoods && dataFoods.map((food, index) => (
        index < DOZE
          ? (
            <div
              key={ food.idMeal }
              name={ food.idMeal }
              data-testid={ `${index}-recipe-card` }
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
              <button
                type="button"
                onClick={ () => handleClick(food.idMeal) }
              >
                Detalhes
              </button>
            </div>
          )
          : <> </>
      ))}
    </div>);
}

export default CardsFoods;
