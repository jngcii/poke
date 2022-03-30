import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { Memory } from '../../types/object';
import { RootState } from '../../redux/store';
import './style.scss';

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

  const onFix = () => {
    console.log('fix toggled.');
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
