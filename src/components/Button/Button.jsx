import React from 'react';
import cx from 'classnames';

import propTypes, { defaultProps } from './props';
import Spinner from '../../components/Spinner/Spinner';

const SPINNER_SIZE_MAP = {
  small: 6,
  medium: 8,
  large: 12,
  full: 12
};

const Button = (props) => {
  return (
    <button
      className={cx(
        'snapW-Button',
        `snapW-Button--${props.color}`,
        `snapW-Button--${props.type}`,
        `snapW-Button--${props.size}`,
        props.classNames,
        {
          'snapW-Button--disabled': props.isDisabled,
        }
      )}
      disabled={props.isDisabled}
      id={props.id}
      type={props.htmlType}
      onClick={props.onClick}
      onMouseOver={props.onHover}
      onMouseOut={props.onHover}
    >
      <span
        style={{
          opacity: props.isLoading && !props.showLoadingText ? 0 : 1
        }}
      >
        {props.text}
      </span>
      {props.isLoading && (
        <Spinner
          classNames={{
            'snapW-Button__Spinner--center': !props.showLoadingText,
            'snapW-Button__Spinner--right': props.showLoadingText
          }}
          size={props.showLoadingText ? 8 : SPINNER_SIZE_MAP[props.size]}
        />
      )}
    </button>
  );
};

Button.propTypes = propTypes;

Button.defaultProps = defaultProps;

export default Button;
