import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const Cards = (props) => {
  return (
    <div
      className={cx(
        'coup-Cards',
        `coup-Cards--${props.orientation}`,
        props.classNames
      )}
    >
      {props.children}
    </div>
  );
};

const {
  arrayOf,
  node,
  bool,
  string,
  oneOf,
  oneOfType,
  objectOf
} = PropTypes;

Cards.propTypes = {
  classNames: oneOfType([
    string,
    objectOf(bool)
  ]),
  children: oneOfType([
    arrayOf(node),
    node
  ]).isRequired,
  orientation: oneOf([
    'column',
    'row'
  ])
};

Cards.defaultProps = {
  classNames: undefined,
  orientation: 'row'
};

export default Cards;
