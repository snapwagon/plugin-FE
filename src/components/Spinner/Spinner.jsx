import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Spinner extends React.Component {
  calculateStyles() {
    const { size } = this.props;

    if (size < 100) {
      return {
        height: `${size}px`,
        width: `${size}px`,
        borderTop: '3px solid',
        borderRight: '3px solid',
        borderLeft: '3px solid transparent',
        borderBottom: '3px solid transparent'
      };
    }

    return {
      height: `${size}px`,
      width: `${size}px`,
      borderTop: '12px solid',
      borderRight: '12px solid',
      borderLeft: '12px solid transparent',
      borderBottom: '12px solid transparent'
    };
  }

  render() {
    return (
      <i
        style={this.calculateStyles()}
        className={cx(
          'snapW-Spinner',
          this.props.classNames
        )}
      />
    );
  }
}

const {
  bool,
  number,
  objectOf,
  oneOfType,
  string
} = PropTypes;

Spinner.propTypes = {
  classNames: oneOfType([
    string,
    objectOf(bool)
  ]),
  size: number,
};

Spinner.defaultProps = {
  classNames: undefined,
  size: 100,
};
