/* eslint-disable no-undef */

import React from 'react';
import { shallow } from 'enzyme';

import Spinner from '../Spinner.jsx';

describe('<Spinner /> snapshots', () => {
  test('renderered as a large <Spinner />', () => {
    const tree = shallow(<Spinner />);
    expect(tree).toMatchSnapshot();
  });

  test('rendered as a small <Spinner />', () => {
    const tree = shallow(<Spinner size={20} />);
    expect(tree).toMatchSnapshot();
  });
});
