import { configureStore } from '@reduxjs/toolkit'
import postReducer from "./slices/postSlice";
import itemReducer from "./slices/itemSlice";

export const store = configureStore({
    reducer: {
        post: postReducer,
        item: itemReducer
    }
})