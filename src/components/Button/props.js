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
  classNames: oneOfType([
    string,
    objectOf(bool)
  ]),
  onClick: func,
  text: string,
  type: oneOf([
    'card',
    'small',
    'medium',
    'large',
    'full'
  ])
};

export const defaultProps = {
  classNames: undefined,
  isDisabled: false,
  onClick() {},
  text: 'View Offer',
  type: 'medium'
};
