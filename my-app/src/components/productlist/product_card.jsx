import { addToCart } from '../../Slices/castSlice';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

export default function Productcard({ dataObj }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = () => {
    dispatch(addToCart(dataObj));
  };
  const openCard = () => {
    navigate(`/product/${dataObj.id}`); // Перенаправляем на страницу товара с уникальным идентификатором
  };

  return (
    <div className="product-card">
      <div className="container_img">
        <img className="img-card" src={dataObj.image} alt={dataObj.name} />
      </div>
      <h3 className="prodtext">{dataObj.title}</h3>
      <p className="prodtext">${dataObj.price}</p>
      <button className="btncard" onClick={openCard}>
        Подробнее
      </button>
      <button className="btncard" onClick={handleAddToCart}>
        Добавить в корзину
      </button>
    </div>
  );
}
