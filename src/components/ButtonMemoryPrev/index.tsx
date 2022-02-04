import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setCurrentMemoryId } from '../../redux/slices/memorySlice';
import './style.scss';

export default React.memo(() => {
  const { currentMemoryId, memories } = useSelector((state: RootState) => state.memory);
  const dispatch = useDispatch();

  const currentMemory = useMemo(
    () => memories.find((it) => it.id === currentMemoryId),
    [memories, currentMemoryId],
  );

  const prevMemory = useMemo(() => {
    if (!currentMemory || !currentMemory.parentId) return undefined;

    return memories.find((it) => it.id === currentMemory.parentId);
  }, [memories, currentMemoryId]);

  const onClick = useCallback((e) => {
    e.preventDefault();
    const prevMemoryId = !prevMemory || !prevMemory.id ? '0' : prevMemory.id;
    dispatch(setCurrentMemoryId(prevMemoryId));
  }, [memories, currentMemoryId]);

  return (
    <div className="component-button-category-prev-wrapper">
      {!!prevMemory && <button type="button" onClick={onClick}>{prevMemory.content}</button>}
    </div>
  );
});
