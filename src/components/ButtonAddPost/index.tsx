import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../redux/slices/postSlice';
import './style.scss';
import { RootState } from '../../redux/store';
import { createPost } from '../../redux/utils/objectCreator';

export default React.memo(() => {
  const { posts } = useSelector((state: RootState) => state.post);

  const dispatch = useDispatch();

  const onAdd = () => {
    const newPost = createPost(
      'abcdefgh',
      'New List',
    );
    dispatch(addPost(newPost));
  };

  return (
    <div className="component-button-add-post-wrapper">
      <button className="component-button-add-post-btn" type="button" onClick={onAdd}>
        NEW
      </button>
    </div>
  );
});
