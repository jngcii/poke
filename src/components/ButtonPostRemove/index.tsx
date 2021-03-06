import React from 'react';
import { useDispatch } from 'react-redux';
import { removePost } from '../../redux/slices/postSlice';
import { Post } from '../../types/object';
import './style.scss';

export default React.memo(({ post }: PostProps) => {
  const dispatch = useDispatch();

  const onRemove = () => dispatch(removePost(post.id));

  return (
    <button className="component-button-post-remove" type="button" onClick={onRemove}>
      TRASH
    </button>
  );
});

type PostProps = { post: Post }
