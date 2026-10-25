// store.js
import { configureStore } from '@reduxjs/toolkit';
import eventReducer from "./eventSlice";
import venueReducer from "./venueSlice";

import avReducer from './avSlice';
import mealsReducer from './mealsSlice';

const store = configureStore({
  reducer: {
    event: eventReducer,
    venue: venueReducer,
    av: avReducer,
    meals: mealsReducer,
  },
});

export default store;