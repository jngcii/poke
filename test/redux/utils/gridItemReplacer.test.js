import gridItemReplacer from '../../../src/redux/utils/gridItemReplacer';

describe('replace 된 item 반환 테스트', () => {

  const gridList = [
    { id: 1, name: 'peter', order: 'AAAAAAAA' }, // position : 0
    { id: 2, name: 'jngcii', order: 'BBBBBBBB' }, // position : 50 (10 + 30 + 10)
    { id: 3, name: 'hyungsoo', order: 'CCCCCCCC' } // position : 100
  ]

  let mockedGetData = jest.fn(() => ({ id: 1, name: 'peter', order: 'AAAAAAAA' }));
  let mockedGetMargin = jest.fn(() => ({ top: 10, bottom: 10 }));
  let mockedGetHeight = jest.fn(() => 30);

  test('non move', () => {
    // 기존 자리
    const currentPosition = { current : 0 };
    // 옮겨질 자리
    let mockedGetPosition = jest.fn(() => ({ top: 0 }));

    const gridItem = {
      getData: mockedGetData,
      getPosition: mockedGetPosition,
      getMargin: mockedGetMargin,
      getHeight: mockedGetHeight
    }

    const replacedItem = gridItemReplacer.replace(gridItem, currentPosition, gridList);

    expect(replacedItem).toBe(false)
  })

  test('one move', () => {
    // 기존 자리
    const currentPosition = { current : 0 };
    // 옮겨질 자리
    let mockedGetPosition = jest.fn(() => ({ top: 50 }));

    const gridItem = {
      getData: mockedGetData,
      getPosition: mockedGetPosition,
      getMargin: mockedGetMargin,
      getHeight: mockedGetHeight
    }

    const replacedItem = gridItemReplacer.replace(gridItem, currentPosition, gridList);

    expect(replacedItem.order).toEqual('Bggggggg');
  })

  test('two move', () => {
    // 기존 자리
    const currentPosition = { current : 0 };
    // 옮겨질 자리
    let mockedGetPosition = jest.fn(() => ({ top: 100 }));

    const gridItem = {
      getData: mockedGetData,
      getPosition: mockedGetPosition,
      getMargin: mockedGetMargin,
      getHeight: mockedGetHeight
    }

    const replacedItem = gridItemReplacer.replace(gridItem, currentPosition, gridList);

    expect(replacedItem.order).toEqual('CgCCCCCC');
  })

})
