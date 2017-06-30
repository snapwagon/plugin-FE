import React from 'react';
import PropTypes from 'prop-types';
import braintree from 'braintree-web-drop-in';
import cx from 'classnames';

import { postPayment, analytics } from '../../utils/utils';
import Button from '../../components/Button/Button';

class PaymentContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      instance: undefined,
      isLoading: false,
      isComplete: false,
      message: undefined
    };

    this.handleValidate = this.handleValidate.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    // escape
    if (e.keyCode === 27) {
      this.props.handleClose(e);
    // enter
    } else if (e.keyCode === 13) {
      this.handleValidate(e);
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);

    braintree.create({
      authorization: this.props.clientToken,
      selector: '#dropin-container'
    }, (createErr, instance) => {
      if (createErr) {
       // An error in the create call is likely due to
       // incorrect configuration values or network issues.
       // An appropriate error will be shown in the UI.
        console.error(createErr);
        this.setState({
          message: createErr
        });
      } else {
        this.setState({
          instance
        });
      }
    });
  }

  handleValidate(e) {
    if (this.state.isComplete) return this.props.handleContinue();
    this.setState({
      isLoading: true
    });

    const formData = {
      sale: {
        payment_method_nonce: ''
      },
      customer: {
        first_name: this.props.name,
        last_name: this.props.name,
        email: this.props.email,
        phone_number: this.props.phone
      },
      offer: {
        id: this.props.offerId
      },
      quantity: this.props.quantity
    };

    const handleComplete = () => this.setState({isComplete: true});
    const handleError = (error) => this.setState({ message: error });
    // const continueCB = this.props.handleContinue;
    return this.state.instance &&
      this.state.instance.requestPaymentMethod((
        requestPaymentMethodErr, payload) => {
        if (requestPaymentMethodErr) {
        // No payment method is available.
        // An appropriate error will be shown in the UI.
          console.error(requestPaymentMethodErr);
          return;
        }
        formData.sale.payment_method_nonce = payload.nonce;

        analytics.track('Checkout Started', {
          offerId: formData.offer.id,
          quantity: formData.quantity
        });
      // Submit payload.nonce to your server
        postPayment(formData)
        .then(() => {
          analytics.track('Order Completed', {
            offerId: formData.offer.id,
            quantity: formData.quantity
          });

          return handleComplete();
        })
        .catch((error) => {
          return handleError(error);
        });
      });
  }

  handleReturn(e) {
    return this.props.handleStepBack();
  }

  render() {
    return (
      <div className={`ui form ${this.state.message && 'error'}`} >
        {this.state.message && (
          <div className="error">
            {this.state.message}
          </div>)
        }
        <div
          id="dropin-container"
          className={cx('dropin-container', {
            'dropin-container--hidden': this.state.isLoading
          })}
        />
        <div className="snapW-form-flex-group snapW-form-flex-group--right">
          <Button
            id="back-button"
            text="Back"
            size="small"
            onClick={this.handleReturn}
          />
          <Button
            id="submit-button"
            text="Purchase"
            size="small"
            onClick={this.handleValidate}
            isLoading={this.state.isLoading}
          />
        </div>
      </div>
    );
  }
}

const {
  string,
  number,
  func
} = PropTypes;

PaymentContainer.propTypes = {
  handleStepBack: func,
  handleContinue: func,
  clientToken: string,
  name: string,
  email: string,
  phone: string,
  offerId: string,
  quantity: number
};

PaymentContainer.defaultProps = {
  handleContinue() { },
  handleStepBack() { },
  clientToken: undefined,
  name: '',
  email: '',
  phone: '',
  offerId: undefined,
  quantity: 1
};

export default PaymentContainer;
