/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import PaymentForm from '../PaymentForm.jsx';

storiesOf('PaymentForm', module)
  .add('renders the component', () => (
    <PaymentForm />
  ));
