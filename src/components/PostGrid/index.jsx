import React, { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MuuriComponent } from 'muuri-react';
import { key8Factory } from '../../redux/utils/keyFactory';
import { updatePost } from '../../redux/slices/postSlice';

export default React.memo(({ children }) => {
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const sortedPosts = useMemo(
    () => (posts.length > 1
      ? [...posts].sort((before, after) => key8Factory.compare(before.order, after.order))
      : [...posts]),
    [posts],
  );

  const currentPosition = useRef(0);

  const changeTargetKey = (item) => {
    const post = item.getData();
    const key = post.order;

    const position = item.getPosition().top;

    if (position === currentPosition.current) { return; }

    const margin = item.getMargin();
    const height = item.getHeight() + margin.top + margin.bottom;
    const changedIdx = position / height;

    const target = sortedPosts[changedIdx];

    let before;
    let after;

    const isBiggerThanTarget = key8Factory.compare(key, target.order) > 0;

    // 아래 있던 것이 위로
    if (isBiggerThanTarget) {
      after = target.order;
      if (changedIdx > 0) before = sortedPosts[changedIdx - 1].order;
    // 위에 있던 것이 아래로
    } else {
      before = target.order;
      if (changedIdx < sortedPosts.length - 1) after = sortedPosts[changedIdx + 1].order;
    }

    const newKey = key8Factory.build(before, after);

    const newPost = { ...post, order: newKey };
    item.setData(newPost);
    dispatch(updatePost({ id: post.id, post: newPost }));
  };

  const recordCurrentPosition = (item) => {
    currentPosition.current = item.getPosition().top;
  };

  return (
    <MuuriComponent
      {...girdProps}
      onDragEnd={changeTargetKey}
      onDragStart={recordCurrentPosition}
      propsToData={({ post }) => post}
      sort="order:asc"
    >
      {children}
    </MuuriComponent>
  );
});

const girdProps = {
  dragEnabled: true,
  dragFixed: true,
  dragSortHeuristics: {
    sortInterval: 0,
  },
  dragContainer: document.body,
  dragAxis: 'y',

  // ClassNames
  containerClass: 'post-list-container',
  itemClass: 'post-list-item-outer',
  itemVisibleClass: 'post-list-item-outer-shown',
  itemHiddenClass: 'post-list-item-outer-hidden',
  itemPositioningClass: 'post-list-item-outer-positioning',
  itemDraggingClass: 'post-list-item-outer-dragging',
  itemReleasingClass: 'post-list-item-outer-releasing',
  itemPlaceholderClass: 'post-list-item-outer-placeholder',
};
