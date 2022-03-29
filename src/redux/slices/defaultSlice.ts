import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  isLoggedIn: boolean,
  isMemoryOpen: boolean
};

export const initialState: InitialState = {
  isLoggedIn: false,
  isMemoryOpen: false,
};

export const defaultSlice = createSlice({
  name: 'default',
  initialState,
  reducers: {
    toggleMemory: (state: InitialState, action: PayloadAction<boolean | undefined>) => {
      if (!action.payload) {
        state.isMemoryOpen = !state.isMemoryOpen;
      } else {
        state.isMemoryOpen = action.payload;
      }
    },
  },
});

export const { toggleMemory } = defaultSlice.actions;

export default defaultSlice.reducer;
