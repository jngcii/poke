import React from 'react';
import renderer from 'react-test-renderer';
import MainHeader from '../../src/components/MainHeader';

test('MainHeader 컴퍼넌트 렌더링 테스트', () => {
  const component = renderer.create(
    <MainHeader />,
  );
  let tree;

  tree = component.toJSON();
  expect(tree).toMatchInlineSnapshot(`
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
