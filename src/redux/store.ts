import { configureStore } from '@reduxjs/toolkit';
import defaultReducer from './slices/defaultSlice';
import postReducer from './slices/postSlice';
import itemReducer from './slices/itemSlice';
import memoryReducer from './slices/memorySlice';

const store = configureStore({
  reducer: {
    default: defaultReducer,
    post: postReducer,
    item: itemReducer,
    memory: memoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;
