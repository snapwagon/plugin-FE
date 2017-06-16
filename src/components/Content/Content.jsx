import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const Content = (props) => {
  const subtitleClasses = {
    'coup-Content__subtitle--is-bold': props.tagline
  };

  return (
    <div className="coup-Content">
      <p className="coup-Content__text coup-Content__title">{props.title}</p>
      {props.subtitle && (
        <p className={cx('coup-Content__text', 'coup-Content__subtitle', subtitleClasses)}>
          {props.subtitle}
        </p>
      )}
      {props.tagline && <p className="coup-Content__text coup-Content__tagline">{props.tagline}</p>}
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
