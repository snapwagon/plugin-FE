/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import AccountInfoContainer from '../AccountInfoContainer.jsx';

storiesOf('AccountInfoContainer', module)
  .add('renders the component', () => (
    <AccountInfoContainer />
  ));
