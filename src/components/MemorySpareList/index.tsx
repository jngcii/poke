import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Memory } from '../../types/object';
import { RootState } from '../../redux/store';
import './style.scss';
import { key8Factory } from '../../redux/utils/keyFactory';
import { updateMemory } from '../../redux/slices/memorySlice';

export default React.memo(() => {
  const [currentMemories, setCurrentMemories] = useState([]);

  const {
    memory: { memories },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    setCurrentMemories(memories.filter((it) => !it.fixed));
  }, [memories]);

  const children = useMemo(() => currentMemories.map((memory) => (
    <MemorySpareItem key={memory.id} memory={memory} />
  )), [currentMemories]);

  return currentMemories.length > 0 ? <div>{children}</div> : <div />;
});

const MemorySpareItem = React.memo(({ memory }: MemoryProps) => {
  const {
    memory: { memories },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const onFix = () => {
    const fixedMemories = memories.filter((it) => it.fixed);

    let order;

    if (fixedMemories.length === 0) {
      order = key8Factory.build();
    } else {
      const sortedMemories = fixedMemories.length === 1
        ? fixedMemories
        : fixedMemories.sort((before, after) => key8Factory.compare(before.order, after.order));
      const lastMemory = sortedMemories[sortedMemories.length - 1];
      order = key8Factory.build(lastMemory.order, undefined);
    }

    const newMemory = { ...memory, order, fixed: true };
    dispatch(updateMemory({ id: memory.id, memory: newMemory }));
  };

  return (
    <div className="component-memory-spare-item">
      <div className="component-memory-spare-item-content">
        <strong>{memory.content}</strong>
      </div>
      <button
        type="button"
        onClick={onFix}
      >
        FIX
      </button>
    </div>
  );
});

type MemoryProps = { memory: Memory };
