import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const Section = (props) => {
  return (
    <div
      className={cx(
        `coup-Card__${props.type}`,
        `coup-Card__${props.type}--${props.orientation}`,
        props.classNames
      )}
    >
      {props.children}
    </div>
  );
};

const {
  arrayOf,
  bool,
  node,
  objectOf,
  oneOfType,
  oneOf,
  string,
} = PropTypes;

Section.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node
  ]).isRequired,
  classNames: oneOfType([
    string,
    objectOf(bool)
  ]),
  orientation: oneOf([
    'landscape',
    'portrait'
  ]),
  type: oneOf([
    'Header',
    'Body',
    'Footer'
  ]).isRequired
};

Section.defaultProps = {
  classNames: undefined,
  orientation: 'portrait'
};

export default Section;
