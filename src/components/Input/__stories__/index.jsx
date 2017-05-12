/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Input from '../Input.jsx';

storiesOf('Input', module)
  .add('renders the component', () => (
    <Input />
  ));
