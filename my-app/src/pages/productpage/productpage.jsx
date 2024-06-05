import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProductPage = () => {
  const { id } = useParams(); // Получаем id товара из URL

  const { cards } = useSelector((state) => state.cart);
  // Здесь вы можете использовать id для получения данных о товаре из вашего источника данных (например, базы данных или API)

  function getProductById(id) {
    id = id - 1;
    return cards[id];
  }
  // Предположим, что у вас есть функция getProductById, которая возвращает данные о товаре по его id
  const product = getProductById(id);

  if (!product) {
    return <div className="product-none">Товар не найден</div>;
  }
  return (
    <div className="product-page-one">
      <img className="product-img-one" src={product.image} alt={product.name} />
      <h2 className="product-h2-one">{product.name}</h2>
      <p className="product-desc-one">{product.description}</p>
      <p className="product-price-one">${product.price}</p>
      {/* Другие детали о товаре */}
    </div>
  );
};

export default ProductPage;
