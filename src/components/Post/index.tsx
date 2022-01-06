import React, {
  ChangeEvent, KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemList from '../ItemList';
import { Item, Post } from '../../types/object';
import { RootState } from '../../redux/store';
import ButtonRemovePost from '../ButtonRemovePost';
import './style.scss';
import { updatePost } from '../../redux/slices/postSlice';
import { createInitialItem, createItem } from '../../redux/utils/objectCreator';
import { addItem } from '../../redux/slices/itemSlice';
import { key8Factory } from '../../redux/utils/keyFactory';

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

const PostHeaderTitle = React.memo(({ post }: PostProps) => {
  const [title, setTitle] = useState(post.title);
  const inputRef = useRef(null);
  const items = useSelector((state: RootState) => state.item)
    .items.map((it) => it.order)
    .sort((a, b) => key8Factory.compare(a, b));
  const dispatch = useDispatch();

  // 리렌더링 될 때 title가 비어있다 : 새로 생긴 Post 컴퍼넌트다
  // 새로생겼을 때를 제외하고는 title이 비어있는 경우 없음!
  // 그때는 input에 포커싱이 된다.
  useEffect(() => {
    if (!title || !title.trim()) {
      inputRef.current.focus();
    } else {
      setTitle(post.title);
    }
  }, [post.id]);

  const onEnter = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      let newItem: Item;
      if (items.length === 0) {
        newItem = createInitialItem(post.id);
      } else {
        const lastItem = items[items.length - 1];
        const newOrder = key8Factory.build(lastItem.order, undefined);
        newItem = createItem(newOrder, post.id, '', false);
      }
      dispatch(addItem(newItem));

      inputRef.current.blur(); // 이후 onBlur 호출됨
    }
  }, [title]);

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    e.preventDefault();
  }, [title]);

  // Blur 당시 title이 빈문자열일땐, 원래의 title로 복귀
  const onBlur = useCallback(() => {
    let currentTitle = title;
    if (!title || !title.trim()) {
      currentTitle = `My CheckList - ${post.id}`;
      setTitle(currentTitle);
    }

    dispatch(updatePost({ id: post.id, post: { ...post, title: currentTitle } }));
  }, [post, title]);

  return (
    <div className="component-post-header-title">
      <strong>
        <input
          ref={inputRef}
          value={title}
          onKeyDown={onEnter}
          onChange={onChangeTitle}
          onBlur={onBlur}
        />
      </strong>
    </div>
  );
});

const PostHeaderOptions = React.memo(({ children }) => <div className="component-post-header-options">{children}</div>);

const PostContent = React.memo(({ children }) => <>{children}</>);

type PostProps = { post: Post }
