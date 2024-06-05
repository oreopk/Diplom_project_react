// Slices/CartSlice.jsx

import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

const initialState = {
  cart: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [],
  total: localStorage.getItem('total')
    ? JSON.parse(localStorage.getItem('total'))
    : 0,
  totalItems: localStorage.getItem('totalItems')
    ? JSON.parse(localStorage.getItem('totalItems'))
    : 0,
  cards: {},
  newcards: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      state.cart.push(item);
      state.totalItems++;
      state.total += item.price;
    },

    removeFromCart: (state = initialState, action) => {
      const item = action.payload;

      const index = state.cart.findIndex((items) => items.id == item.id);

      if (index >= 0) {
        return {
          ...state,
          totalItems: state.totalItems - 1,
          total: state.total - state.cart[index].price,
          cart: state.cart.filter((item, idx) => idx !== index),
        };
      }
    },

    addnewCart: (state, action) => {
      console.log(action);
      return {
        ...state,
        newcards: [
          ...state.newcards,
          {
            title: action.payload.title,
            img: action.payload.image,
            price: action.payload.price,
          },
        ],
      };
    },
    removenewCart: (state = initialState, action) => {
      const item = action.payload;

      return {
        ...state,
        newcards: state.newcards.filter((card, index) => index !== item),
      };
    },

    addCart: (state, action) => {
      return {
        ...state,
        cards: action.payload,
      };
    },
    removeCart: (state = initialState, action) => {
      const item = action.payload;

      return {
        ...state,
        cards: state.cards.filter((card, index) => index !== item),
      };
    },
  },
});

export const { addToCart, removeFromCart, addCart, removenewCart, addnewCart } =
  cartSlice.actions;
export default cartSlice.reducer;
