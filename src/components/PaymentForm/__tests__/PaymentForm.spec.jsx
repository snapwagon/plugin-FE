/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';

import PaymentForm from '../PaymentForm.jsx';

describe('<PaymentForm /> snapshots', () => {
  test('renders', () => {
    const tree = renderer.create(<PaymentForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

