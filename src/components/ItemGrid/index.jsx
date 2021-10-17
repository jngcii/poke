import React from 'react';
import { MuuriComponent } from 'muuri-react';

export default React.memo(({ children }) => {
  console.log('');

  return (
    <MuuriComponent
      {...girdProps}
      propsToData={({ item }) => item}
      sort="id:asc"
    >
      {children}
    </MuuriComponent>
  );
});

const girdProps = {
  dragEnabled: true,
  dragFixed: true,
  dragSortHeuristics: {
    sortInterval: 0,
  },
  dragContainer: document.body,
  dragAxis: 'y',

  // ClassNames
  containerClass: 'item-list-container',
  itemClass: 'item-outer',
  itemVisibleClass: 'item-outer-shown',
  itemHiddenClass: 'item-outer-hidden',
  itemPositioningClass: 'item-outer-positioning',
  itemDraggingClass: 'item-outer-dragging',
  itemReleasingClass: 'item-outer-releasing',
  itemPlaceholderClass: 'item-outer-placeholder',
};
