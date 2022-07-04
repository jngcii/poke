import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import MemoryParentList from '../MemoryParentList';
import HeaderMemory from '../HeaderMemory';
import './style.scss';
import MemorySpareList from '../MemorySpareList';
import { clearSelectedMemories } from '../../redux/slices/memorySlice';

export default React.memo(() => {
  const {
    default: { isMemoryOpen },
  } = useSelector((state: RootState) => state);
  const [editing, setEditing] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMemoryOpen) {
      setTimeout(() => setVisible(true), 250);
    } else {
      setVisible(false);
    }
  }, [isMemoryOpen]);

  useEffect(() => {
    if (!editing) {
      dispatch(clearSelectedMemories());
    }
  }, [editing]);

  useEffect(() => {
    if (!isMemoryOpen) setEditing(false);
  }, [isMemoryOpen]);

  return visible ? (
    <div className="component-memory-list-wrapper">
      <HeaderMemory editing={editing} setEditing={setEditing} />

      <MemoryParentList editing={editing} />

      <MemorySpareList />
    </div>
  ) : <div />;
});

export type EditingPropTypes = {
  editing: boolean,
  setEditing: Dispatch<SetStateAction<boolean>>,
};
