import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item, Memory } from '../../types/object';
import repository from '../api/repository';
import { RootState } from '../store';
import { rootMemory } from '../api/mockingRepository';
import { key8Factory } from '../utils/keyFactory';

type InitialState = {
  loadingMemories: boolean,
  failToLoadMemories: boolean,
  memories: Memory[],
  pickable: boolean,
  focusedItem: Item | undefined,
  selectedMemories: Memory[],
  inEditing: boolean
};

export const initialState: InitialState = {
  loadingMemories: true,
  failToLoadMemories: false,
  memories: [],
  pickable: false,
  focusedItem: undefined,
  selectedMemories: [],
  inEditing: false,
};

const sleep = (n: number) => new Promise((resolve) => setTimeout(resolve, n));

// 사용하진 않지만 thunk 예시로 남겨둔 코드
const setPickableAsync = createAsyncThunk(
  'memories/setPickableAsync',
  async (to: boolean, { getState, dispatch }) => {
    if (to) {
      const { memory: { pickable } } = getState() as RootState;
      if (pickable) return;
      dispatch(setPickable(true));
    } else {
      await sleep(300);
      const { memory: { focusedItem } } = getState() as RootState;
      if (!focusedItem) {
        dispatch(setPickable(false));
      }
    }
  },
);

// addMemory 이전에 fixed=false memory가 5개 이상일 경우 4개로 만들어주는 thunk 함수
export const addMemoryThunk = createAsyncThunk(
  'memories/addMemoryThunk',
  async (memory: Memory, { getState, dispatch }) => {
    const { memory: { memories } } = getState() as RootState;
    let spareMemories = [...memories].filter((it) => !it.fixed);

    while (spareMemories.length >= 5) {
      dispatch(removeMemory(spareMemories[0].id));
      spareMemories = spareMemories.slice(1);
    }

    dispatch(addMemory(memory));
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
    removeMemory: (state: InitialState, action: PayloadAction<string>) => {
      const memoryId = action.payload;

      state.memories = state.memories.filter((it) => it.id !== memoryId);

      repository.removeMemory(memoryId);
    },
    removeSelectedMemories: (state: InitialState) => {
      const selectedMemoryIds = state.selectedMemories.map((it) => it.id);
      const childrenIds = state.memories
        .filter((it) => selectedMemoryIds.includes(it.parentId))
        .map((it) => it.id);
      const memoryIds = [...selectedMemoryIds, ...childrenIds];

      state.memories = state.memories.filter((it) => !memoryIds.includes(it.id));

      repository.removeMemories(memoryIds);

      state.selectedMemories = [];
    },
    setFocusedItem: (state: InitialState, action: PayloadAction<Item | undefined>) => {
      state.focusedItem = action.payload;
    },
    setPickable: (state: InitialState, action: PayloadAction<boolean>) => {
      state.pickable = action.payload;
    },
    addSelectedMemory: (state: InitialState, action: PayloadAction<Memory>) => {
      state.selectedMemories = state.selectedMemories.concat(action.payload);
      console.log(state.selectedMemories);
    },
    removeSelectedMemory: (state: InitialState, action: PayloadAction<Memory>) => {
      const { id } = action.payload;
      state.selectedMemories = state.selectedMemories.filter((it) => it.id !== id);
    },
    clearSelectedMemories: (state: InitialState) => {
      state.selectedMemories = [];
    },
    updateMemoriesToTopLevel: (state: InitialState) => {
      const sortedMemories = state.memories.length > 1
        ? state.memories.sort((before, after) => key8Factory.compare(before.order, after.order))
        : state.memories;

      let lastOrder = sortedMemories.length === 0
        ? undefined
        : sortedMemories[sortedMemories.length - 1].order;

      const newMemories = state.selectedMemories
        .map((it) => {
          if (it.parentId === rootMemory.id) return it;
          lastOrder = key8Factory.build(lastOrder);
          return { ...it, parentId: rootMemory.id, order: lastOrder };
        });
      const newMemoryIds = newMemories.map((it) => it.id);

      state.memories = state.memories.map(
        (memory) => (newMemoryIds.includes(memory.id)
          ? newMemories.find((it) => it.id === memory.id)
          : memory),
      );

      repository.updateMemories(newMemories);

      state.selectedMemories = [];
    },
    updateInEditing: (state: InitialState, action: PayloadAction<boolean | undefined>) => {
      if (action.payload === undefined) {
        state.inEditing = !state.inEditing;
      } else {
        state.inEditing = action.payload;
      }
      if (!state.inEditing) {
        state.selectedMemories = [];
      }
    },
    updateMemoriesParent: (state: InitialState, action: PayloadAction<string>) => {
      const parent = state.memories.find((it) => it.id === action.payload);
      if (!parent) {
        console.error('UPDATE MEMORIES PARENT ERROR!');
      }
      const children = state.memories.filter((it) => it.parentId === parent.id);

      const sortedChildren = children.length > 1
        ? children.sort((before, after) => key8Factory.compare(before.order, after.order))
        : children;
      console.log('UPDATING MEMORIES PARENT');
      console.log(sortedChildren);

      let lastOrder = sortedChildren.length === 0
        ? undefined
        : sortedChildren[sortedChildren.length - 1].order;

      const newMemories = [...state.selectedMemories]
        .map((child) => {
          if (child.id === parent.id) return child;
          if (child.parentId === parent.id) return child;
          lastOrder = key8Factory.build(lastOrder);
          return { ...child, parentId: parent.id, order: lastOrder };
        });
      const newMemoryIds = newMemories.map((it) => it.id);

      console.log('UPDATING MEMORIES PARENT');
      console.log(newMemories);

      state.memories = state.memories.map(
        (memory) => (newMemoryIds.includes(memory.id)
          ? newMemories.find((it) => it.id === memory.id)
          : memory),
      );

      repository.updateMemories(newMemories);

      state.inEditing = false;
      state.selectedMemories = [];
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
  updateMemory,
  addMemory,
  removeMemory,
  removeSelectedMemories,
  setPickable,
  setFocusedItem,
  addSelectedMemory,
  removeSelectedMemory,
  clearSelectedMemories,
  updateMemoriesToTopLevel,
  updateInEditing,
  updateMemoriesParent,
} = memorySlice.actions;

export default memorySlice.reducer;
