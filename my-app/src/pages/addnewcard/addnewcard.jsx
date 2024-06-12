import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addnewCart,
  removenewCart,
  addCart,
  OnOff,
} from '../../Slices/castSlice';

export default function AddNewCard() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardPrice, setNewCardPrice] = useState(0);
  const [newCardDescription, setNewCardDescription] = useState('');
  const [count, setCount] = useState(1);

  const { cards, newcards } = cart;

  const handleToggle = (status, index) => {
    let b = { status, index };
    dispatch(OnOff(b));
  };

  let img = '';

  // Handling adding a new card
  const handleAddCard = () => {
    setCount(count + 1);
    let random = Math.floor(Math.random() * cards.length);

    if (!cards[random]) {
      img = '';
    } else {
      img = cards[random].image;
    }

    dispatch(
      addnewCart({
        title: newCardTitle,
        image: img,
        id: cards.length + count,
        price: newCardPrice,
        description: newCardDescription,
        status: false,
      })
    );

    // Reset input fields after adding a card
    setNewCardTitle('');
    setNewCardPrice(0);
    setNewCardDescription('');
  };

  // Handling removing a card
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
        <span className="newspan1">Описание </span>
        <textarea
          className="newdescription"
          value={newCardDescription}
          onChange={(e) => setNewCardDescription(e.target.value)}
        />
        <button className="newbtn" onClick={handleAddCard}>
          Add Card
        </button>
      </div>
      <div className="contnew">
        {newcards.map((card, index) => (
          <div key={index} className="divnewcardmain">
            <p className="divnewcard_p">{card.title}</p>
            <div className="imgnewdiv">
              <img className="divnewimg" src={card.image} alt="" />
            </div>
            <p className="divnewcard_p2">Цена: {card.price}</p>
            <button className="divnewbtn2" onClick={() => removeCard(index)}>
              Remove
            </button>
            <label className="switch">
              <input
                type="checkbox"
                checked={card.status}
                onChange={() => handleToggle(card.status, index)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
