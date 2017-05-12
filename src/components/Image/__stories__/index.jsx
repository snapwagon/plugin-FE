/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import mealImage from '__food__/images/ds-image.jpg';

import Image from '../Image';

storiesOf('Image', module)
  .addWithInfo('an <Image />', () => (
    <Image
      alt="Pork & Cabbage Tacos"
      src={mealImage}
    />
  ))
  .addWithInfo('an <Image /> in fixed-width parent', () => (
    <FixedWidth>
      <Image
        alt="Pork & Cabbage Tacos"
        src={mealImage}
      />
    </FixedWidth>
  ))
  .addWithInfo('an <Image /> with a custom classname', () => (
    <FixedWidth>
      <ScopedStyle rule=".my-Image { border: 4px solid magenta; }" />
      <Image
        alt="Pork & Cabbage Tacos"
        classNames="my-Image"
        src={mealImage}
      />
    </FixedWidth>
  ));

/* eslint-disable react/prop-types */

function FixedWidth({ children }) {
  return (
    <div
      style={{
        border: '2px solid #000',
        width: '300px',
        height: '350px',
        margin: '0 auto'
      }}
    >
      {children}
    </div>
  );
}

function ScopedStyle({ rule }) {
  return (
    <style type="text/css" scoped>
      {rule}
    </style>
  );
}
