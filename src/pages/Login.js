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
    if (password.length > minPasswordLength
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
    <div
      className="flex flex-wrap w-full min-h-screen justify-center items-center
    p-4 bg-[#e32929]"
    >
      <main
        className="flex w-96 bg-white rounded-t-xl overflow-hidden pt-12
      pr-14 pb-8 pl-14 justify-center items-center bg-[#ead6cf]"
      >
        <div className="flex flex-col">
          <div className="text-center">
            <img
              className="mx-auto w-48"
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
              alt="logo"
            />
            <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">Mais Trybê</h4>
          </div>
          <div className="flex flex-wrap justify-center items-center pt-2">
            <input
              type="email"
              data-testid="email-input"
              name="email"
              value={ email }
              className="text-sm w-full block h-11 bg-transparent border
              border-yellow-400 mb-2"
              placeholder="exemplo@exemplo.com"
              onChange={ handleChange }
            />
            <input
              type="password"
              data-testid="password-input"
              name="password"
              value={ password }
              className="text-sm w-full block h-11 bg-transparent border
              border-yellow-400"
              placeholder="Digite sua senha"
              onChange={ handleChange }
            />
          </div>
          <div className="flex flex-wrap justify-center items-center pt-12">
            <button
              type="submit"
              data-testid="login-submit-btn"
              className="cursor-pointer bg-[#E32929]
              border-0 rounded font-semibold mt-6 mr-2.5 w-52
          pt-2.5 pb-2.5 pr-0 mb-10 rounded-xl disabled:text-slate-300
          disabled:bg-inherit"
              disabled={ !enabled }
              onClick={ handleButtonClick }
            >
              Entrar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
