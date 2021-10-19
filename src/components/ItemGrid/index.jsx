import React, { useMemo, useRef } from 'react';
import { MuuriComponent } from 'muuri-react';
import { useDispatch, useSelector } from 'react-redux';
import { key8Factory } from '../../redux/utils/keyFactory';
import { updateItem } from '../../redux/slices/itemSlice';

export default React.memo(({ children }) => {
  const { item: { items }, post: { currentPost } } = useSelector((state) => state);
  const dispatch = useDispatch();

  const sortedItems = useMemo(
    () => {
      const currentItems = !currentPost ? [] : items.filter((it) => it.postId === currentPost.id);

      return (currentItems.length > 1
        ? currentItems.sort((before, after) => key8Factory.compare(before.order, after.order))
        : currentItems
      );
    }, [items, currentPost],
  );

  const currentPosition = useRef(0);

  const changeTargetKey = (item) => {
    const postItem = item.getData();
    const key = postItem.order;

    const position = item.getPosition().top;

    if (position === currentPosition.current) { return; }

    const margin = item.getMargin();
    const height = item.getHeight() + margin.top + margin.bottom;
    const changedIdx = position / height;

    const target = sortedItems[changedIdx];

    let before;
    let after;

    const isBiggerThanTarget = key8Factory.compare(key, target.order) > 0;

    // 아래 있던 것이 위로
    if (isBiggerThanTarget) {
      after = target.order;
      if (changedIdx > 0) before = sortedItems[changedIdx - 1].order;
      // 위에 있던 것이 아래로
    } else {
      before = target.order;
      if (changedIdx < sortedItems.length - 1) after = sortedItems[changedIdx + 1].order;
    }

    const newKey = key8Factory.build(before, after);

    const newItem = { ...postItem, order: newKey };
    item.setData(newItem);
    dispatch(updateItem({ id: postItem.id, item: newItem }));
  };

  const recordCurrentPosition = (item) => {
    currentPosition.current = item.getPosition().top;
  };

  return (
    <MuuriComponent
      {...girdProps}
      onDragEnd={changeTargetKey}
      onDragStart={recordCurrentPosition}
      propsToData={({ item }) => item}
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
  containerClass: 'item-list-container',
  itemClass: 'item-outer',
  itemVisibleClass: 'item-outer-shown',
  itemHiddenClass: 'item-outer-hidden',
  itemPositioningClass: 'item-outer-positioning',
  itemDraggingClass: 'item-outer-dragging',
  itemReleasingClass: 'item-outer-releasing',
  itemPlaceholderClass: 'item-outer-placeholder',
};
