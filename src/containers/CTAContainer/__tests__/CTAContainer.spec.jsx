/* eslint-disable no-undef */

import React from 'react';
import { shallow } from 'enzyme';

import CTAContainer from '../CTAContainer.jsx';

describe('<CTAContainer /> snapshots', () => {
  test('renderered as a large <CTAContainer />', () => {
    const tree = shallow(<CTAContainer />);
    expect(tree).toMatchSnapshot();
  });

  test('rendered as a small <CTAContainer />', () => {
    const tree = shallow(<CTAContainer size={20} />);
    expect(tree).toMatchSnapshot();
  });
});
