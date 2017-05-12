/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Content from '../Content.jsx';

storiesOf('Content', module)
  .addWithInfo('rendered with title and subtitle', () => (
    <Content
      subtitle="with Pineapple & Pickled Jalapeño Salsa"
      title="Pork & Cabbage Tacos"
    />
  ))
  .addWithInfo('rendered with title, subtitle and tagline', () => (
    <Content
      title="Riesling"
      subtitle="Le P'tit Paysan"
      tagline="California, 2016"
    />
  ));
