/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';

import Cards from '../Cards';

describe('<Cards /> snapshots', () => {
  test('rendered with required props', () => {
    const tree = renderer.create(
      <Cards>
        <div>Aye</div>
      </Cards>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('rendered with props', () => {
    const tree = renderer.create(
      <Cards oreientation="column">
        <div>Hello?</div>
      </Cards>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
