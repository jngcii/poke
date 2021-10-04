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
export const checkItem = createAsyncThunk<void, number>(
  'items/checkItemStatus',
  async (itemId) => repository.checkItem(itemId),
);

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
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

    [checkItem.pending.type]: (state: InitialState, { meta: { arg } }) => {
      const checkedItem = state.items.find((it) => it.id === arg);

      if (!checkedItem) {
        console.error(`Cannot find Item(id=${arg})`);
      } else {
        checkedItem.isDone = !checkedItem.isDone;
      }
    },
    [checkItem.rejected.type]: (state: InitialState, { meta: { arg } }) => {
      // eslint-disable-next-line no-alert
      alert('Failed To Check Item!');

      const checkedItem = state.items.find((it) => it.id === arg);
      if (checkedItem !== undefined) checkedItem.isDone = !checkedItem.isDone;
    },
  },
});

const { reducer } = itemSlice;

export default reducer;
