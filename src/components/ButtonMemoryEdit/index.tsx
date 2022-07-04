import React from 'react';
import { EditingPropTypes } from '../SectionMemory';
import './style.scss';

export default React.memo(({ editing, setEditing }: EditingPropTypes) => {
  const onClickEditButton = () => {
    setEditing((prev) => !prev);
  };

  return (
    <div className="component-button-memory-edit-wrapper">
      <button
        type="button"
        onClick={onClickEditButton}
      >
        {editing ? 'CANCEL' : 'EDIT'}
      </button>
    </div>
  );
});
