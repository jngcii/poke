import { createSlice } from '@reduxjs/toolkit';
import { createItem } from '../utils/objectCreator';

const initialState = {
  items: [
    createItem(1, 1, 'work', true),
    createItem(2, 1, 'fitness', false),
    createItem(3, 1, 'read book', false),

    createItem(4, 2, 'work', true),
    createItem(5, 2, 'shopping', true),
    createItem(6, 2, 'fitness', true),
    createItem(7, 2, 'read book', false),

    createItem(8, 5, 'egg', false),
    createItem(9, 5, 'milk', false),
    createItem(10, 5, 'yogurt', false),
    createItem(11, 5, 'cereal', false),
    createItem(12, 5, 'salmon', false),
  ],
};

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    checkItem: (state, action) => {
      const { itemId } = action.payload;

      if (!itemId) {
        console.error('Cannot find itemId in action.payload');
      } else {
        const checkedItem = state.items.find(it => it.id === itemId);

        if (!checkedItem) {
          console.error(`Cannot find Item(id=${itemId})`);
        } else {
          checkedItem.isDone = !checkedItem.isDone;
        }
      }
    },
  },
});

const { actions, reducer } = itemSlice;

export const { checkItem } = actions;

export default reducer;
