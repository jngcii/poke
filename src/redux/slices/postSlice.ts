import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/object';
import repository from '../api/repository';

type InitialState = {
  currentPost: Post | null,
  loadingPosts: boolean,
  failToLoadPosts: boolean,
  posts: Post[]
}

export const initialState: InitialState = {
  currentPost: null,
  loadingPosts: true,
  failToLoadPosts: false,
  posts: [],
};

export const getAllPost = createAsyncThunk(
  'posts/getAllStatus',
  async () => repository.getAllPost(),
);
export const addPost = createAsyncThunk<void, Post>(
  'posts/addPostStatus',
  async (newPost) => repository.addPost(newPost),
);
export const removePost = createAsyncThunk<void, number>(
  'posts/removePostStatus',
  async (postId) => repository.removePost(postId),
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectPost: (state: InitialState, action: PayloadAction<Post>) => {
      const post = action.payload;

      state.currentPost = !!state.currentPost && state.currentPost.id === post.id ? null : post;
    },
  },

  extraReducers: {
    [getAllPost.pending.type]: (state: InitialState) => {
      state.loadingPosts = true;
      state.failToLoadPosts = false;
    },
    [getAllPost.fulfilled.type]: (state: InitialState, action: PayloadAction<Post[]>) => {
      state.loadingPosts = false;
      state.failToLoadPosts = false;
      state.posts = action.payload;
    },
    [getAllPost.rejected.type]: (state: InitialState) => {
      state.loadingPosts = false;
      state.failToLoadPosts = true;
    },

    [addPost.pending.type]: (state: InitialState, { meta: { arg } }) => {
      state.posts = [arg, ...state.posts];
      state.currentPost = arg;
    },
    [addPost.rejected.type]: (state: InitialState, { meta: { arg } }) => {
      // eslint-disable-next-line no-alert
      alert('Failed To Add Post!');
      state.posts = state.posts.filter((it) => it.id !== arg.id);
      state.currentPost = null;
    },

    [removePost.pending.type]: (state: InitialState, { meta: { arg } }) => {
      state.posts = state.posts.filter((it) => it.id !== arg);
      state.currentPost = null;
    },
  },
});

export const { selectPost } = postSlice.actions;

export default postSlice.reducer;
