import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './header.css';
const Header = () => {
  const counterProd = useSelector((state) => state.counterProd);
  const { totalItems } = useSelector((state) => state.cart);
  return (
    <div className="header">
      <nav>
        <span>{counterProd}</span>
        <NavLink to={'/SetData'}>Главная</NavLink>
        <NavLink to={'/bucket'}>Корзина</NavLink>
        <NavLink to={'/addnew'}>Добавить новые товары </NavLink>
        <NavLink to={'/nothing'}>Nothing</NavLink>
      </nav>
      <span className="count">Количество товара в корзине: {totalItems}</span>
    </div>
  );
};

export default Header;
