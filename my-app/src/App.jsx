import './App.css';
import React from 'react';
import './default.css';
import './pages/backet/backet.css';
import SetData from './components/productlist/setdata';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/notfound/notfound';
import Bucket from './pages/backet/backet';
import Header from './components/header/header';
import { Outlet } from 'react-router-dom';
import Addnewcard from './pages/addnewcard/addnewcard';
import ProductPage from './pages/productpage/productpage';
import './pages/addnewcard/addnewcard.css';
import './pages/productpage/productpage.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewAuth, login } from './Slices/castSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { auth } = useSelector((state) => state.cart);
  const { loginIn } = useSelector((state) => state.cart);
  useEffect(() => {
    if (loginIn === true) {
      onLogin('on');
    }
  }, [loginIn, onLogin]);

  const registr = (e) => {
    e.preventDefault();
    onLogin('reg');
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (auth.length != 0) {
      auth.forEach((item, index) => {
        if (username === item[0] && password === item[1]) {
          dispatch(login(index));
          onLogin('ok');
        } else {
          setErrorMessage('Неправильный пароль');
        }
      });
    } else {
      setErrorMessage('Неправильный пароль');
    }
  };

  return (
    <div className="login-page">
      <form className="forms1" onSubmit={handleSubmit}>
        <span className="titlereg">Авторизация</span>
        <input
          className="input1"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input1"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="blocklogin">
          <button type="submit">Войти</button>
          <button onClick={registr}>Пройти регистрацию</button>
        </div>
        {errorMessage && <p className="errors">{errorMessage}</p>}
      </form>
    </div>
  );
}
function Register({ onLogin }) {
  const { auth } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Message, setMessage] = useState(' ');
  const clear = () => {
    localStorage.clear();
  };
  const login = (e) => {
    e.preventDefault();
    onLogin('log');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length >= 4 && password.length) {
      if (auth.length !== 0) {
        for (let i = 0; i < auth.length; i++) {
          if (auth[i][0] === username) {
            console.log(auth[i][0]);
            setMessage('false');
            break;
          } else {
            setMessage('true');

            dispatch(addNewAuth([username, password]));
          }
        }
      } else {
        setMessage('true');
        dispatch(addNewAuth([username, password]));
      }
    } else {
      setMessage('error');
    }
  };

  return (
    <div className="login-page">
      <form className="forms1" onSubmit={handleSubmit}>
        <span className="titlereg">Регистрация</span>
        <input
          className="input1"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input1"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="blocklogin">
          <button onClick={handleSubmit}>Зарегистрироваться</button>
          <button onClick={login}>Войти в систему</button>
          <button onClick={clear}>Очистить localstorage</button>
        </div>
        {console.log(Message)}
        {Message == 'false' ? (
          <span className="registrfalse">Уже есть такой пользователь</span>
        ) : Message == 'true' ? (
          <span className="registrtrue">Регистрация прошла успешно</span>
        ) : null}
      </form>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState('log');
  // const [login, setLogin] = useState('');
  return (
    <>
      {isAuthenticated === 'reg' ? (
        <Register onLogin={setIsAuthenticated} />
      ) : isAuthenticated === 'log' ? (
        <Login onLogin={setIsAuthenticated} />
      ) : isAuthenticated === 'ok' || isAuthenticated === 'on' ? (
        <>
          <Header onLogout={() => setIsAuthenticated('log')} />
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={<SetData />} />
              <Route path="bucket" element={<Bucket />} />
              <Route path="SetData" element={<SetData />} />
              <Route path="addnewcard" element={<Addnewcard />} />
              <Route path="product/:id" element={<ProductPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </>
      ) : (
        <Login onLogin={setIsAuthenticated} />
      )}
    </>
  );
}

export default App;
