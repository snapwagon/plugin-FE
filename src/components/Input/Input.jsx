import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  return (
    <div class="coup-form-field">
      <label>{props.name}</label>
      <input placeholder={props.name} />
    </div>
  );
}

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
