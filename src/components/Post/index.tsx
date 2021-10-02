import React from 'react';
import { useSelector } from 'react-redux';
import ItemList from '../ItemList';
import { Post } from '../../types/object';
import { RootState } from '../../redux/store';
import ButtonRemovePost from '../ButtonRemovePost';
import './style.scss';

export default React.memo(() => {
  const {
    post: { currentPost },
    item: { items },
  } = useSelector((state: RootState) => state);

  return currentPost ? (
    <div className="component-post-wrapper">
      <PostHeader>
        <PostHeaderTitle post={currentPost} />
        <PostHeaderOptions>
          <ButtonRemovePost post={currentPost} />
        </PostHeaderOptions>
      </PostHeader>

      <PostContent>
        <ItemList items={items.filter((it) => it.postId === currentPost.id)} />
      </PostContent>
    </div>
  ) : (
    <div>
      <strong>SELECT THE POST PLZ</strong>
    </div>
  );
});

const PostHeader = React.memo(({ children }) => <header className="component-post-header">{children}</header>);

const PostHeaderTitle = React.memo(({ post }: PostProps) => (
  <div className="component-post-header-title">
    <strong>{post.title}</strong>
  </div>
));

const PostHeaderOptions = React.memo(({ children }) => <div className="component-post-header-options">{children}</div>);

const PostContent = React.memo(({ children }) => <>{children}</>);

type PostProps = { post: Post }
