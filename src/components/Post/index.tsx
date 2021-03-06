import React, {
  KeyboardEvent, useCallback, useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemList from '../ItemList';
import { Item, Post } from '../../types/object';
import { RootState } from '../../redux/store';
import ButtonPostRemove from '../ButtonPostRemove';
import './style.scss';
import { updatePost } from '../../redux/slices/postSlice';
import { createInitialItem, createItem } from '../../redux/utils/objectCreator';
import { addItem } from '../../redux/slices/itemSlice';
import { key8Factory } from '../../redux/utils/keyFactory';
import useInput from '../../hooks/InputHook';
import { setPickable } from '../../redux/slices/memorySlice';

export default React.memo(() => {
  const {
    post: { currentPost },
    item: { items },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentPost) {
      dispatch(setPickable(false));
    } else {
      dispatch(setPickable(true));
    }
  }, [currentPost]);

  return currentPost ? (
    <div className="component-post-wrapper">
      <PostHeader>
        <PostHeaderTitle post={currentPost} />
        <PostHeaderOptions>
          <ButtonPostRemove post={currentPost} />
        </PostHeaderOptions>
      </PostHeader>

      <PostContent>
        <ItemList
          post={currentPost}
          items={items.filter((it) => it.postId === currentPost.id)}
        />
      </PostContent>
    </div>
  ) : (
    <div>
      <strong>SELECT THE POST PLZ</strong>
    </div>
  );
});

const PostHeader = React.memo(({ children }) => <header className="component-post-header">{children}</header>);

const PostHeaderTitle = React.memo(({ post }: PostTitleProps) => {
  const {
    value, setValue, ref, onChangeValue,
  } = useInput(post.title);
  const { items } = useSelector((state: RootState) => state.item);
  const dispatch = useDispatch();

  const sortedItems = useMemo(() => (
    items.length > 1
      ? [...items].sort((before, after) => key8Factory.compare(before.order, after.order))
      : [...items]
  ), [post, items]);

  // ???????????? ??? ??? title??? ???????????? : ?????? ?????? Post ???????????????
  // ??????????????? ?????? ??????????????? title??? ???????????? ?????? ??????!
  // ????????? input??? ???????????? ??????.
  useEffect(() => {
    setValue(post.title);
    if (!value || !value.trim() || !post.title) {
      ref.current.focus();
    }
  }, [post.id]);

  const onEnter = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      let newItem: Item;
      if (sortedItems.length === 0) {
        newItem = createInitialItem(post.id);
      } else {
        const lastItem = sortedItems[sortedItems.length - 1];
        const newOrder = key8Factory.build(lastItem.order, undefined);
        newItem = createItem(newOrder, post.id, '', false);
      }
      dispatch(addItem(newItem));

      ref.current.blur(); // ?????? onBlur ?????????
    }
  }, [value]);

  // Blur ?????? title??? ??????????????????, ????????? title??? ??????
  const onBlur = useCallback(() => {
    let currentTitle = value;
    if (!value || !value.trim()) {
      currentTitle = `My CheckList - ${post.id}`;
      setValue(currentTitle);
    }

    dispatch(updatePost({ id: post.id, post: { ...post, title: currentTitle } }));
  }, [post, value]);

  return (
    <div className="component-post-header-title">
      <strong>
        <input
          ref={ref}
          value={value}
          onKeyDown={onEnter}
          onChange={onChangeValue}
          onBlur={onBlur}
        />
      </strong>
    </div>
  );
});

const PostHeaderOptions = React.memo(({ children }) => <div className="component-post-header-options">{children}</div>);

const PostContent = React.memo(({ children }) => <>{children}</>);

type PostTitleProps = { post: Post }
