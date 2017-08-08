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
      isLoading: true,
      isComplete: false,
      message: undefined
    };

    this.handleValidate = this.handleValidate.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleToggleIsLoading = this.handleToggleIsLoading.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleToggleIsLoading() {
    this.setState({isLoading: !this.state.isLoading});
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

  handleErrorMessage(e) {
    this.setState({ message: e})
  }

  handleValidate(token) {
    if (this.state.isComplete) return this.props.handleContinue();
    this.setState({
      isLoading: true
    });

    const formData = {
      charge: {
        token: token.id
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

    analytics.track('Checkout Started', {
      offerId: formData.offer.id,
      quantity: formData.quantity
    });

    postPayment(formData)
      .then(() => {
        analytics.track('Order Completed', {
          offerId: formData.offer.id,
          quantity: formData.quantity
        });

        this.setState({isComplete: true});
        return this.props.handleContinue();
      })
      .catch((error) => {
        this.setState({ message: error });
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
          isLoading={this.props.isLoading}
          handleReturn={this.handleReturn}
          message={this.state.message}
          toggleIsLoading={this.handleToggleIsLoading}
          handleErrorMessage={this.handleErrorMessage}
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
