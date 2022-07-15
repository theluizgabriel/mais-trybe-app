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
    console.log('Verifica se o Email está válido: ', validEmail);
    const validPassword = password.length >= minPasswordLength;
    console.log('Verifica se a senha está válida: ', validPassword);
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
    const user = `email: ${email}`;
    localStorage.setItem('user', user);
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
        value={ email }
        onChange={ handleChange }
      />
      <input
        name="password"
        type="password"
        data-testid="password-input"
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
