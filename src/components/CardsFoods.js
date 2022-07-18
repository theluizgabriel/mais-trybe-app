import React, { useContext } from 'react';
import globalContext from '../context/globalContext';

const DOZE = 12;

function CardsFoods() {
  const { dataFoods } = useContext(globalContext);
  return (
    <div>
      {dataFoods && dataFoods.map((food, index) => (
        index < DOZE
          ? (
            <div
              key={ food.idFood }
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
            </div>)
          : <> </>
      ))}
    </div>);
}

export default CardsFoods;
