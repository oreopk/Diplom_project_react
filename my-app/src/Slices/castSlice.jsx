// Slices/CartSlice.jsx

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: 0,
  cards: [],
  newcards: [],
  auth: [],
  loginIn: JSON.parse(localStorage.getItem('loginIn')) || false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addNewAuth: (state, action) => {
      const item = [];
      item.push(action.payload[0]);
      item.push(action.payload[1]);
      if (state.auth.find((element) => item[0] === element[0])) return;
      item.push(0);
      item.push(0);
      item.push([]);
      state.auth.push(item);
    },
    login: (state, action) => {
      const item = action.payload;
      state.login = item;
      state.loginIn = true;
    },
    exit: (state, action) => {
      state.loginIn = false;
      console.log('exit');
      const serializedState = JSON.stringify(state);
      localStorage.setItem('redux-state', serializedState);
    },
    addToCart: (state, action) => {
      const item = action.payload;

      state.auth[state.login][4].push(item);

      state.auth[state.login][2]++;

      //state.totalItems++;
      state.auth[state.login][3] += item.price;

      // state.total += item.price;
      console.log(12412);
    },

    removeFromCart: (state, action) => {
      const item = action.payload;

      const index = state.auth[state.login][4].findIndex(
        (items) => items.id == item.id
      );
      console.log(index);
      if (index >= 0) {
        state.auth[state.login][3] =
          state.auth[state.login][3] - state.auth[state.login][4][index].price;
        state.auth[state.login][3].toFixed(5);
        if (state.auth[state.login][3] < 0) {
          state.auth[state.login][3] = 0;
        }
        state.auth[state.login][4] = state.auth[state.login][4].filter(
          (item, idx) => idx !== index
        );
        state.auth[state.login][2] -= 1;
      }
      // return {
      //   ...state,
      //   totalItems: state.totalItems - 1,
      //   total: state.total - state.cart[index].price,
      //   cart: state.cart.filter((item, idx) => idx !== index),
      // };
    },

    // removeFromCart: (state = initialState, action) => {
    //   const item = action.payload;

    //   const index = state.cart.findIndex((items) => items.id == item.id);

    //   if (index >= 0) {
    //     return {
    //       ...state,
    //       totalItems: state.totalItems - 1,
    //       total: state.total - state.cart[index].price,
    //       cart: state.cart.filter((item, idx) => idx !== index),
    //     };
    //   }
    // },

    addnewCart: (state, action) => {
      return {
        ...state,
        newcards: [
          ...state.newcards,
          {
            category: "men's clothing",
            description: action.payload.description,
            id: action.payload.id,
            image: action.payload.image,
            price: parseInt(action.payload.price),
            rating: { rate: 3.9, count: 120 },
            title: action.payload.title,
            status: action.payload.status,
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
    buy: (state, action) => {
      const item = action.payload;
      console.log(item);
      state.auth[item][4].splice(0, state.auth[item][4].length);
      state.auth[item][2] = 0;
      state.auth[item][3] = 0;
    },
    OnOff: (state, action) => {
      const item = action.payload;
      console.log(item);
      state.newcards[item.index].status = !state.newcards[item.index].status;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  addCart,
  removenewCart,
  addnewCart,
  addNewAuth,
  login,
  exit,
  buy,
  OnOff,
} = cartSlice.actions;
export default cartSlice.reducer;
