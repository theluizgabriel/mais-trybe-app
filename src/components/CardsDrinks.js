import React, { useContext } from 'react';
import globalContext from '../context/globalContext';

const DOZE = 12;

function CardsDrinks() {
  const { dataDrinks } = useContext(globalContext);
  return (
    <div>
      {dataDrinks && dataDrinks.map((drink, index) => (
        index < DOZE
          ? (
            <div
              key={ drink.idDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                width="150px"
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ `drink-${index}` }
              />
              <h2
                data-testid={ `${index}-card-name` }
              >
                {drink.strDrink}

              </h2>
            </div>)
          : <> </>
      ))}
    </div>);
}

export default CardsDrinks;
