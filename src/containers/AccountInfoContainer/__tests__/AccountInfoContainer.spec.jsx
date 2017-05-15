/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';

import AccountInfoContainer from '../AccountInfoContainer.jsx';

describe('<AccountInfoContainer /> snapshots', () => {
  test('renders', () => {
    const tree = renderer.create(<AccountInfoContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

