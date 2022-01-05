import React, { useMemo, useRef } from 'react';
import { MuuriComponent } from 'muuri-react';
import { useDispatch, useSelector } from 'react-redux';
import { key8Factory } from '../../redux/utils/keyFactory';
import { updateItem } from '../../redux/slices/itemSlice';
import gridItemReplacer from '../../redux/utils/gridItemReplacer';

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
    // item : MuuriComponent의 OnDragEnd 첫번째 파라미터로 주어지는 객체
    const replacedItem = gridItemReplacer.replace(item, currentPosition, sortedItems);
    if (!replacedItem) return;
    item.setData(replacedItem);
    dispatch(updateItem({ id: replacedItem.id, item: replacedItem }));
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
