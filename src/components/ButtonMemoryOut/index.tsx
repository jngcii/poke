import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedMemories, updateMemoriesToTopLevel } from '../../redux/slices/memorySlice';
import { RootState } from '../../redux/store';
import { rootMemory } from '../../redux/api/mockingRepository';
import './style.scss';

export default React.memo(() => {
  const { memory: { selectedMemories } } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const disabled = useMemo(() => selectedMemories
    .filter((it) => it.parentId !== rootMemory.id).length <= 0,
  [selectedMemories]);

  const onClickOutButton = () => {
    dispatch(updateMemoriesToTopLevel());
    dispatch(clearSelectedMemories());
  };

  return (
    <div className="component-button-memory-out-wrapper">
      <button type="button" onClick={onClickOutButton} disabled={disabled}>
        OUT
      </button>
    </div>
  );
});
