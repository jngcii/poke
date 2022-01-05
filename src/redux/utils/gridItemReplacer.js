import { key8Factory } from './keyFactory';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function replace(gridItem, currentPosition, gridList) {
  const item = gridItem.getData();
  const key = item.order;

  const position = gridItem.getPosition().top;

  if (position === currentPosition.current) {
    return false;
  }

  const margin = gridItem.getMargin();
  const height = gridItem.getHeight() + margin.top + margin.bottom;
  const replacedIdx = position / height;

  // target : item이 옮겨지는 위치에 원래 있었던 item
  const target = gridList[replacedIdx];

  let before;
  let after;

  const isBiggerThanTarget = key8Factory.compare(key, target.order) > 0;

  // target이 더 위쪽에 있었을 경우 (item이 아래에서 위로)
  if (isBiggerThanTarget) {
    after = target.order;
    if (replacedIdx > 0) before = gridList[replacedIdx - 1].order;
  // target이 더 아래쪽에 있었을 경우 (item이 위에서 아래로)
  } else {
    before = target.order;
    if (replacedIdx < gridList.length - 1) after = gridList[replacedIdx + 1].order;
  }

  // eslint-disable-next-line consistent-return
  return { ...item, order: key8Factory.build(before, after) };
}

const gridItemReplacer = { replace };

export default gridItemReplacer;
