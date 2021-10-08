import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import MainHeader from '../../src/components/MainHeader';

configure({ adapter: new Adapter() });
test('MainHeader 컴퍼넌트 렌더링 테스트', () => {
  const component = shallow(<MainHeader />);

  expect(component).toMatchInlineSnapshot(`
<div
  className="component-mainheader-wrapper"
>
  <h1>
    POKE
  </h1>
  <h4>
    checklist for everyone
  </h4>
</div>
`);

});
