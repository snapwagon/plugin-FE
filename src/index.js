/* eslint-disable import/prefer-default-export */
import React from 'react';
import ReactDOM from 'react-dom'
require('../assets/recoop.min.css');
import BaseContainer from './containers/BaseContainer/BaseContainer';

const renderPoint = document.createElement("div", { id: `render-recoop-${1}`});
renderPoint.setAttribute("id", "render-recoop-1");
document.body.appendChild(renderPoint);
// to render in prod
ReactDOM.render(
  <BaseContainer/>,
  document.getElementById('render-recoop-1'),
  console.log('loaded')
);
