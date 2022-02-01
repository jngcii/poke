import React from 'react';
import ButtonAddPost from '../ButtonAddPost';
import PostList from '../PostList';
import Post from '../Post';
import './style.scss';

export default React.memo(() => (
  <section className="screen-home-section">
    <div className="screen-home-column-list">
      <ButtonAddPost />
      <PostList />
    </div>

    <div className="screen-home-column-detail">
      <Post />
    </div>
  </section>
));
