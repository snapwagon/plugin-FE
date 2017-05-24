import React from 'react';
import PropTypes from 'prop-types';
import braintree from 'braintree-web-drop-in';
import { fetchToken, sendNonce } from '../../utils/utils';

import { Form, Input, Select } from 'semantic-ui-react';

import Button from '../../components/Button/Button';

class PaymentContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      instance: undefined
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
  }

  componentDidMount() {
    braintree.create({
      authorization: 'sandbox_4phrwktw_jgywsy8jmpmjgvkd',
      selector: '#dropin-container'
    }, (createErr, instance) => {
      if (createErr) {
       // An error in the create call is likely due to
       // incorrect configuration values or network issues.
       // An appropriate error will be shown in the UI.
       console.error(createErr);
       return;
     } else {
       this.setState({
         instance: instance
       });
     }
    });
  }

  handleInputChange(event) {
     const target = event.target;
     const name = target.name;

     this.setState({
       [name]: value
     });
   }

  handleValidate(e) {
    this.state.instance && this.state.instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
      if (requestPaymentMethodErr) {
        // No payment method is available.
        // An appropriate error will be shown in the UI.
        console.error(requestPaymentMethodErr);
        return;
      }
      // Submit payload.nonce to your server
      sendNonce(payload)
      return (() => this.props.handleContinue());
    });
  }

  render() {
    return (
      <div>
        <div id="dropin-container"></div>
        <Button
          id="submit-button"
          text="Purchase"
          onClick={this.handleValidate}
        >
      </Button>
      </div>
    );
  };
}

const {
  string,
  number
} = PropTypes;

PaymentContainer.propTypes = {
  offerTitle: string,
  offerAmount: number,
  offerDiscount: number,
  offerFullValue: number,
};

PaymentContainer.defaultProps = {
  offerTitle: "MEGA ALL-ACCESS PASS",
  offerAmount: 17
};

export default PaymentContainer;
