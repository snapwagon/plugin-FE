/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Button from '../Button.jsx';

const Buttons = ({ itemStyle }) => (
  <div>
    <Button
      onClick={action('onClick')}
      type="small"
      customStyle={itemStyle}
    />
    <br customStyle={{ padding: '5px 0' }} />
    <Button
      onClick={action('onClick')}
      type="medium"
      customStyle={itemStyle}
    />
    <br />
    <Button
      onClick={action('onClick')}
      type="large"
      customStyle={itemStyle}
    />
    <br />
    <Button
      onClick={action('onClick')}
      type="full"
      customStyle={itemStyle}
    />
    <br />
    <Button
      onClick={action('onClick')}
      isDisabled={true}
      type="full"
      customStyle={itemStyle}
    />
  </div>
);

storiesOf('Button', module)
  .addWithInfo('a <Button />', () => <Button />)
  .addWithInfo('an orange <Button /> of all types', () => (
    <Buttons itemStyle={{
      background: '#eee',
      color: '#fff'
    }}
    />
  ))
  .addWithInfo('a blue <Button /> of all types', () => (
    <Buttons itemStyle={{
      background: 'blue',
      color: '#fff'
    }}
    />
  ))
  .addWithInfo('a white <Button /> of all types', () => (
    <Buttons itemStyle={{
      background: 'crimson',
      color: '#fff'
    }}
    />
  ));
