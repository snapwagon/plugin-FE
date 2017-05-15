/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';

import BaseContainer from '../BaseContainer.jsx';

describe('<BaseContainer /> snapshots', () => {
  test('renders', () => {
    const tree = renderer.create(<BaseContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

