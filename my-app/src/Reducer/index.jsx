import { combineReducers } from '@reduxjs/toolkit';

import cartReducer from '../Slices/castSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
