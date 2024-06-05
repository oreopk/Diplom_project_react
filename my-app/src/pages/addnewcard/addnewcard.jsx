import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addnewCart, removenewCart } from '../../Slices/castSlice';

export default function Addnewcard() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardPrice, setNewCardPrice] = useState('');

  let img = '';
  const cards = useSelector((state) => state.cart.cards);
  console.log(cards);
  const handleAddCard = () => {
    let random = Math.floor(Math.random() * cards.length);

    if (!cards[random]) {
      img = '';
    } else {
      img = cards[random].image;
    }
    console.log(Image);
    dispatch(
      addnewCart({
        title: newCardTitle,
        image: img,
        price: newCardPrice,
      })
    ); // Передаем объект с полями title и price
    setNewCardTitle('');
    setNewCardPrice(0);
  };
  const removeCard = (index) => {
    dispatch(removenewCart(index));
  };

  return (
    <div className="divnewcard">
      <div className="newheader">
        <span className="newspan1">Название товара </span>
        <input
          className="newname"
          type="text"
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
        />
        <span className="newspan1">Цена </span>
        <input
          className="newprice"
          type="text"
          pattern="[0-9]*" // Разрешить ввод только цифр
          value={newCardPrice}
          onChange={(e) => {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
              setNewCardPrice(e.target.value);
            }
          }}
        />

        <button className="newbtn" onClick={handleAddCard}>
          Add Card
        </button>
      </div>
      <div className="contnew">
        {cart.newcards.map((card, index) => (
          <div className="divnewcardmain" key={index}>
            <p className="divnewcard_p">{card.title}</p>
            <div className="imgnewdiv">
              <img className="divnewimg" src={card.img} alt="" />
            </div>
            <p className="divnewcard_p2">Цена: {card.price}</p>
            <button className="divnewbtn2" onClick={() => removeCard(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
