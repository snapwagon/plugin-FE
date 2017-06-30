import React from 'react';
import cx from 'classnames';

import propTypes, { defaultProps } from './props';

const Button = (props) => {
  const classes = {
    'snapW-Button--disabled': props.isDisabled,
  };

  return (
    <button
      disabled={props.isDisabled}
      className={cx(
        'snapW-Button',
        `snapW-Button--${props.color}`,
        `snapW-Button--${props.type}`,
        `snapW-Button--${props.size}`,
        classes,
        props.classNames
      )}
      onClick={props.onClick}
    >
      {props.text}
      {props.isLoading && (
        <div
          className={cx(
            `snapW-Button--${props.type}--loading`,
            `snapW-Button--${props.size}--loading`,
          )}
        />
      )}
    </button>
  );
};

Button.propTypes = propTypes;

Button.defaultProps = defaultProps;

export default Button;
