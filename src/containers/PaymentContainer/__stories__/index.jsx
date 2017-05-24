/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import PaymentContainer from '../PaymentContainer.jsx';

storiesOf('PaymentContainer', module)
  .add('renders the component', () => (
    <PaymentContainer />
  ));
