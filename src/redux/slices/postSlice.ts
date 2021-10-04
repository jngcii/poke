import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPost } from '../utils/objectCreator';
import { Post } from '../../types/object';
import repository from '../api/repository';

type InitialState = {
  currentPost: Post | null,
  loadingPosts: boolean,
  failToLoadPosts: boolean,
  posts: Post[]
}

const initialState: InitialState = {
  currentPost: null,
  loadingPosts: true,
  failToLoadPosts: false,
  posts: [],
};

export const getAllPost = createAsyncThunk(
  'posts/getAllStatus',
  async () => repository.getAllPost(),
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state: InitialState) => {
      const newPost = createPost(
        state.posts.length > 0
          ? Math.max(...state.posts.map((it) => it.id)) + 1
          : 1,
        'New List',
      );

      state.currentPost = newPost;
      state.posts = [newPost, ...state.posts];
    },

    removePost: (state: InitialState, action: PayloadAction<number>) => {
      const postId = action.payload;

      state.currentPost = null;
      state.posts = state.posts.filter((it) => it.id !== postId);
    },

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
      state.posts = action.payload;
    },
    [getAllPost.rejected.type]: (state: InitialState) => {
      state.loadingPosts = false;
      state.failToLoadPosts = true;
    },
  },
});

export const { addPost, removePost, selectPost } = postSlice.actions;

export default postSlice.reducer;
