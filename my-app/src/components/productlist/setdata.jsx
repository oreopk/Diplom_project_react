import '../productlist/product.css';
import ProductsList from './product_list';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../../Slices/castSlice';
import { useSelector } from 'react-redux';

export default function SetData() {
  const [products, setProducts] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const { newcards } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      fetch('https://fakestoreapi.com/products/')
        .then((response) => {
          // Проверяем, успешен ли ответ
          if (!response.ok) {
            throw new Error('Ошибка при получении данных');
          }
          // Преобразуем ответ в JSON
          return response.json();
        })
        .then((data) => {
          // Преобразуем данные в массив, если нужно
          const dataArray = Array.isArray(data) ? data : [data];

          // Используем полученные данные (массив dataArray)
          const _ = require('lodash');
          const newArray = _.cloneDeep(dataArray);
          const filteredCards = newcards.filter((card) => card.status === true);
          newArray.splice(newArray.length, 0, ...filteredCards);
          setProducts(newArray);
          handleAddCard2(newArray);
          console.error('Загрузка');
        })
        .catch((error) => {
          // Обработка ошибок
          console.error('Ошибка:', error);
        });
    };

    fetchProducts();
  }, []);

  const handleAddCard2 = (product) => {
    dispatch(addCart(product)); // Передаем объект с полями title и price
  };

  const handleLoadProducts = (count) => {
    setProductsPerPage(count);
  };

  return (
    <div className="app">
      <div className="load-buttons">
        <button className="btn" onClick={() => handleLoadProducts(8)}>
          8 продуктов
        </button>
        <button className="btn" onClick={() => handleLoadProducts(16)}>
          16 продуктов
        </button>
        <button className="btn" onClick={() => handleLoadProducts(20)}>
          Все товары
        </button>
      </div>
      <ProductsList products={products} productsPerPage={productsPerPage} />
    </div>
  );
}
