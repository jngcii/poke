import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item, Memory } from '../../types/object';
import repository from '../api/repository';
import { RootState } from '../store';

type InitialState = {
  loadingMemories: boolean,
  failToLoadMemories: boolean,
  memories: Memory[],
  selectable: boolean,
  focusedItem: Item | undefined,
};

export const initialState: InitialState = {
  loadingMemories: true,
  failToLoadMemories: false,
  memories: [],
  selectable: false,
  focusedItem: undefined,
};

const sleep = (n: number) => new Promise((resolve) => setTimeout(resolve, n));

export const setSelectableAsync = createAsyncThunk(
  'memories/setSelectableAsync',
  async (to: boolean, { getState, dispatch }) => {
    if (to) {
      const { memory: { selectable } } = getState() as RootState;
      if (selectable) return;
      dispatch(setSelectable(true));
    } else {
      await sleep(300);
      const { memory: { focusedItem } } = getState() as RootState;
      if (!focusedItem) {
        dispatch(setSelectable(false));
      }
    }
  },
);

export const getAllMemory = createAsyncThunk(
  'memories/getAllMemory',
  async () => repository.getAllMemory(),
);

type MemoryUpdateType = { id: string, memory: Memory };

export const memorySlice = createSlice({
  name: 'memories',
  initialState,
  reducers: {
    updateMemory: (state: InitialState, action: PayloadAction<MemoryUpdateType>) => {
      const { id, memory } = action.payload;

      state.memories = state.memories.map((it) => (
        it.id === id ? memory : it
      ));

      repository.updateMemory(memory);
    },
    addMemory: (state: InitialState, action: PayloadAction<Memory>) => {
      const memory = action.payload;

      state.memories.push(memory);

      repository.addMemory(memory);
    },
    setFocusedItem: (state: InitialState, action: PayloadAction<Item | undefined>) => {
      state.focusedItem = action.payload;
    },
    setSelectable: (state: InitialState, action: PayloadAction<boolean>) => {
      state.selectable = action.payload;
    },
  },
  extraReducers: {
    [getAllMemory.pending.type]: (state: InitialState) => {
      state.loadingMemories = true;
      state.failToLoadMemories = false;
    },
    [getAllMemory.fulfilled.type]: (state: InitialState, action: PayloadAction<Memory[]>) => {
      state.loadingMemories = false;
      state.memories = action.payload;
      state.failToLoadMemories = false;
    },
    [getAllMemory.rejected.type]: (state: InitialState) => {
      state.loadingMemories = false;
      state.failToLoadMemories = true;
    },
  },
});

export const {
  updateMemory, addMemory, setSelectable, setFocusedItem,
} = memorySlice.actions;

export default memorySlice.reducer;
