import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useDraggable, useRefresh } from 'muuri-react';
import { RootState } from '../../redux/store';
import { Memory } from '../../types/object';
import MemoryParentGrid from '../MemoryParentGrid';
import './style.scss';
import MemoryChildList from '../MemoryChildList';

export default React.memo(({ editing }: EditingProps) => {
  const [currentMemories, setCurrentMemories] = useState([]);

  const {
    memory: { memories },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    setCurrentMemories(memories.filter((it) => it.parentId === '0'));
  }, [memories]);

  const children = useMemo(() => currentMemories.map((memory) => (
    <MemoryParentItem key={memory.id} memory={memory} editing={editing} />
  )), [currentMemories, editing]);

  return currentMemories.length > 0 ? (
    <MemoryParentGrid>
      {children}
    </MemoryParentGrid>
  ) : <MemoryParentEmpty />;
});

const MemoryParentEmpty = React.memo(() => (
  <div className="component-memory-parent-empty-list" />
));

const MemoryParentItem = React.memo(({ memory, editing }: MemoryProps) => {
  const {
    memory: { memories, selectable },
  } = useSelector((state: RootState) => state);
  const [childrenVisible, setChildrenVisible] = useState(false);
  const [height, setHeight] = useState(undefined);

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
  }, [childrenVisible]);

  useEffect(() => {
    if (selectable) setChildrenVisible(true);
  }, [selectable]);

  const toggleDraggable = (drag: boolean) => draggable(drag);

  const toggleChildrenVisible = () => {
    setChildrenVisible((prev) => !prev);
  };

  const outerStyle = {
    position: 'absolute',
    width: '100%',
    height,
  };

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <div style={outerStyle}>
      <div className="component-memory-parent-item-inner">
        <div className={`component-memory-parent-item-select ${selectable ? 'selectable' : 'non-selectable'}`}>
          <div className="component-memory-parent-item-select-button" onClick={() => console.log('')} />
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
