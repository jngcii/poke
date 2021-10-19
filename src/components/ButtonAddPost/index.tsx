import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../redux/slices/postSlice';
import './style.scss';
import { RootState } from '../../redux/store';
import { createPost } from '../../redux/utils/objectCreator';
import { key8Factory } from '../../redux/utils/keyFactory';

export default React.memo(() => {
  const { posts } = useSelector((state: RootState) => state.post);

  const dispatch = useDispatch();

  const onAdd = () => {
    const sortedKeyList = [...posts.map((it) => it.order)].sort(key8Factory.compare);

    const newKey = sortedKeyList.length > 0
      ? key8Factory.first(sortedKeyList[0])
      : key8Factory.init();

    const newPost = createPost(
      newKey,
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
