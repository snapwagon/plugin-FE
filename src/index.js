/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import BaseContainer from './containers/BaseContainer/BaseContainer';

require('../assets/recoop.min.css');

const renderPoint = document.createElement('div', { id: `render-recoop-${1}`});
renderPoint.setAttribute('id', 'render-recoop-1');
document.body.appendChild(renderPoint);
// to render in prod
ReactDOM.render(
  <BaseContainer />,
  document.getElementById('render-recoop-1')
);
