/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';

import Cards from '../Cards';
import Header from '../../Header/Header.jsx';

describe('<Cards /> snapshots', () => {
  test('rendered with required props', () => {
    const tree = renderer.create(
      <Cards>
        <Header classNames="coup-Cards__header" text="Also Available:" />
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
