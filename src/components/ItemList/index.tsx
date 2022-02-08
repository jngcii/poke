import React, {
  KeyboardEvent, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDraggable } from 'muuri-react';
import {
  addItem, checkItem, removeItem, updateItem,
} from '../../redux/slices/itemSlice';
import { Item as ItemInterface, Post } from '../../types/object';
import ItemGrid from '../ItemGrid';
import { RootState } from '../../redux/store';
import { key8Factory } from '../../redux/utils/keyFactory';
import { createInitialItem, createItem } from '../../redux/utils/objectCreator';
import useInput, { InputHook } from '../../hooks/InputHook';
import './style.scss';
import { setSelectable } from '../../redux/slices/memorySlice';
import { toggleMemory } from '../../redux/slices/defaultSlice';

export default React.memo(({ post, items }: ItemsProps) => {
  const children = items.map((item) => <Item key={item.id} item={item} />);
  const dispatch = useDispatch();

  const sortedItems = useMemo(() => (
    items.length > 1
      ? items.sort((before, after) => key8Factory.compare(before.order, after.order))
      : items
  ), [items, post]);

  useEffect(() => {
    if (!!post.title.trim() && items.length === 0) {
      addEmptyItem();
    }
  }, [post.id]);

  const addEmptyItem = useCallback(() => {
    let newItem;
    if (sortedItems.length === 0) {
      newItem = createInitialItem(post.id);
    } else {
      const lastItem = sortedItems[sortedItems.length - 1];
      const newOrder = key8Factory.build(lastItem.order, undefined);
      newItem = createItem(newOrder, post.id, '', false);
    }
    dispatch(addItem(newItem));
  }, [post.id]);

  return (
    sortedItems.length > 0
      ? <ItemGrid>{children}</ItemGrid>
      : <EmptyContainer onClick={addEmptyItem} />
  );
});

const EmptyContainer = React.memo(({ onClick }: EmptyItemProps) => <div className="item-empty-container" onClick={onClick} />);

const Item = React.memo(({ item }: ItemProps) => {
  const inputHook = useInput(item.content);
  const dispatch = useDispatch();
  const onCheck = () => dispatch(checkItem(item.id));

  return (
    <div className="item-outer">
      <div className="item-inner">
        <ItemCheckbox item={item} onCheck={onCheck} />
        <ItemContent item={item} inputHook={inputHook} />
        <ItemDragger />
      </div>
    </div>
  );
});

export const ItemCheckbox = React.memo(({ item, onCheck }: ItemCheckboxProps) => {
  const [done, setDone] = useState(item.done);

  const onClick = useCallback(() => {
    setDone((prev) => !prev);
    onCheck();
  }, []);

  return (
    <button
      className={done ? 'component-item-checkbox done' : 'component-item-checkbox'}
      type="button"
      aria-label="Check"
      onClick={onClick}
    />
  );
});

const ItemContent = React.memo(({ item, inputHook }: ItemContentProps) => {
  const { value, ref, onChangeValue } = inputHook;
  const {
    item: { items },
    memory: { selectable },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  // 리렌더링 될 때 text가 비어있다 : 새로 생긴 ItemContent 컴퍼넌트다
  // 그때는 input에 포커싱이 된다.
  useEffect(() => {
    if (!value || !value.trim()) {
      ref.current.focus();
    }
  }, []);

  const onEnter = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      // enter 시 현재 ItemContent의 text가 비어있으면 취소와 같은 동작을 한다.
      // = 현재 ItemContent 제거!
      if (!value || !value.trim()) {
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
  }, [items, value]);

  // Blur 당시 Item이 빈문자가 아닐 때에만 Item Update Dispatch
  const onBlur = useCallback(() => {
    dispatch(setSelectable(false));
    if (!value || !value.trim()) {
      dispatch(removeItem(item.id));
    } else {
      const newItem = { ...item, content: value };
      dispatch(updateItem({ id: item.id, item: newItem }));
    }
  }, [item, value]);

  const onFocus = () => {
    dispatch(toggleMemory(true));
    dispatch(setSelectable(true));
  };

  return (
    <div className="component-item-content">
      <input
        ref={ref}
        value={value}
        onKeyDown={onEnter}
        onChange={onChangeValue}
        onBlur={onBlur}
        onFocus={onFocus}
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

type ItemsProps = { post: Post, items: ItemInterface[] }
type EmptyItemProps = { onClick: () => void }
type ItemProps = { item: ItemInterface }
type ItemCheckboxProps = { item: ItemInterface, onCheck: () => void }
type ItemContentProps = { item: ItemInterface, inputHook: InputHook }
