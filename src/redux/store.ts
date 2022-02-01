import { configureStore } from '@reduxjs/toolkit';
import defaultReducer from './slices/defaultSlice';
import postReducer from './slices/postSlice';
import itemReducer from './slices/itemSlice';

const store = configureStore({
  reducer: {
    default: defaultReducer,
    post: postReducer,
    item: itemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;
