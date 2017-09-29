import PropTypes from 'prop-types';

const {
  bool,
  func,
  objectOf,
  oneOf,
  oneOfType,
  string
} = PropTypes;

export default {
  buttonType: oneOf([
    'filled',
    'outline'
  ]),
  classNames: oneOfType([
    string,
    objectOf(bool)
  ]),
  color: oneOf([
    'blue',
    'green',
    'red',
    'gray'
  ]),
  data: objectOf(string),
  htmlType: oneOf([
    'submit',
    'reset',
    'button'
  ]),
  id: string,
  isDisabled: bool,
  isLoading: bool,
  onClick: func,
  onHover: func,
  showLoadingText: bool,
  size: oneOf([
    'card',
    'small',
    'medium',
    'large',
    'full'
  ]),
  text: string
};

export const defaultProps = {
  buttonType: 'filled',
  classNames: undefined,
  color: 'blue',
  data: null,
  htmlType: 'button',
  id: null,
  isDisabled: false,
  isLoading: false,
  onClick() {},
  onHover() {},
  showLoadingText: false,
  size: 'medium',
  text: 'Click'
};
