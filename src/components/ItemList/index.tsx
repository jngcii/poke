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

  // 리렌더링 될 때 text가 비어있다 : 새로 생긴 ItemContent 컴퍼넌트다
  // 그때는 input에 포커싱이 된다.
  useEffect(() => {
    if (!text || !text.trim()) {
      inputRef.current.focus();
    }
  }, []);

  const onEnter = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      // enter 시 현재 ItemContent의 text가 비어있으면 취소와 같은 동작을 한다.
      // = 현재 ItemContent 제거!
      if (!text || !text.trim()) {
        dispatch(removeItem(item.id));
        return;
      }

      // 전체 items 중 현재 ItemContent의 위치를 찾는다.
      const sortedOrders = items.map((it) => it.order).sort((a, b) => key8Factory.compare(a, b));
      const itemIndex = sortedOrders.indexOf(item.order);
      // 만약 마지막이라면 현재 다음 순서가 없기에 현재와 다음 사이에 껴넣을수 없다는 것이고, 그래서 nextOrder를 undefined로 설정한다.
      const nextOrder = itemIndex === items.length - 1 ? undefined : sortedOrders[itemIndex + 1];
      const newOrder = key8Factory.build(item.order, nextOrder);
      const newItem = createItem(newOrder, item.postId, '', false);
      // dispatch하면 store.item.items state에 하나가 추가되면서 Post가 리렌더링되고,
      // 결국 ItemList 및 ItemContent도 리렌더링된다.
      // (이때 새로생긴 ItemContent는 text가 없기 때문에 input focusing된다.)
      dispatch(addItem(newItem));
    }
  }, [items]);

  const onChangeText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

    e.preventDefault();
  }, [text]);

  // Blur 당시 Item이 빈문자가 아닐 때에만 Item Update Dispatch
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
        onKeyDown={onEnter}
        onChange={onChangeText}
        onBlur={onBlur}
      />
    </div>
  );
});

/**
 * Drag를 언제 할수 있는지는 조금더 고민해보고 기능 리팩터링 가능
 * e.g. hover를 오래하고 있으면 drag 안내말풍선 + 롱클릭하면 드래그 시작처럼 가능
 */
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
