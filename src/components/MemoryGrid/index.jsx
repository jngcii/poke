import React, { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MuuriComponent } from 'muuri-react';
import { key8Factory } from '../../redux/utils/keyFactory';
import gridItemReplacer from '../../redux/utils/gridItemReplacer';
import { updateMemory } from '../../redux/slices/memorySlice';

export default React.memo(({ children }) => {
  const { memories } = useSelector((state) => state.memory);
  const dispatch = useDispatch();

  const sortedMemories = useMemo(
    () => (memories.length > 1
      ? [...memories].sort((before, after) => key8Factory.compare(before.order, after.order))
      : [...memories]),
    [memories],
  );

  const currentPosition = useRef(0);

  const changeTargetKey = (item) => {
    const replacedMemory = gridItemReplacer.replace(item, currentPosition, sortedMemories);
    if (!replacedMemory) return;
    item.setData(replacedMemory);
    dispatch(updateMemory({ id: replacedMemory.id, memory: replacedMemory }));
  };

  const recordCurrentPosition = (item) => {
    currentPosition.current = item.getPosition().top;
  };

  return (
    <MuuriComponent
      {...gridProps}
      onDragEnd={changeTargetKey}
      onDragStart={recordCurrentPosition}
      propsToData={({ memory }) => memory}
      sort="order:asc"
    >
      {children}
    </MuuriComponent>
  );
});

const gridProps = {
  dragEnabled: true,
  dragFixed: true,
  dragSortHeuristics: {
    sortInterval: 0,
  },
  dragAxis: 'y',

  // ClassNames
  containerClass: 'component-memory-list-container',
  itemClass: 'component-memory-item-outer',
  itemVisibleClass: 'component-memory-item-outer-shown',
  itemHiddenClass: 'component-memory-item-outer-hidden',
  itemPositioningClass: 'component-memory-item-outer-positioning',
  itemDraggingClass: 'component-memory-item-outer-dragging',
  itemReleasingClass: 'component-memory-item-outer-releasing',
  itemPlaceholderClass: 'component-memory-item-outer-placeholder',
};
