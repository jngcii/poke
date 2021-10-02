import React from 'react';
import { useDispatch } from 'react-redux';
import { checkItem } from '../../redux/slices/itemSlice';
import './style.scss';

export default React.memo(({ items }) => {
  const children = items.map((item) => <Item key={item.id} item={item} />);

  return <div className="component-item-list">{children}</div>;
});

const Item = React.memo((props) => (
  <div className="component-item">
    <ItemCheckbox {...props} />
    <ItemContent {...props} />
    <ItemDragger {...props} />
  </div>
));

const ItemCheckbox = React.memo(({ item }) => {
  const dispatch = useDispatch();

  const onCheck = () => dispatch(checkItem({ itemId: item.id }));

  return (
    <div
      className="component-item-checkbox"
      isdone={`${item.isDone}`}
      onClick={onCheck}
    />
  );
});

const ItemContent = React.memo(({ item }) => <div className="component-item-content">{item.content}</div>);

const ItemDragger = React.memo(() => <div className="component-item-dragger" />);
