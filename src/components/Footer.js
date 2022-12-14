import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../App.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Icone de Bebidas"
        />
      </Link>
      <Link to="/foods">
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="Icone de Comidas"
        />
      </Link>
    </footer>
  );
}

export default Footer;
