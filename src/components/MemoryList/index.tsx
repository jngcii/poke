import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDraggable } from 'muuri-react';
import { RootState } from '../../redux/store';
import { setCurrentMemoryId } from '../../redux/slices/memorySlice';
import { Memory } from '../../types/object';
import MemoryGrid from '../MemoryGrid';
import './style.scss';

export default React.memo(({ editing }: EditingProps) => {
  const [currentMemories, setCurrentMemories] = useState([]);

  const {
    memory: { memories, currentMemoryId },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    setCurrentMemories(memories.filter((it) => it.parentId === currentMemoryId));
  }, [memories, currentMemoryId]);

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

const MemoryItem = React.memo(({ memory, editing }: MemoryProps) => (
  <div className="component-memory-item-outer">
    <div className="component-memory-item-inner">
      <MemoryContent memory={memory} editing={editing} />
      {editing && <MemoryDragger />}
    </div>
  </div>
));

const MemoryContent = React.memo(({ memory, editing }: MemoryProps) => {
  const dispatch = useDispatch();
  const onClick = useCallback((e) => {
    e.preventDefault();
    // todo : level limit 상수화
    if (memory.level < 3) {
      dispatch(setCurrentMemoryId(memory.id));
    }
  }, [memory]);

  return (
    <div
      className="component-memory-item-content"
      onClick={onClick}
    >
      <strong>{memory.content}</strong>
    </div>
  );
});

const MemoryDragger = React.memo(() => {
  const draggable = useDraggable();

  useEffect(() => {
    draggable(false);
  }, []);

  const enableDrag = () => draggable(true);
  const disableDrag = () => draggable(false);

  return (
    <div
      className="component-memory-item-dragger"
      onMouseOver={enableDrag}
      onMouseLeave={disableDrag}
    />
  );
});

type EditingProps = { editing: boolean };
type MemoryProps = { memory: Memory, editing: boolean };
