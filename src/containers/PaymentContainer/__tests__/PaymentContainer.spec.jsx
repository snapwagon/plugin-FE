/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';

import PaymentContainer from '../PaymentContainer.jsx';

describe('<PaymentContainer /> snapshots', () => {
  test('renders', () => {
    const tree = renderer.create(<PaymentContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

