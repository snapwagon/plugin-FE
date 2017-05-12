/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';

import Image from '../Image.jsx';

describe('<Image /> snapshots', () => {
  test('rendered with required props', () => {
    const tree = renderer.create(
      <Image
        alt="Pork & Cabbage Tacos"
        src="/image.png"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('rendered with all props', () => {
    const tree = renderer.create(
      <Image
        alt="Pork & Cabbage Tacos"
        classNames={{
          'my-Image': true,
          'my-NonImage': false
        }}
        src="/image.png"
        width="80%"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
