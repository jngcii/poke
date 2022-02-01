import reducer, {
  getAllMemory,
  initialState,
} from '../../../src/redux/slices/memorySlice';
import configureMockStore from 'redux-mock-store';
import { createMemory } from '../../../src/redux/utils/objectCreator';
import thunk from 'redux-thunk';
import repository from '../../../src/redux/api/repository';

jest.mock('../../../src/redux/api/repository');

const mockedMemory1 = createMemory('1', 'first', true, null, 0);
const mockedMemory2 = createMemory('1', 'second', true, null, 0);

describe('memory slice reducer test', function () {
  
  test('dispatching getAllMemory thunk trigger actions', () => {
    let state = initialState;
    const mockStore = configureMockStore([thunk]);
    const store = mockStore(state);
    repository.getAllMemory.mockResolvedValueOnce([mockedMemory1, mockedMemory2]);
  
    store.dispatch(getAllMemory())
      .then(() => {
        expect(store.getActions[0].type).toEqual(getAllMemory.pending.type);
        state = reducer(state, store.getActions()[0]);
        expect(state.loadingMemories).toBe(true);
        expect(state.failToLoadMemories).toBe(false);
      
        expect(store.getActions[1].type).toEqual(getAllMemory.fulfilled.type);
        state = reducer(state, store.getActions()[1]);
        expect(state.loadingMemories).toBe(false);
        expect(state.failToLoadMemories).toBe(false);
        expect(state.memories).toEqual([mockedMemory1, mockedMemory2]);
      
        expect(store.getActions[2].type).toEqual(getAllMemory.rejected.type);
        state = reducer(state, store.getActions()[2]);
        expect(state.loadingMemories).toBe(false);
        expect(state.failToLoadMemories).toBe(true);
      }).catch(e => null);
  });
  
});
