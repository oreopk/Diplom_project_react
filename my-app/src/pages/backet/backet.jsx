import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../Slices/castSlice';

function Bucket() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleRemoveToCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const { total, totalItems } = useSelector((state) => state.cart);
  return (
    <div className="bucket">
      <span className="countbucket">Количество товаров {totalItems}</span>
      <br />
      <span className="summ">Сумма: {Math.round(total, 3)}</span>
      <h2 className="buckettitle">Корзина</h2>
      <ul className="ulbucket">
        {cart.map((item) => (
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
