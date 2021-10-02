import React from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../redux/slices/postSlice';
import './style.scss';

export default React.memo(() => {
  const dispatch = useDispatch();

  const onAdd = () => dispatch(addPost());

  return (
    <div className="component-button-add-post-wrapper">
      <span className="component-button-add-post-btn" onClick={onAdd}>
        NEW
      </span>
    </div>
  );
});
