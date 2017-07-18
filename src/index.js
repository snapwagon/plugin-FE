/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
import rollbar from 'rollbar';
import React from 'react';
import ReactDOM from 'react-dom';
import BaseContainer from './containers/BaseContainer/BaseContainer';
require('../assets/snapwagon.min.css');

const token = '0c6ff7d504c04e6d9736eec0c999a577';
const Rollbar = rollbar.init({
  accessToken: token,
  handleUncaughtExceptions: true,
  handleUnhandledRejections: true
});

const renderPoint = document.createElement('div', { id: `render-snapwagon-${1}`});
renderPoint.setAttribute('id', 'render-snapwagon-1');
document.body.appendChild(renderPoint);

const script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://js.stripe.com/v3/';
script.async = false;
document.head.appendChild(script);
script.onload = () => {
  // to render in prod
  ReactDOM.render(
    <BaseContainer />,
    document.getElementById('render-snapwagon-1')
  );
};
