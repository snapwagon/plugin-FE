/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';

import Input from '../Input.jsx';

describe('<Input /> snapshots', () => {
  test('renders', () => {
    const tree = renderer.create(<Input />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

