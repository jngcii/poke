import React, { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MuuriComponent } from 'muuri-react';
import { key8Factory } from '../../redux/utils/keyFactory';
import { updatePost } from '../../redux/slices/postSlice';
import gridItemReplacer from '../../redux/utils/gridItemReplacer';

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
    // item : MuuriComponent의 onDragEnd 첫번째 파라미터로 주어지는 객체
    const replacedPost = gridItemReplacer.replace(item, currentPosition, sortedPosts);
    if (!replacedPost) return;
    item.setData(replacedPost);
    dispatch(updatePost({ id: replacedPost.id, post: replacedPost }));
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
