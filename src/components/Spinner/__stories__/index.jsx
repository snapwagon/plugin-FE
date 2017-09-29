/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react';

import Spinner from '../Spinner.jsx';

storiesOf('Spinner', module)
  .add('renders the component', () => (
    <div style={{ height: '400px', width: '400px', backgroundColor: '#000' }}>
      <Spinner />
    </div>
  ));
