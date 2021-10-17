import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDraggable } from 'muuri-react';
import { checkItem } from '../../redux/slices/itemSlice';
import { Item as ItemInterface } from '../../types/object';
import ItemGrid from '../ItemGrid';
import './style.scss';

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

const ItemContent = React.memo(({ item }: ItemProp) => <div className="component-item-content">{item.content}</div>);

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
