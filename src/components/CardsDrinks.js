import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import globalContext from '../context/globalContext';

const DOZE = 12;

function CardsDrinks() {
  const history = useHistory();
  const { dataDrinks } = useContext(globalContext);
  return (
    <div>
      {dataDrinks && dataDrinks.map((drink, index) => (
        index < DOZE && (
          <div
            role="button"
            tabIndex={ 0 } // Lint issue
            key={ drink.idDrink }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => { history.push(`/drinks/${drink.idDrink}`); } }
            onKeyPress={ () => { history.push(`/drinks/${drink.idDrink}`); } } // Lint issue
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
      ))}
    </div>);
}

export default CardsDrinks;
