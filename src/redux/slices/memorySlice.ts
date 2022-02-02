import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Memory } from '../../types/object';
import repository from '../api/repository';

type InitialState = {
  loadingMemories: boolean,
  failToLoadMemories: boolean,
  memories: Memory[]
};

export const initialState: InitialState = {
  loadingMemories: true,
  failToLoadMemories: false,
  memories: [],
};

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

export const { updateMemory, addMemory } = memorySlice.actions;

export default memorySlice.reducer;
