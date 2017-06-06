/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Image from '../Image';

const mealImage = 'https://d2qs5c8ct3mfv5.cloudfront.net/images/standard_Business-4001-f7533f107822795023225e25b6f5dec8-Jumping.JPG';

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
