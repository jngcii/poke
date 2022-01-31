import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createItem } from '../../src/redux/utils/objectCreator';
import { ItemCheckbox } from '../../src/components/ItemList';

configure({ adapter: new Adapter() });

describe('ItemCheckbox 렌더링 및 인터렉션 테스트', () => {
  let mockedItem = createItem('1', '1', 'sample', false);
  let mockedOnCheck = jest.fn(() => { mockedItem = {...mockedItem, done: !mockedItem.done }});

  test('스냅샷', () => {
    const component = shallow(<ItemCheckbox item={mockedItem} onCheck={mockedOnCheck}/>);

    expect(component).toMatchInlineSnapshot(`
<button
  aria-label="Check"
  className="component-item-checkbox"
  onClick={[Function]}
  type="button"
/>
`);
  });

  test('클릭 전 상태 테스트', () => {
    const component = shallow(<ItemCheckbox item={mockedItem} onCheck={mockedOnCheck}/>);

    expect(mockedItem.done).toBe(false);
    expect(component.find('button').hasClass('done')).toBe(false);

  });

  test('클릭 후 상태 테스트', () => {
    const component = mount(<ItemCheckbox item={mockedItem} onCheck={mockedOnCheck}/>);

    component.find('button').simulate('click');
    expect(mockedOnCheck.mock.calls.length).toBe(1);
    expect(mockedItem.done).toBe(true);
    expect(component.find('button').hasClass('done')).toBe(true);
  });
});
