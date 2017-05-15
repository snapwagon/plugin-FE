/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import CTAContainer from '../CTAContainer.jsx';

storiesOf('CTAContainer', module)
  .add('renders the component', () => (
    <div style={{ height: '400px', width: '400px', backgroundColor: '#000' }}>
      <CTAContainer />
    </div>
  ));
