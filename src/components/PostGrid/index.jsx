import React, { useRef } from 'react';
import { MuuriComponent } from 'muuri-react';

export default ({ posts, children }) => {
  const originKeyList = useRef(posts.map((it) => it.id));

  const changeTargetKey = (item) => {
    const key = item.getKey();

    const originIdx = originKeyList.current.indexOf(key);
    // eslint-disable-next-line no-underscore-dangle
    const rearrangedKeyList = item.getGrid()._items.map((it) => it._component.key);
    const changedIdx = rearrangedKeyList.indexOf(key);
    if (changedIdx === originIdx) {
      console.log('nothing happened!');
      return;
    }

    originKeyList.current = rearrangedKeyList;
    console.log(`originKeyList rearranged! : ${rearrangedKeyList}`);

    let before;
    let after;

    if (changedIdx > 0) {
      before = posts.find((post) => post.id === rearrangedKeyList[changedIdx - 1]).id;
      if (changedIdx < posts.length - 1) {
        after = posts.find((post) => post.id === rearrangedKeyList[changedIdx + 1]).id;
      }
    } else if (changedIdx < posts.length - 1) {
      after = posts.find((post) => post.id === rearrangedKeyList[changedIdx + 1]).id;
    }

    console.log(`before : ${before}`);
    console.log(`after : ${after}`);
  };

  return (
    <MuuriComponent
      {...girdProps}
      onDragEnd={changeTargetKey}
    >
      {children}
    </MuuriComponent>
  );
};

const girdProps = {
  dragEnabled: true,
  dragFixed: true,
  dragSortHeuristics: {
    sortInterval: 0,
  },
  dragContainer: document.body,
  dragAxis: 'y',

  // ClassNames
  containerClass: 'post-list-container',
  itemClass: 'post-list-item-outer',
  itemVisibleClass: 'post-list-item-outer-shown',
  itemHiddenClass: 'post-list-item-outer-hidden',
  itemPositioningClass: 'post-list-item-outer-positioning',
  itemDraggingClass: 'post-list-item-outer-dragging',
  itemReleasingClass: 'post-list-item-outer-releasing',
  itemPlaceholderClass: 'post-list-item-outer-placeholder',
};
