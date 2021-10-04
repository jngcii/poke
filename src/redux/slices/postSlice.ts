import { createSlice } from '@reduxjs/toolkit';
import { createPost } from '../utils/objectCreator';
import { Post } from '../../types/object';

type InitialState = {
  currentPost: Post | null,
  posts: Post[]
}

const initialState: InitialState = {
  currentPost: null,

  posts: [
    createPost(1, 'first'),
    createPost(2, 'second'),
    createPost(3, 'third'),
    createPost(4, 'fourth'),
    createPost(5, 'fifth'),
  ],
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state) => {
      const newPost = createPost(
        state.posts.length > 0
          ? Math.max(...state.posts.map((it) => it.id)) + 1
          : 1,
        'New List',
      );

      state.currentPost = newPost;
      state.posts = [newPost, ...state.posts];
    },

    removePost: (state, action) => {
      const { postId } = action.payload;

      if (!postId) {
        console.error('Cannot find postId in action.payload');
      } else {
        state.currentPost = null;
        state.posts = state.posts.filter((it) => it.id !== postId);
      }
    },

    selectPost: (state, action) => {
      const { post } = action.payload;

      if (!post) {
        console.error('Cannot find post in action.payload');
      } else {
        state.currentPost = state.currentPost && state.currentPost.id === post.id ? null : post;
      }
    },
  },
});

export const { addPost, removePost, selectPost } = postSlice.actions;

export default postSlice.reducer;
