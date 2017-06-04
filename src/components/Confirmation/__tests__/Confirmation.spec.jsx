/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';

import Confirmation from '../Confirmation.jsx';

describe('<Confirmation /> snapshots', () => {
  test('renders', () => {
    const tree = renderer.create(<Confirmation />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

