import React from 'react';
import ButtonPostAdd from '../ButtonPostAdd';
import PostList from '../PostList';
import Post from '../Post';
import './style.scss';

export default React.memo(() => (
  <section className="screen-home-section">
    <div className="screen-home-column-list">
      <ButtonPostAdd />
      <PostList />
    </div>

    <div className="screen-home-column-detail">
      <Post />
    </div>
  </section>
));
