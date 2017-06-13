/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Modal from '../Modal.jsx';

storiesOf('Modal', module)
  .add('renders the component', () => (
    <Modal />
  ));
