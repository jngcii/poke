import React, { useMemo } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateInEditing } from '../../redux/slices/memorySlice';

export default React.memo(() => {
  const {
    memory: {
      memories,
      selectedMemories,
    },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const parentIds = useMemo(() => memories.map((it) => it.parentId), [memories]);

  const disabled = useMemo(() => {
    const parentWithChildren = selectedMemories.filter((it) => parentIds.includes(it.id));
    return selectedMemories.length === 0 || parentWithChildren.length > 0;
  },
  [selectedMemories]);

  const onClickInButton = () => {
    dispatch(updateInEditing());
  };

  return (
    <div className="component-button-memory-in-wrapper">
      <button type="button" onClick={onClickInButton} disabled={disabled}>
        IN
      </button>
    </div>
  );
});
