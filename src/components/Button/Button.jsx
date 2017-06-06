import React from 'react';
import cx from 'classnames';

import propTypes, { defaultProps } from './props';

const Button = (props) => {
  const classes = {
    'coup-Button--disabled': props.isDisabled,
  };

  return (
    <button
      disabled={props.isDisabled}
      className={cx(
        'coup-Button',
        `coup-Button--${props.color}`,
        `coup-Button--${props.type}`,
        `coup-Button--${props.size}`,
        classes,
        props.classNames
      )}
      onClick={props.onClick}
    >
      {props.text}
      {props.isLoading && (
        <div
          className={cx(
            `coup-Button--${props.type}--loading`,
            `coup-Button--${props.size}--loading`,
          )}
        />
      )}
    </button>
  );
};

Button.propTypes = propTypes;

Button.defaultProps = defaultProps;

export default Button;
