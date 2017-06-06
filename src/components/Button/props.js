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
  isDisabled: bool,
  isLoading: bool,
  color: oneOf([
    'blue',
    'orange',
    'red',
    'white'
  ]),
  classNames: oneOfType([
    string,
    objectOf(bool)
  ]),
  onClick: func,
  text: string,
  size: oneOf([
    'card',
    'small',
    'medium',
    'large',
    'full'
  ]),
  type: oneOf([
    'normal',
    'outline'
  ]),
  customStyle: string
};

export const defaultProps = {
  color: 'blue',
  classNames: undefined,
  isDisabled: false,
  isLoading: false,
  onClick() {},
  size: 'small',
  text: 'View Offer',
  type: 'normal',
  customStyle: undefined
};
