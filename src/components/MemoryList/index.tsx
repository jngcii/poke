import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDraggable } from 'muuri-react';
import { RootState } from '../../redux/store';
import { Memory } from '../../types/object';
import MemoryGrid from '../MemoryGrid';
import './style.scss';

export default React.memo(({ editing }: EditingProps) => {
  const { memories } = useSelector((state: RootState) => state.memory);
  const children = memories.map((memory) => (
    <MemoryItem key={memory.id} memory={memory} editing={editing} />
  ));

  return (
    <MemoryGrid>
      {children}
    </MemoryGrid>
  );
});

const MemoryItem = React.memo(({ memory, editing }: MemoryProps) => (
  <div className="component-memory-item-outer">
    <div className="component-memory-item-inner">
      <MemoryContent memory={memory} editing={editing} />
      {editing && <MemoryDragger />}
    </div>
  </div>
));

const MemoryContent = React.memo(({ memory, editing }: MemoryProps) => (
  <div className="component-memory-item-content">
    <strong>{memory.content}</strong>
  </div>
));

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
