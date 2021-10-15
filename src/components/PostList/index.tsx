import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDraggable } from 'muuri-react';
import { selectPost } from '../../redux/slices/postSlice';
import { RootState } from '../../redux/store';
import { Post } from '../../types/object';
import './style.scss';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import PostGrid from '../PostGrid';

export default React.memo(() => {
  const { posts } = useSelector((state: RootState) => state.post);

  return (
    <PostGrid posts={posts}>
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </PostGrid>
  );
});

const PostListItem = React.memo(({ post }: PostProps) => (
  <div className="post-list-item-outer">
    <div className="post-list-item-inner">
      <PostListItemTitle post={post} />
      <PostListItemDragger />
    </div>
  </div>
));

const PostListItemTitle = React.memo(({ post }: PostProps) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(selectPost(post));
  };

  return (
    <div className="post-list-item-title" onClick={onClick}>
      <strong>{post.title}</strong>
    </div>
  );
});

const PostListItemDragger = React.memo(() => {
  const draggable = useDraggable();

  useEffect(() => {
    draggable(false);
  }, []);

  const enableDrag = () => draggable(true);
  const disableDrag = () => draggable(false);

  return (
    <div
      className="post-list-item-dragger"
      onMouseOver={enableDrag}
      onMouseLeave={disableDrag}
    />
  );
});

type PostProps = {
  post: Post
}
