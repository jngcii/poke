import reducer, {
  addPost,
  getAllPost,
  initialState,
  removePost,
  selectPost
} from '../../../src/redux/slices/postSlice';
import configureMockStore from 'redux-mock-store';
import { createPost } from '../../../src/redux/utils/objectCreator';
import thunk from 'redux-thunk';
import repository from '../../../src/redux/api/repository';

jest.mock('../../../src/redux/api/repository');

const mockedPost1 = createPost('1', 'first');
const mockedPost2 = createPost('2', 'second');

describe('post slice reducer test', function () {

  test('dispatching select post reducer test', () => {
    // given
    let state = {
      ...initialState,
      posts: [mockedPost1]
    };

    // 1. currentPost가 null일 때, 존재하는 post를 선택시 currentPost로 할당됨
    //  when
    state = reducer(state, selectPost(mockedPost1));
    //  then
    expect(state.currentPost).toEqual(mockedPost1);

    // 2. currentPost와 같은 id의 post를 선택시 currentPost가 null이됨
    //  when
    state = reducer(state, selectPost(mockedPost1));
    //  then
    expect(state.currentPost).toBeNull();
  });

  test('test dispatching getAllPost thunk trigger actions', () => {
    let state = initialState;
    const mockStore = configureMockStore([thunk]);
    const store = mockStore(state);
    repository.getAllPost.mockResolvedValueOnce([mockedPost1, mockedPost2]);

    store.dispatch(getAllPost())
      .then(() => {
        expect(store.getActions[0].type).toEqual(getAllPost.pending.type);
        state = reducer(state, store.getActions()[0]);
        expect(state.loadingPosts).toBe(true);
        expect(state.failToLoadPosts).toBe(false);

        expect(store.getActions[1].type).toEqual(getAllPost.fulfilled.type);
        state = reducer(state, store.getActions()[1]);
        expect(state.loadingPosts).toBe(false);
        expect(state.failToLoadPosts).toBe(false);
        expect(state.posts).toEqual([mockedPost1, mockedPost2]);

        expect(store.getActions[2].type).toEqual(getAllPost.rejected.type);
        state = reducer(state, store.getActions()[2]);
        expect(state.loadingPosts).toBe(false);
        expect(state.failToLoadPosts).toBe(true);
      });
  });

  test('test dispatching addPost thunk trigger actions', () => {
    let state = initialState;
    const mockStore = configureMockStore([thunk]);
    const store = mockStore(state);

    store.dispatch(addPost(mockedPost1))
      .then(() => {
        expect(store.getActions[0].type).toEqual(addPost.pending.type);
        state = reducer(state, store.getActions()[0]);
        expect(state.currentPost).toEqual(mockedPost1);
        expect(state.posts).toEqual([mockedPost1, ...initialState.posts]);

        expect(store.getActions[2].type).toEqual(addPost.rejected.type);
        state = reducer(state, store.getActions()[2]);
        expect(state.currentPost).toBeNull();
        expect(state.posts).toEqual(initialState.posts);
      });
  });

  test('test dispatching removePost thunk trigger actions', () => {
    let state = {
      ...initialState,
      posts: [mockedPost1]
    };
    const mockStore = configureMockStore([thunk]);
    const store = mockStore(state);

    store.dispatch(removePost(mockedPost1.id))
      .then(() => {
        expect(store.getActions[0].type).toEqual(removePost.pending.type);
        state = reducer(state, store.getActions()[0]);
        expect(state.currentPost).toBeNull();
        expect(state.posts).toEqual([]);
      });
  });

});
