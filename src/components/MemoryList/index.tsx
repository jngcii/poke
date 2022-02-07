import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useDraggable, useRefresh } from 'muuri-react';
import { RootState } from '../../redux/store';
import { Memory } from '../../types/object';
import MemoryGrid from '../MemoryGrid';
import './style.scss';

export default React.memo(({ editing }: EditingProps) => {
  const [currentMemories, setCurrentMemories] = useState([]);

  const {
    memory: { memories },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    setCurrentMemories(memories.filter((it) => it.parentId === '0'));
  }, [memories]);

  const children = useMemo(() => currentMemories.map((memory) => (
    <MemoryItem key={memory.id} memory={memory} editing={editing} />
  )), [currentMemories, editing]);

  return currentMemories.length > 0 ? (
    <MemoryGrid>
      {children}
    </MemoryGrid>
  ) : <MemoryEmpty />;
});

const MemoryEmpty = React.memo(() => (
  <div className="component-memory-empty-list" />
));

const MemoryItem = React.memo(({ memory, editing }: MemoryProps) => {
  const {
    memory: { memories },
  } = useSelector((state: RootState) => state);
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

  const toggleDraggable = (drag: boolean) => draggable(drag);

  const toggleChildrenVisible = () => {
    if (height !== undefined) {
      setHeight(undefined);
    } else {
      setHeight(childrenContainerHeight);
    }
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
      <div className="component-memory-item-inner">
        <MemoryContent memory={memory} editing={editing} />
        <MemoryDragger editing={editing} toggleDraggable={toggleDraggable} />
        <button
          type="button"
          onClick={toggleChildrenVisible}
        >
          TOGGLE
        </button>
      </div>
    </div>
  );
});

const MemoryContent = React.memo(({ memory, editing }: MemoryProps) => (
  <div className="component-memory-item-content">
    <strong>{memory.content}</strong>
  </div>
));

const MemoryDragger = React.memo(({ editing, toggleDraggable }: DraggerProps) => {
  const enableDrag = () => toggleDraggable(true);
  const disableDrag = () => toggleDraggable(false);

  return (
    <div
      className={`component-memory-item-dragger ${!editing && 'invisible-display'}`}
      onMouseOver={enableDrag}
      onMouseLeave={disableDrag}
    />
  );
});

type EditingProps = { editing: boolean };
type MemoryProps = { memory: Memory, editing: boolean };
type DraggerProps = { editing: boolean, toggleDraggable: (drag: boolean) => void };
