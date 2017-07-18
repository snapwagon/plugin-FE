import React from 'react';
import PropTypes from 'prop-types';

const Modal = (props) => {
  return (
    <div>
      <div className={`ui small ${props.open ? 'active' : ''} modal`}>
        {props.children}
      </div>
      <div
        className={`ui page ${props.open ? 'visible' : ''} dimmer`}
        onClick={props.onClose}
      />
    </div>
  );
};

const {
  string,
  bool,
  func
} = PropTypes;

Modal.propTypes = {
  open: bool,
  onClose: func,
  size: string
};

Modal.defaultProps = {
  open: true,
  onClose() {},
  size: 'small'
};

export default Modal;
