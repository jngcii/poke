import reducer, {
  addItem,
  checkItem,
  getAllItem,
  initialState, removeItem,
} from '../../../src/redux/slices/itemSlice';
import configureMockStore from 'redux-mock-store';
import { createItem } from '../../../src/redux/utils/objectCreator';
import thunk from 'redux-thunk';
import repository from '../../../src/redux/api/repository';

jest.mock('../../../src/redux/api/repository');

const mockedItem1 = createItem('1', '1', 'first', false);
const mockedItem2 = createItem('2', '1', 'second', false);

describe('item slice reducer test', function () {

  test('test dispatching getAllItem thunk trigger actions', () => {
    let state = initialState;
    const mockStore = configureMockStore([thunk]);
    const store = mockStore(state);
    repository.getAllItem.mockResolvedValueOnce([mockedItem1, mockedItem2]);

    store.dispatch(getAllItem())
      .then(() => {
        expect(store.getActions[0].type).toEqual(getAllItem.pending.type);
        state = reducer(state, store.getActions()[0]);
        expect(state.loadingItems).toBe(true);
        expect(state.failToLoadItems).toBe(false);

        expect(store.getActions[1].type).toEqual(getAllItem.fulfilled.type);
        state = reducer(state, store.getActions()[1]);
        expect(state.loadingItems).toBe(false);
        expect(state.failToLoadItems).toBe(false);
        expect(state.items).toEqual([mockedItem1, mockedItem2]);

        expect(store.getActions[2].type).toEqual(getAllItem.rejected.type);
        state = reducer(state, store.getActions()[2]);
        expect(state.loadingItems).toBe(false);
        expect(state.failToLoadItems).toBe(true);
      });
  });

  test('test dispatching checkItem thunk trigger actions', () => {
    let state = {
      ...initialState,
      items: [mockedItem1, mockedItem2]
    };
    const mockStore = configureMockStore([thunk]);
    const store = mockStore(state);

    store.dispatch(checkItem(mockedItem1.id))
      .then(() => {
        expect(store.getActions[0].type).toEqual(checkItem.pending.type);
        state = reducer(state, store.getActions()[0]);
        expect(state.items[0].isDone).toBe(true);

        expect(store.getActions[2].type).toEqual(checkItem.rejected.type);
        state = reducer(state, store.getActions()[2]);
        expect(state.items[0].isDone).toBe(false);
      });
  });

  test('dispatching add item reducer test', () => {
    let state = {
      ...initialState,
      items: [mockedItem1, mockedItem2]
    };

    const mockedItem3 = createItem('3', '1', 'third', false);

    state = reducer(state, addItem(mockedItem3));
    expect(state.items.length).toBe(3);
    expect(state.items[2]).toEqual(mockedItem3);
  });

  test('dispatching remove item reducer test', () => {
    let state = {
      ...initialState,
      items: [mockedItem1, mockedItem2]
    };

    const targetId = mockedItem1.id;

    state = reducer(state, removeItem(targetId));
    expect(state.items.length).toBe(1);
  })

});
