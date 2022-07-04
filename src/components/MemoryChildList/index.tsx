import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDraggable } from 'muuri-react';
import { RootState } from '../../redux/store';
import { Memory } from '../../types/object';
import MemoryGrid from '../MemoryGrid';
import FormMemoryAdd from '../FormMemoryAdd';
import { createInitialItemByMemory, createItemByMemory } from '../../redux/utils/objectCreator';
import { key8Factory } from '../../redux/utils/keyFactory';
import { addItem } from '../../redux/slices/itemSlice';
import { addSelectedMemory, removeSelectedMemory } from '../../redux/slices/memorySlice';
import './style.scss';

export default React.memo(({ parent, editing, visible }: MemoryChildListPropTypes) => {
  const { memories } = useSelector((state: RootState) => state.memory);

  const children = memories
    .filter((it) => it.parentId === parent.id)
    .map((it) => <MemoryChildItem key={it.id} memory={it} editing={editing} />);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const grid = <MemoryGrid parent={parent}>{children}</MemoryGrid>;

  return visible ? (
    <div className="component-memory-child-list-container">
      {grid}

      <FormMemoryAdd parent={parent} />
    </div>
  ) : <div />;
});

const MemoryChildItem = React.memo(({ memory, editing }: MemoryProps) => {
  const draggable = useDraggable();

  useEffect(() => {
    draggable(false);
  }, []);
  const toggleDraggable = (drag: boolean) => draggable(drag);

  return (
    <div className="component-memory-child-item-wrapper">
      <div className="component-memory-child-item-inner">
        {editing
          ? <MemoryChildSelect memory={memory} editing={editing} />
          : <MemoryChildPick memory={memory} editing={editing} />}

        <div className="component-memory-child-item">
          <MemoryChildContent memory={memory} editing={editing} />
          {!editing && <MemoryChildDragger toggleDraggable={toggleDraggable} />}
        </div>
      </div>
    </div>
  );
});

const MemoryChildPick = React.memo(({ memory, editing }: MemoryProps) => {
  const {
    post: { currentPost },
    item: { items },
    memory: { memories, pickable },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const onPick = () => {
    const filteredItems = items.filter((it) => it.postId === currentPost.id);

    const parent = memories.find((it) => it.id === memory.parentId);
    const prefix = !parent ? '' : `${parent.content} > `;

    let newItem;

    if (filteredItems.length === 0) {
      newItem = createInitialItemByMemory(currentPost.id, `${prefix}${memory.content}`, memory);
    } else {
      const sortedItems = filteredItems.length === 1
        ? filteredItems
        : filteredItems.sort((before, after) => key8Factory.compare(before.order, after.order));
      const lastItem = sortedItems[sortedItems.length - 1];
      const newOrder = key8Factory.build(lastItem.order, undefined);
      newItem = createItemByMemory(newOrder, currentPost.id, `${prefix}${memory.content}`, memory);
    }

    dispatch(addItem(newItem));
  };

  return (
    <div className={`component-memory-child-item-pick ${pickable ? 'pickable' : 'non-pickable'}`}>
      <div className="component-memory-child-item-pick-button" onClick={onPick} />
    </div>
  );
});

const MemoryChildSelect = React.memo(({ memory, editing }: MemoryProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();

  const onSelect = () => {
    setIsSelected((prev) => !prev);
  };

  useEffect(() => {
    const action = isSelected ? addSelectedMemory(memory) : removeSelectedMemory(memory);
    dispatch(action);

    console.log(`Clicked! : ${isSelected}`);
  }, [isSelected]);

  return (
    <div className="component-memory-child-item-select">
      <input type="checkbox" onChange={onSelect} checked={isSelected} />
    </div>
  );
});

const MemoryChildContent = React.memo(({ memory, editing }: MemoryProps) => (
  <div className="component-memory-child-item-content">
    <strong>{memory.content}</strong>
  </div>
));

const MemoryChildDragger = React.memo(({ toggleDraggable }: DraggerProps) => {
  const enableDrag = () => toggleDraggable(true);
  const disableDrag = () => toggleDraggable(false);

  return (
    <div
      className="component-memory-child-item-dragger"
      onMouseOver={enableDrag}
      onMouseLeave={disableDrag}
    />
  );
});

type MemoryChildListPropTypes = { parent: Memory, editing: boolean, visible: boolean };
type MemoryProps = { memory: Memory, editing: boolean };
type DraggerProps = { toggleDraggable: (drag: boolean) => void };
