import React, { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MuuriComponent } from 'muuri-react';
import { key8Factory } from '../../redux/utils/keyFactory';
import gridItemReplacer from '../../redux/utils/gridItemReplacer';
import { updateMemory } from '../../redux/slices/memorySlice';

export default React.memo(({ children, parent }) => {
  const hasParent = !!parent;
  const parentId = hasParent ? parent.id : '0';

  const { memories } = useSelector((state) => state.memory);
  const dispatch = useDispatch();

  const sortedMemories = useMemo(
    () => (memories.length > 1
      ? [...memories].filter(
        (it) => it.parentId === parentId && it.fixed,
      ).sort(
        (before, after) => key8Factory.compare(before.order, after.order),
      ) : [...memories].filter((it) => it.parentId === parentId && it.fixed)),
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
      {...getGridProps(hasParent)}
      onDragEnd={changeTargetKey}
      onDragStart={recordCurrentPosition}
      propsToData={({ memory }) => memory}
      sort="order:asc"
    >
      {children}
    </MuuriComponent>
  );
});

const getGridProps = (hasParent) => {
  const prefix = hasParent ? 'child' : 'parent';

  return {
    dragEnabled: true,
    dragFixed: true,
    dragSortHeuristics: {
      sortInterval: 0,
    },
    dragAxis: 'y',

    // ClassNames
    containerClass: `component-memory-${prefix}-list-container`,
    itemClass: `component-memory-${prefix}-item-outer`,
    itemVisibleClass: `component-memory-${prefix}-item-outer-shown`,
    itemHiddenClass: `component-memory-${prefix}-item-outer-hidden`,
    itemPositioningClass: `component-memory-${prefix}-item-outer-positioning`,
    itemDraggingClass: `component-memory-${prefix}-item-outer-dragging`,
    itemReleasingClass: `component-memory-${prefix}-item-outer-releasing`,
    itemPlaceholderClass: `component-memory-${prefix}-item-outer-placeholder`,
  };
};
