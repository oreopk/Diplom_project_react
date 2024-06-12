import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Productcard from '../../components/productlist/product_card';
export default function ProductsList({ products, productsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { cards } = useSelector((state) => state.cart);

  console.log(cards[20]);
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex); // Используем newArray

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="products-list">
      <h2>Список товаров</h2>
      <div className="product-grid">
        {currentProducts.map(
          (
            product // Используем product вместо newArray
          ) => (
            <Productcard key={product.id} dataObj={product} />
          )
        )}
      </div>
      {/* Пагинация */}
      <div className="pagination">
        {currentPage > 1 && (
          <button
            className="pagbtn"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Предыдущая
          </button>
        )}
        {currentPage < Math.ceil(products.length / productsPerPage) && (
          <button
            className="pagbtn"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Следующая
          </button>
        )}
      </div>
    </div>
  );
}
