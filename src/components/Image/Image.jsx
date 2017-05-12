import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Image = (props) => (
  <img
    alt={props.alt}
    className={classNames('coup-Image', props.classNames)}
    src={props.src}
    width={props.width}
  />
);

const {
  bool,
  string,
  objectOf,
  oneOfType
} = PropTypes;

Image.propTypes = {
  alt: string.isRequired,
  classNames: oneOfType([
    string,
    objectOf(bool)
  ]),
  src: string.isRequired,
  width: string
};

Image.defaultProps = {
  classNames: undefined,
  width: '100%'
};

export default Image;
