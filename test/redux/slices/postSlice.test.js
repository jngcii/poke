import reducer, {
  addPost,
  getAllPost,
  initialState,
  removePost,
  selectPost
} from '../../../src/redux/slices/postSlice';
import { createPost } from '../../../src/redux/utils/objectCreator';
import repository from '../../../src/redux/api/repository';

const mockedPost1 = createPost(1, 'first');
const mockedPost2 = createPost(2, 'second');

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

  test('dispatching getAllPost reducer test', () => {
    let state = initialState;

    // 1. getAllPost 비동기를 시작했을 때,
    // when
    state = reducer(state, getAllPost.pending);
    // then
    expect(state.loadingPosts).toBe(true);
    expect(state.failToLoadPosts).toBe(false);

    // 2. getAllPost 성공시
    // when
    state = reducer(state, getAllPost.fulfilled);
    // then
    expect(state.loadingPosts).toBe(false);
    expect(state.failToLoadPosts).toBe(false);

    // 3. getAllPost 실패시
    // when
    state = reducer(state, getAllPost.rejected);
    // then
    expect(state.loadingPosts).toBe(false);
    expect(state.failToLoadPosts).toBe(true);
  });

});
