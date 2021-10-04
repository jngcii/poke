import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../types/object';
import repository from '../api/repository';

type InitialState = {
  loadingItems: boolean,
  failToLoadItems: boolean,
  items: Item[]
}

const initialState: InitialState = {
  loadingItems: true,
  failToLoadItems: false,
  items: [],
};

export const getAllItem = createAsyncThunk(
  'items/getAllStatus',
  async () => repository.getAllItem(),
);

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    checkItem: (state: InitialState, action: PayloadAction<number>) => {
      const checkedItem = state.items.find((it) => it.id === action.payload);

      if (!checkedItem) {
        console.error(`Cannot find Item(id=${action.payload})`);
      } else {
        checkedItem.isDone = !checkedItem.isDone;
      }
    },
  },

  extraReducers: {
    [getAllItem.pending.type]: (state: InitialState) => {
      state.loadingItems = true;
      state.failToLoadItems = false;
    },
    [getAllItem.fulfilled.type]: (state: InitialState, action: PayloadAction<Item[]>) => {
      state.loadingItems = false;
      state.items = action.payload;
    },
    [getAllItem.rejected.type]: (state: InitialState) => {
      state.loadingItems = false;
      state.failToLoadItems = true;
    },
  },
});

const { actions, reducer } = itemSlice;

export const { checkItem } = actions;

export default reducer;
