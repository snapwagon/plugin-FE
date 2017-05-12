import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => <div>{props.componentName}</div>;

const {
  string
} = PropTypes;

Input.propTypes = {
  componentName: string
};

Input.defaultProps = {
  componentName: 'Input'
};

export default Input;
