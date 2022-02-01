import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import MemoryList from '../MemoryList';
import './style.scss';

export default React.memo(() => {
  const { isMemoryOpen } = useSelector((state: RootState) => state.default);
  const [editing, setEditing] = useState(false);

  const onClickEditButton = () => {
    setEditing((prev) => !prev);
  };

  useEffect(() => {
    if (!isMemoryOpen) setEditing(false);
  }, [isMemoryOpen]);

  return (
    <div className="component-memory-list-wrapper">
      <button
        type="button"
        onClick={onClickEditButton}
      >
        {editing ? 'CANCEL' : 'EDIT'}
      </button>
      <MemoryList editing={editing} />
    </div>
  );
});
