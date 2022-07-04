import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSelectedMemories } from '../../redux/slices/memorySlice';
import { RootState } from '../../redux/store';
import './style.scss';

export default React.memo(() => {
  const { memory: { selectedMemories } } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const disabled = useMemo(() => selectedMemories.length === 0,
    [selectedMemories]);

  const onClickDeleteButton = () => {
    dispatch(removeSelectedMemories());
  };

  return (
    <div className="component-button-memory-delete-wrapper">
      <button type="button" onClick={onClickDeleteButton} disabled={disabled}>
        DELETE
      </button>
    </div>
  );
});
