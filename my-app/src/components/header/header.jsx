import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './header.css';
import { useDispatch } from 'react-redux';
import { exit } from '../../Slices/castSlice';
const Header = ({ onLogout }) => {
  const counterProd = useSelector((state) => state.counterProd);
  const { auth, login } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log('loginheader ' + login);
  const handleLogout = () => {
    dispatch(exit());
    onLogout(false); // Setze den Authentifizierungsstatus auf false
    navigate('/'); // Navigiere zur Login-Seite
  };

  return (
    <div className="header">
      <nav>
        <span>{counterProd}</span>
        <NavLink to={'/SetData'}>Главная</NavLink>
        <NavLink to={'/bucket'}>Корзина</NavLink>
        <NavLink to={'/addnewcard'}>Добавить новые товары</NavLink>
        <NavLink to={'/nothing'}>Nothing</NavLink>
      </nav>
      <span className="count">
        Количество товара в корзине: {auth[login][2]}
      </span>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default Header;
