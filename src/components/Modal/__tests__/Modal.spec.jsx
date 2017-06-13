/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';

import Modal from '../Modal.jsx';

describe('<Modal /> snapshots', () => {
  test('renders', () => {
    const tree = renderer.create(<Modal />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

