import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import propTypes, { defaultProps } from './props';

const Button = (props) => {
  const buttonClasses = cx("coup-Button",
    `coup-Button--${props.type}`: true,
    'coup-Button--is-disabled': props.isDisabled,
    { ...props.classNames }
  );

  return (
    <button
      onClick={props.onClick}
      className={buttonClasses}
      style={props.customStyle}
      disabled={props.isDisabled}
      aria-label={props.text}
    >
      {props.text}
    </button>
  );
}

Button.propTypes = propTypes;

Button.defaultProps = defaultProps;

export default Button;
