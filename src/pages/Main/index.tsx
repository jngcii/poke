import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPost } from '../../redux/slices/postSlice';
import { getAllItem } from '../../redux/slices/itemSlice';
import MainHeader from '../../components/MainHeader';
import PostList from '../../components/PostList';
import ButtonAddPost from '../../components/ButtonAddPost';
import Post from '../../components/Post';
import './style.scss';

export default React.memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPost());
    dispatch(getAllItem());
  }, []);

  return (
    <div>
      <header className="screen-main-header">
        <MainHeader />
      </header>

      <section className="screen-main-section">
        <div className="screen-main-column-list">
          <ButtonAddPost />
          <PostList />
        </div>
        <div className="screen-main-column-detail">
          <Post />
        </div>
      </section>
    </div>
  );
});
