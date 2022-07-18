import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import globalContext from '../context/globalContext';

function Login() {
  const { setTitle } = useContext(globalContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const history = useHistory();

  useEffect(() => { setTitle('Login'); });

  const buttonValidation = () => {
    const minPasswordLength = 6;
    const emailRegex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    const validEmail = emailRegex.test(email);
    const validPassword = password.length >= minPasswordLength;
    if (validEmail && validPassword) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleChange = ({ target }) => {
    if (target.name === 'email') {
      setEmail(target.value);
      buttonValidation();
    } else if (target.name === 'password') {
      setPassword(target.value);
      buttonValidation();
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    const user = {
      email,
    };
    const stringifyUser = JSON.stringify(user);
    localStorage.setItem('user', stringifyUser);
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/foods');
  };

  return (
    <div>
      <input
        name="email"
        type="email"
        data-testid="email-input"
        placeholder="exemplo@exemplo.com"
        value={ email }
        onChange={ handleChange }
      />
      <input
        name="password"
        type="password"
        data-testid="password-input"
        placeholder="Digite sua senha"
        value={ password }
        onChange={ handleChange }
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ disabled }
        onClick={ handleButtonClick }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
