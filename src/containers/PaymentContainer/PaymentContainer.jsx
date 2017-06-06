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
      isLoading: true,
      isComplete: false
    };

    this.handleValidate = this.handleValidate.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
  }

  componentDidMount() {
    braintree.create({
      authorization: this.props.clientToken,
      selector: '#dropin-container'
    }, (createErr, instance) => {
      if (createErr) {
       // An error in the create call is likely due to
       // incorrect configuration values or network issues.
       // An appropriate error will be shown in the UI.
        console.error(createErr);
      } else {
        this.setState({
          instance,
          isLoading: false
        });
      }
    });
  }

  componentWillUnmount() {
    // hostedFieldsInstance.teardown(function (err) {
    //   if (err) {
    //     console.error('Could not tear down Hosted Fields!');
    //   } else {
    //     console.log('Hosted Fields has been torn down!');
    //   }
    // });
  }

  handleValidate(e) {
    if (this.state.isComplete) return this.props.handleContinue();

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
          // this.handleError(error);
          console.warn(error);
        });
      });
  }

  handleReturn(e) {
    return this.props.handleStepBack();
  }

  render() {
    return (
      <div>
        <div
          id="dropin-container"
          className={cx('dropin-container', {
            'dropin-container--hidden': this.state.isLoading
          })}
        />
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
        />
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
