/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import globalContext from '../context/globalContext';

function Login() {
  const { setTitle } = useContext(globalContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enabled, setEnabled] = useState(false);

  const history = useHistory();

  useEffect(() => { setTitle('Login'); });

  const handleChange = ({ target }) => {
    if (target.name === 'email') {
      setEmail(target.value);
    } if (target.name === 'password') {
      setPassword(target.value);
    }
  };

  useEffect(() => {
    const minPasswordLength = 6;
    const regex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    if (password.length >= minPasswordLength
    && regex.test(email)) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [handleChange, email, password]);

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
    <div className="login-page">
      <input
        type="email"
        data-testid="email-input"
        name="email"
        value={ email }
        className="user-input"
        placeholder="exemplo@exemplo.com"
        onChange={ handleChange }
      />
      <input
        type="password"
        data-testid="password-input"
        name="password"
        value={ password }
        className="password-input"
        placeholder="Digite sua senha"
        onChange={ handleChange }
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
        className="login-btn"
        disabled={ !enabled }
        onClick={ handleButtonClick }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
