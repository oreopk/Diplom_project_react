import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../Slices/castSlice';
import { buy } from '../../Slices/castSlice';
import { useState } from 'react';
function Bucket() {
  const [Message, setMessage] = useState(' ');
  const { login, auth } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleRemoveToCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const zakaz = () => {
    if (auth[login][4].length != 0) {
      setMessage('true');
      dispatch(buy(login));
    } else {
      setMessage('false');
    }
  };

  return (
    <div className="bucket">
      <span className="countbucket">Количество товаров {auth[login][2]}</span>
      <br />

      <span className="summ">Сумма: {auth[login][3]}</span>
      <br />
      <br />
      <button className="btn_bucket" onClick={() => zakaz()}>
        Оформить заказ
      </button>
      {Message == 'true' ? (
        <span className="zakaz">Оформлен</span>
      ) : Message == 'false' ? (
        <span className="zakaz2">Пустая корзина</span>
      ) : null}
      <h2 className="buckettitle">Корзина</h2>
      <ul className="ulbucket">
        {auth[login][4].map((item) => (
          <li
            className="product-card-bucket"
            key={item.id + Math.round(Math.random() * Date.now())}
          >
            <div className="container_img">
              <img className="img-card" src={item.image} alt={item.name} />
            </div>
            <h3 className="nameproduct">{item.name}</h3>
            <p className="priceProduct">${item.price}</p>
            <button
              className="btn_bucket"
              onClick={() => handleRemoveToCart(item)}
            >
              Удалить из корзины
            </button>
          </li>
        ))}
      </ul>

      {/* Кнопка "Оформить заказ" или другие действия */}
    </div>
  );
}

export default Bucket;
