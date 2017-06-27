import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Image = (props) => (
  <div
    aria-label={props.alt}
    className="coup-Thumbnail"
    style={{
      backgroundImage: `url(${props.src})`
    }}
    role="img"
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
