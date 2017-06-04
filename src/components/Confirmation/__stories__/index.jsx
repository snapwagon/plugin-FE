/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Confirmation from '../Confirmation.jsx';

storiesOf('Confirmation', module)
  .add('renders the component', () => (
    <Confirmation />
  ));
