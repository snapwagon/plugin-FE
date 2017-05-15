/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import BaseContainer from '../BaseContainer.jsx';

storiesOf('BaseContainer', module)
  .add('renders the component', () => (
    <BaseContainer />
  ));
