import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const Content = (props) => {
  const subtitleClasses = {
    'snapW-Content__subtitle--is-bold': props.tagline
  };

  return (
    <div className="snapW-Content">
      <p className="snapW-Content__text snapW-Content__title">{props.title}</p>
      {props.subtitle && (
        <p className={cx('snapW-Content__text', 'snapW-Content__subtitle', subtitleClasses)}>
          {props.subtitle}
        </p>
      )}
      {props.tagline && <p className="snapW-Content__text snapW-Content__tagline">{props.tagline}</p>}
    </div>
  );
};

const {
  string
} = PropTypes;

Content.propTypes = {
  subtitle: string,
  tagline: string,
  title: string.isRequired,
  details: string
};

Content.defaultProps = {
  subtitle: '',
  tagline: '',
};

export default Content;
