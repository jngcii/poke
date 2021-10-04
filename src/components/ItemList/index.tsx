import React from 'react';
import { useDispatch } from 'react-redux';
import { checkItem } from '../../redux/slices/itemSlice';
import './style.scss';
import { Item as ItemInterface } from '../../types/object';

export default React.memo(({ items }: ItemsProps) => {
  const children = items.map((item) => <Item key={item.id} item={item} />);

  return <div className="component-item-list">{children}</div>;
});

const Item = React.memo((props: ItemProp) => (
  <div className="component-item">
    <ItemCheckbox {...props} />
    <ItemContent {...props} />
    <ItemDragger />
  </div>
));

const ItemCheckbox = React.memo(({ item }: ItemProp) => {
  const dispatch = useDispatch();

  const className = item.isDone ? 'component-item-checkbox done' : 'component-item-checkbox';

  const onCheck = () => dispatch(checkItem(item.id));

  return (
    <button
      className={className}
      type="button"
      aria-label="Check"
      onClick={onCheck}
    />
  );
});

const ItemContent = React.memo(({ item }: ItemProp) => <div className="component-item-content">{item.content}</div>);

const ItemDragger = React.memo(() => <div className="component-item-dragger" />);

type ItemsProps = { items: ItemInterface[] }
type ItemProp = { item: ItemInterface }
