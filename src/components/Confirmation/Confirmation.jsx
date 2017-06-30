import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button/Button';

const Confirmation = (props) => {
  return (
    <div className="snapW-Confirmation">
      <h4 className="snapW-Confirmation-title">
        {props.confirmationHeader}
      </h4>
      <p className="snapW-Confirmation-text">
        {props.confirmationMessage}
      </p>
      <Button
        onClick={props.handleContinue}
        text="Dismiss"
      />
    </div>
  );
};

const {
  string,
  func
} = PropTypes;

Confirmation.propTypes = {
  handleContinue: func,
  confirmationHeader: string,
  confirmationMessage: string
};

Confirmation.defaultProps = {
  handleContinue() {},
  confirmationHeader: 'YOU ROCK!',
  confirmationMessage: 'Check your email for a voucher and redeem in store.'
};

export default Confirmation;
