import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/postSlice';
import itemReducer from './slices/itemSlice';

const store = configureStore({
  reducer: {
    post: postReducer,
    item: itemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;
