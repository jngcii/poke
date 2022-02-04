import { createSlice } from '@reduxjs/toolkit';

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
    toggleMemory: (state: InitialState) => {
      state.isMemoryOpen = !state.isMemoryOpen;
    },
  },
});

export const { toggleMemory } = defaultSlice.actions;

export default defaultSlice.reducer;
