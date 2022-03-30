import React, { FormEvent, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/InputHook';
import { key8Factory } from '../../redux/utils/keyFactory';
import { createMemory } from '../../redux/utils/objectCreator';
import { addMemory } from '../../redux/slices/memorySlice';
import { RootState } from '../../redux/store';
import { Memory } from '../../types/object';
import './style.scss';

export default React.memo(({ parent }: FormMemoryAddTypes) => {
  const { memory: { memories } } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const inputHooks = useInput('');

  const filteredMemories = useMemo(() => [...memories].filter(
    (it) => it.parentId === parent.id,
  ), [memories, parent]);

  const sortedMemories = useMemo(() => (filteredMemories.length > 1
    ? filteredMemories.sort((before, after) => key8Factory.compare(before.order, after.order))
    : filteredMemories),
  [filteredMemories]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputHooks.value.trim() !== '') {
      const order = sortedMemories.length === 0
        ? key8Factory.build()
        : key8Factory.build(sortedMemories[sortedMemories.length - 1].order);
      const newMemory = createMemory(
        order,
        inputHooks.value,
        true,
        parent.id,
        parent.level + 1,
      );
      dispatch(addMemory(newMemory));
    }
    inputHooks.setValue('');
  };

  return (
    <form
      onSubmit={onSubmit}
      className="component-form-memory-add"
    >
      <input
        value={inputHooks.value}
        onChange={inputHooks.onChangeValue}
        placeholder="Please enter..."
        className="component-form-memory-add-input"
      />
      <button
        type="submit"
        className="component-form-memory-add-submit"
      >
        ADD
      </button>
    </form>
  );
});

type FormMemoryAddTypes = {
  parent: Memory,
};
