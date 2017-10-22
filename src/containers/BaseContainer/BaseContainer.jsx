import React from 'react';
import PropTypes from 'prop-types';
import { StripeProvider } from 'react-stripe-elements';
import { getOffers, getToken, analytics } from '../../utils/utils';

import CallToAction from '../CTAContainer/CTAContainer';
import AccountInfo from '../AccountInfoContainer/AccountInfoContainer';
import PaymentContainer from '../PaymentContainer/PaymentContainer';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Confirmation from '../../components/Confirmation/Confirmation';

const STRIPE_PUB = 'pk_live_HDp5l3vGgissfUpWLRUI8Gw5';

class BaseContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      hidden: true,
      resetNonce: false,
      clientId: 2,
      offers: [],
      selectedOffer: { },
      step: 1,
      totalAmount: 1,
      quantity: 1,
      message: '',
      name: '',
      email: '',
      phone: '',
      clientToken: '',
      isFinePrintVisible: false,
      stripe: null
    };

    this.handleContinue = this.handleContinue.bind(this);
    this.handleStepBack = this.handleStepBack.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSelectOffer = this.handleSelectOffer.bind(this);

    analytics.page();
  }

  componentDidMount() {
    getOffers(this.state.clientId)
      .then((data) => {
        this.setState({
          offers: data,
          totalAmount: (data[0].discounted_value * 1).toFixed(2),
          isLoading: false,
          hidden: false
        });
      })
      .catch(console.warn);
  }

  handleContinue(e) {
    if (this.state.step < 4) {
      if (!this.state.hidden) {
        this.setState({
          step: this.state.step + 1
        });
      }
    } else {
      this.setState(() => ({
        hidden: true,
      }));
      this.setState(() => ({
        step: 1,
        resetNonce: true
      }));
    }
  }

  handleSelectOffer(offerId) {
    if (this.state.hidden) { return; }
    if (this.state.resetNonce) {
      getToken()
        .then((data) => {
          this.setState({
            clientToken: data.token
          });
        })
        .catch(console.warn);
    }
    return this.setState({
      selectedOffer: this.state.offers.find(({ id }) => id === offerId),
      step: this.state.step + 1
    });
  }

  handleStepBack(e) {
    if (this.state.step > 1) {
      this.setState({
        step: this.state.step - 1
      });
    }
  }

  handleSelect(e) {
    this.setState({
      quantity: e.target.value,
      totalAmount: (this.state.selectedOffer.discounted_value * e.target.value).toFixed(2)
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleClose(event) {
    this.setState({
      hidden: true
    });
  }

  renderCTA() {
    return (<CallToAction
      handleContinue={this.handleSelectOffer}
      handleClose={this.handleClose}
      offers={this.state.offers}
      clientId={this.state.clientId}
    />);
  }

  renderAccountInfo() {
    return (<AccountInfo
      handleContinue={this.handleContinue}
      handleStepBack={this.handleStepBack}
      handleClose={this.handleClose}
      name={this.state.name}
      email={this.state.email}
      quantity={this.state.quantity}
      phone={this.state.phone}
      offerTitle={this.state.selectedOffer.title}
      offerAmount={this.state.selectedOffer.discounted_value}
      offerDiscount={100-this.state.selectedOffer.discount_percentage}
      offerFullValue={this.state.selectedOffer.value}
      offerId={this.state.selectedOffer.id}
      totalAmount={this.state.totalAmount}
      handleInputChange={this.handleInputChange}
      handleSelect={this.handleSelect}
    />);
  }

  renderPayment() {
    return (
      <PaymentContainer
        handleContinue={this.handleContinue}
        handleStepBack={this.handleStepBack}
        handleClose={this.handleClose}
        clientToken={this.state.clientToken}
        quantity={this.state.quantity}
        name={this.state.name}
        email={this.state.email}
        phone={this.state.phone}
        offerId={this.state.selectedOffer.id}
      />
    );
  }

  renderContent() {
    const stepsMap = {
      1: (this.renderCTA()),
      2: (this.renderAccountInfo()),
      3: (this.renderPayment()),
      4: (<Confirmation
        handleContinue={this.handleContinue}
      />)
    };

    return stepsMap[this.state.step];
  }

  renderModal() {
    const renderedContent = this.renderContent();
    const progress = (this.state.step / 4) * 100;
    const barStyle = {
      width: `${progress}%`
    };
    return (
      <div>
        <Modal
          open={!this.state.hidden && !this.state.isLoading}
          onClose={this.handleClose}
          size="small"
        >
          <div
            className="snapW-ui tiny active indicating progress"
            data-percent={progress}
          >
            <div className="bar" style={barStyle} />
          </div>
          <StripeProvider apiKey={STRIPE_PUB}>
            {renderedContent}
          </StripeProvider>
        </Modal>
        {(this.state.hidden) &&
          (
            <Button
              size="small"
              type="normal"
              classNames="snapW-Button--fixed snapW-Button--cookie_rush"
              text="View Exclusive Offers"
              onClick={() => {
                return this.setState({
                  hidden: false
                });
              }}
            />
          )
        }
      </div>
    );
  }

  render() {
    const renderedModal = this.renderModal();

    return (
      renderedModal
    );
  }
}

const {
  string
} = PropTypes;

BaseContainer.propTypes = {
  componentName: string
};

BaseContainer.defaultProps = {
  componentName: 'BaseContainer'
};

export default BaseContainer;
