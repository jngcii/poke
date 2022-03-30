import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Memory } from '../../types/object';
import './style.scss';
import { createInitialItemByMemory, createItemByMemory } from '../../redux/utils/objectCreator';
import { key8Factory } from '../../redux/utils/keyFactory';
import { addItem } from '../../redux/slices/itemSlice';

export default React.memo(({ parent, editing, visible }: MemoryChildListPropTypes) => {
  const { memories } = useSelector((state: RootState) => state.memory);

  const children = memories
    .filter((it) => it.parentId === parent.id)
    .map((it) => <MemoryChildItem key={it.id} child={it} />);

  return (
    <div className={`component-memory-child-list-wrapper ${!visible && 'invisible-display'}`}>
      {children}
    </div>
  );
});

const MemoryChildItem = React.memo(({ child }: MemoryChildItemPropTypes) => {
  const {
    post: { currentPost },
    item: { items },
    memory: { memories, selectable },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const onSelect = () => {
    const filteredItems = items.filter((it) => it.postId === currentPost.id);

    const parent = memories.find((it) => it.id === child.parentId);
    const prefix = !parent ? '' : `${parent.content} > `;

    let newItem;

    if (filteredItems.length === 0) {
      newItem = createInitialItemByMemory(currentPost.id, `${prefix}${child.content}`, child);
    } else {
      const sortedItems = filteredItems.length === 1
        ? filteredItems
        : filteredItems.sort((before, after) => key8Factory.compare(before.order, after.order));
      const lastItem = sortedItems[sortedItems.length - 1];
      const newOrder = key8Factory.build(lastItem.order, undefined);
      newItem = createItemByMemory(newOrder, currentPost.id, `${prefix}${child.content}`, child);
    }

    dispatch(addItem(newItem));
  };

  return (
    <div className="component-memory-child-item-wrapper">
      <div className={`component-memory-child-item-select ${selectable ? 'selectable' : 'non-selectable'}`}>
        <div className="component-memory-child-item-select-button" onClick={onSelect} />
      </div>
      {child.content}
    </div>
  );
});

type MemoryChildListPropTypes = {
  parent: Memory,
  editing: boolean,
  visible: boolean
};
type MemoryChildItemPropTypes = {
  child: Memory,
};
