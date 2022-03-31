import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDraggable, useRefresh } from 'muuri-react';
import { Memory } from '../../types/object';
import MemoryParentGrid from '../MemoryParentGrid';
import MemoryChildList from '../MemoryChildList';
import { key8Factory } from '../../redux/utils/keyFactory';
import { RootState } from '../../redux/store';
import { addItem } from '../../redux/slices/itemSlice';
import {
  createInitialItemByMemory,
  createItemByMemory,
} from '../../redux/utils/objectCreator';
import FormMemoryAdd from '../FormMemoryAdd';
import { rootMemory } from '../../redux/api/mockingRepository';
import './style.scss';

export default React.memo(({ editing }: EditingProps) => {
  const [currentMemories, setCurrentMemories] = useState([]);

  const {
    memory: { memories },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    setCurrentMemories(memories.filter((it) => it.parentId === '0' && it.fixed));
  }, [memories]);

  const children = useMemo(() => currentMemories.map((memory) => (
    <MemoryParentItem key={memory.id} memory={memory} editing={editing} />
  )), [currentMemories, editing]);

  return currentMemories.length > 0 ? (
    <div>
      <MemoryParentGrid>
        {children}
      </MemoryParentGrid>

      <FormMemoryAdd parent={rootMemory} />
    </div>
  ) : <MemoryParentEmpty />;
});

const MemoryParentEmpty = React.memo(() => (
  <div className="component-memory-parent-empty-list" />
));

const MemoryParentItem = React.memo(({ memory, editing }: MemoryProps) => {
  const {
    post: { currentPost },
    item: { items },
    memory: { memories, selectable },
  } = useSelector((state: RootState) => state);
  const [childrenVisible, setChildrenVisible] = useState(false);
  const [height, setHeight] = useState(undefined);
  const dispatch = useDispatch();

  const childrenContainerHeight = useMemo(() => {
    const count = memories.filter(
      (it) => it.parentId === memory.id,
    ).length;

    return (count + 2) * 50;
  }, [memories]);

  useRefresh([height]);
  const draggable = useDraggable();

  useEffect(() => {
    draggable(false);
  }, []);

  useEffect(() => {
    if (childrenVisible) {
      setHeight(childrenContainerHeight);
    } else {
      setHeight(undefined);
    }
  }, [childrenVisible, childrenContainerHeight]);

  const onSelect = () => {
    const filteredItems = items.filter((it) => it.postId === currentPost.id);

    const parent = memories.find((it) => it.id === memory.parentId);
    const prefix = (!parent || parent.id === '0') ? '' : `${parent.content} > `;

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

  const toggleDraggable = (drag: boolean) => draggable(drag);

  const toggleChildrenVisible = () => {
    setChildrenVisible((prev) => !prev);
  };

  const outerStyle = {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#aaa',
    height,
  };

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <div style={outerStyle}>
      <div className="component-memory-parent-item-inner">
        <div className={`component-memory-parent-item-select ${selectable ? 'selectable' : 'non-selectable'}`}>
          <div className="component-memory-parent-item-select-button" onClick={onSelect} />
        </div>
        <div className="component-memory-parent-item">
          <MemoryParentContent memory={memory} editing={editing} />
          <MemoryParentDragger editing={editing} toggleDraggable={toggleDraggable} />
          <button
            type="button"
            onClick={toggleChildrenVisible}
          >
            TOGGLE
          </button>
        </div>
      </div>
      <MemoryChildList
        parent={memory}
        editing={editing}
        visible={childrenVisible}
      />
    </div>
  );
});

const MemoryParentContent = React.memo(({ memory, editing }: MemoryProps) => (
  <div className="component-memory-parent-item-content">
    <strong>{memory.content}</strong>
  </div>
));

const MemoryParentDragger = React.memo(({ editing, toggleDraggable }: DraggerProps) => {
  const enableDrag = () => toggleDraggable(true);
  const disableDrag = () => toggleDraggable(false);

  return (
    <div
      className={`component-memory-parent-item-dragger ${!editing && 'invisible-display'}`}
      onMouseOver={enableDrag}
      onMouseLeave={disableDrag}
    />
  );
});

type EditingProps = { editing: boolean };
type MemoryProps = { memory: Memory, editing: boolean };
type DraggerProps = { editing: boolean, toggleDraggable: (drag: boolean) => void };
