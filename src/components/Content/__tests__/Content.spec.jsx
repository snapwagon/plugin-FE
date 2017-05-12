/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';

import Content from '../Content.jsx';

describe('<Content /> snapshots', () => {
  test('rendered with title, subtitle and tagline', () => {
    const tree = renderer.create(
      <Content
        title="Food"
        subtitle="Tastes goood"
        tagline="yupp"
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('rendered with title and subtitle', () => {
    const tree = renderer.create(
      <Content
        title="Food"
        subtitle="Tastes goood"
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

