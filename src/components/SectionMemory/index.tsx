import React, {
  Dispatch, FormEvent, SetStateAction, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import MemoryList from '../MemoryList';
import HeaderMemory from '../HeaderMemory';
import useInput from '../../hooks/InputHook';
import { addMemory } from '../../redux/slices/memorySlice';
import { createMemory } from '../../redux/utils/objectCreator';
import { key8Factory } from '../../redux/utils/keyFactory';
import { Memory } from '../../types/object';
import './style.scss';

export default React.memo(() => {
  const {
    default: { isMemoryOpen },
    memory: { memories, currentMemoryId },
  } = useSelector((state: RootState) => state);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!isMemoryOpen) setEditing(false);
  }, [isMemoryOpen]);

  const currentMemories = useMemo(
    () => memories.filter((it) => it.parentId === currentMemoryId),
    [memories, currentMemoryId],
  );

  const currentMemory = useMemo(
    () => memories.find((it) => it.id === currentMemoryId),
    [memories, currentMemoryId],
  );

  return isMemoryOpen ? (
    <div className="component-memory-list-wrapper">
      <HeaderMemory editing={editing} setEditing={setEditing} />

      <MemoryList editing={editing} />

      <hr />

      <NewMemoryForm memories={currentMemories} currentMemory={currentMemory} />
    </div>
  ) : <div />;
});

const NewMemoryForm = React.memo(({ memories, currentMemory }: NewMemoryFormPropTypes) => {
  const dispatch = useDispatch();
  const inputHooks = useInput('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputHooks.value.trim() !== '') {
      const key = memories.length === 0
        ? key8Factory.build()
        : key8Factory.build(memories[memories.length - 1].order);
      const newMemory = createMemory(
        key,
        inputHooks.value,
        true,
        currentMemory.id,
        currentMemory.level + 1,
      );
      dispatch(addMemory(newMemory));
    }
    inputHooks.setValue('');
  };

  return (
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
  );
});

export type EditingPropTypes = {
  editing: boolean,
  setEditing: Dispatch<SetStateAction<boolean>>,
};

type NewMemoryFormPropTypes = {
  memories: Memory[],
  currentMemory: Memory,
};
