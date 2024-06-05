import React from 'react';
import './notfound.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="NotFoundh1">404 - Страница не найдена</h1>
      <p className="NotFoundp1">
        Извините, запрашиваемая страница не существует.
      </p>
    </div>
  );
};

export default NotFoundPage;
