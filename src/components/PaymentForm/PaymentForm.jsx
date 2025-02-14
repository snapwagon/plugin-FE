import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { injectStripe, CardElement } from 'react-stripe-elements';

import Button from '../../components/Button/Button';

const createOptions = (fontSize: string) => {
  return {
    style: {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    },
  };
};

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      saving: false
    };
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.setState({saving: true});
    // this.props.toggleIsLoading();
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    // https://stripe.com/docs/stripe.js#stripe-create-token
    this.props.stripe.createToken({email: this.props.email}).then(({token, error}) => {
      // this.props.toggleIsLoading();
      if (token) {
        this.props.handleValidate(token);
      } else {
        this.setState({saving: false});
        this.props.handleErrorMessage(error.message);
      }
    });
  }

  render() {
    const formClasses = cx({
      'snapW-ui': true,
      loading: this.props.isLoading,
      form: true,
      error: this.props.message,
      'dropin-container': true
    });

    return (
      <div className={formClasses} >
        <label
          htmlFor="card-element"
          className="snapW-main-text"
        >
          Card details
        </label>
        {this.props.message && (
          <div className="error message">
            {this.props.message}
          </div>)
        }
        <div className="snapW-stripe--container">
          <CardElement
            id="card-element"
            onReady={this.props.toggleIsLoading}
            {...createOptions('18')}
          />
        </div>

        <div className="snapW-form-flex-group snapW-form-flex-group--right">
          <Button
            id="back-button"
            text="Back"
            size="small"
            onClick={this.props.handleReturn}
          />
          <Button
            id="submit-button"
            text="Purchase"
            size="small"
            onClick={this.handleSubmit}
            isDisabled={this.state.saving}
            classNames="snapW-Button--positive"
          />
        </div>
      </div>
    );
  }
}

const {
  string,
  func
} = PropTypes;

PaymentForm.propTypes = {
  handleValidate: func,
  handleReturn: func,
  clientToken: string,
  message: string,
  isLoading: string.isRequired,
  handleErrorMessage: func,
  toggleIsLoading: func,
  customerName: string.isRequired,
  email: string.isRequired
};

PaymentForm.defaultProps = {
  handleValidate() { },
  handleReturn() { },
  handleErrorMessage() { },
  toggleIsLoading() { },
  clientToken: undefined,
  message: ''
};

export default injectStripe(PaymentForm);
