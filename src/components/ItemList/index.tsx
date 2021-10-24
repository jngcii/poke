import React, {
  ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDraggable } from 'muuri-react';
import {
  addItem, checkItem, removeItem, updateItem,
} from '../../redux/slices/itemSlice';
import { Item as ItemInterface } from '../../types/object';
import './style.scss';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ItemGrid from '../ItemGrid';
import { RootState } from '../../redux/store';
import { key8Factory } from '../../redux/utils/keyFactory';
import { createItem } from '../../redux/utils/objectCreator';

export default React.memo(({ items }: ItemsProps) => {
  const children = items.map((item) => <Item key={item.id} item={item} />);

  return <ItemGrid>{children}</ItemGrid>;
});

const Item = React.memo(({ item }: ItemProp) => {
  const dispatch = useDispatch();
  const onCheck = () => dispatch(checkItem(item.id));

  return (
    <div className="item-outer">
      <div className="item-inner">
        <ItemCheckbox item={item} onCheck={onCheck} />
        <ItemContent item={item} />
        <ItemDragger />
      </div>
    </div>
  );
});

export const ItemCheckbox = React.memo(({ item, onCheck }: ItemCheckboxProp) => {
  const [isDone, setIsDone] = useState(item.isDone);

  const onClick = useCallback(() => {
    setIsDone((prev) => !prev);
    onCheck();
  }, []);

  return (
    <button
      className={isDone ? 'component-item-checkbox done' : 'component-item-checkbox'}
      type="button"
      aria-label="Check"
      onClick={onClick}
    />
  );
});

const ItemContent = React.memo(({ item }: ItemProp) => {
  const [text, setText] = useState(item.content);
  const inputRef = useRef(null);
  const { items } = useSelector((state: RootState) => state.item);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!text || !text.trim()) {
      inputRef.current.focus();
    }
  }, []);

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const sortedOrders = items.map((it) => it.order).sort((a, b) => key8Factory.compare(a, b));
      const itemIndex = sortedOrders.indexOf(item.order);
      const nextOrder = itemIndex === items.length - 1 ? undefined : sortedOrders[itemIndex + 1];
      const newOrder = key8Factory.build(item.order, nextOrder);
      const newItem = createItem(newOrder, item.postId, '', false);
      dispatch(addItem(newItem));
    }
  }, [items]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

    e.preventDefault();
  }, [text]);

  const onBlur = useCallback(() => {
    if (!text || !text.trim()) {
      dispatch(removeItem(item.id));
    } else {
      const newItem = { ...item, content: text };
      dispatch(updateItem({ id: item.id, item: newItem }));
    }
  }, [item, text]);

  return (
    <div className="component-item-content">
      <input
        ref={inputRef}
        value={text}
        onKeyDown={onKeyDown}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
});

const ItemDragger = React.memo(() => {
  const draggable = useDraggable();

  useEffect(() => {
    draggable(false);
  }, []);

  const enableDrag = () => draggable(true);
  const disableDrag = () => draggable(false);

  return (
    <div
      className="component-item-dragger"
      onMouseOver={enableDrag}
      onMouseLeave={disableDrag}
    />
  );
});

type ItemsProps = { items: ItemInterface[] }
type ItemProp = { item: ItemInterface }
type ItemCheckboxProp = { item: ItemInterface, onCheck: () => void }
