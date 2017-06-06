import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button/Button';

const Confirmation = (props) => {
  return (
    <div className="coup-Confirmation">
      <h4 className="coup-Confirmation-title">
        {props.confirmationHeader}
      </h4>
      <p className="coup-Confirmation-text">
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
  confirmationMessage: 'Check your email for your voucher and redeem in store.'
};

export default Confirmation;
