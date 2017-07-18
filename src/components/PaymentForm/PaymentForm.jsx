import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { injectStripe, CardElement } from 'react-stripe-elements';

import Button from '../../components/Button/Button';

const PaymentForm = (props) => {
  return (
    <div className={`ui form ${props.message && 'error'}`} >
      {props.message && (
        <div className="error">
          {props.message}
        </div>)
      }
      <div
        id="dropin-container"
        className={cx('dropin-container', {
          'dropin-container--hidden': props.isLoading
        })}
      />
      <label>
        Card details
        <CardElement style={{base: {fontSize: '18px'}}} />
      </label>
      <div className="snapW-form-flex-group snapW-form-flex-group--right">
        <Button
          id="back-button"
          text="Back"
          size="small"
          onClick={props.handleReturn}
        />
        <Button
          id="submit-button"
          text="Purchase"
          size="small"
          onClick={props.handleValidate}
          isLoading={props.isLoading}
        />
      </div>
    </div>
  );
};

const {
  string,
  func
} = PropTypes;

PaymentForm.propTypes = {
  handleValidate: func,
  handleReturn: func,
  clientToken: string,
  message: string,
  isLoading: string
};

PaymentForm.defaultProps = {
  handleValidate() { },
  handleReturn() { },
  clientToken: undefined,
  message: undefined,
  isLoading: undefined
};

export default injectStripe(PaymentForm);
