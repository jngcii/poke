import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import MemoryList from '../MemoryList';
import './style.scss';
import useInput from '../../hooks/InputHook';
import { addMemory } from '../../redux/slices/memorySlice';
import { createMemory } from '../../redux/utils/objectCreator';
import { key8Factory } from '../../redux/utils/keyFactory';

export default React.memo(() => {
  const {
    default: { isMemoryOpen },
    memory: { memories },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const inputHooks = useInput('');
  const [editing, setEditing] = useState(false);

  const onClickEditButton = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputHooks.value.trim() !== '') {
      const key = memories.length === 0
        ? key8Factory.build()
        : key8Factory.build(memories[memories.length - 1].order);
      const newMemory = createMemory(key, inputHooks.value, true, null, 0);
      dispatch(addMemory(newMemory));
    }
    inputHooks.setValue('');
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

      <hr />

      <form
        onSubmit={onSubmit}
        className="component-memory-list-form"
      >
        <input
          value={inputHooks.value}
          onChange={inputHooks.onChangeValue}
          placeholder="SAVE YOUR MEMORY."
          className="component-memory-list-input"
        />
        <button
          type="submit"
          className="component-memory-list-submit"
        >
          ADD
        </button>
      </form>
    </div>
  );
});
