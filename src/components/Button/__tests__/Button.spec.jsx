/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';

import Button from '../Button.jsx';

describe('<Button /> snapshots', () => {
  test('renders', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

