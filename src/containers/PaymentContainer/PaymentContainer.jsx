import React from 'react';
import PropTypes from 'prop-types';
import { Elements } from 'react-stripe-elements';
import cx from 'classnames';

import { postPayment, analytics } from '../../utils/utils';
import PaymentForm from '../../components/PaymentForm/PaymentForm';

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
      <Elements>
        <PaymentForm
          handleValidate={this.handleValidate}
          isLoading={this.isLoading}
          handleReturn={this.handleReturn}
          message={this.state.message}
        />
      </Elements>
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
