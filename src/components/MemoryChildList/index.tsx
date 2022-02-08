import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Memory } from '../../types/object';
import './style.scss';

export default React.memo(({ parent, editing, visible }: MemoryChildListPropTypes) => {
  const { memories } = useSelector((state: RootState) => state.memory);

  const children = memories
    .filter((it) => it.parentId === parent.id)
    .map((it) => <MemoryChildItem key={it.id} child={it} />);

  return (
    <div className={`component-memory-child-list-wrapper ${!visible && 'invisible-display'}`}>
      {children}
    </div>
  );
});

const MemoryChildItem = React.memo(({ child }: MemoryChildItemPropTypes) => {
  const { selectable } = useSelector((state: RootState) => state.memory);

  return (
    <div className="component-memory-child-item-wrapper">
      <div className={`component-memory-child-item-select ${selectable ? 'selectable' : 'non-selectable'}`}>
        <div className="component-memory-child-item-select-button" onClick={() => console.log('')} />
      </div>
      {child.content}
    </div>
  );
});

type MemoryChildListPropTypes = {
  parent: Memory,
  editing: boolean,
  visible: boolean
};
type MemoryChildItemPropTypes = {
  child: Memory,
};
