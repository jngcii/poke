import configureStore from 'redux-mock-store';
import { initialState, selectPost } from '../../../src/redux/slices/postSlice';
import { createPost } from '../../../src/redux/utils/objectCreator';

const mockStore = configureStore([]);
let store = null;
const mockedPost = createPost(1, 'sample')

describe('post slice test', function () {

  beforeEach(() => {
    const state = {
      ...initialState,
      posts: [ mockedPost ]
    };
    store = mockStore(state);
  });

  test('dispatching select post test', () => {
    store.dispatch(selectPost(mockedPost));

    const actions = store.getActions();
    expect(actions).toEqual([
      { 'payload': mockedPost, 'type': 'posts/selectPost' }
    ]);
  });

});
