/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom';
import BaseContainer from './containers/BaseContainer/BaseContainer';

require('../assets/recoop.min.css');

const renderPoint = document.createElement('div', { id: `render-recoop-${1}`});
renderPoint.setAttribute('id', 'render-recoop-1');
document.body.appendChild(renderPoint);
// to render in prod
render(
  <BaseContainer />,
  document.getElementById('render-recoop-1')
);
export { default as Modal } from './components/Modal/Modal';
