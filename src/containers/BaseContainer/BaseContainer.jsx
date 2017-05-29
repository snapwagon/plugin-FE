import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Progress, Container } from 'semantic-ui-react';

import { getOffer, getToken } from '../../utils/utils';

import CallToAction from '../CTAContainer/CTAContainer';
import AccountInfo from '../AccountInfoContainer/AccountInfoContainer';
import PaymentForm from '../PaymentContainer/PaymentContainer';

class BaseContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId: 0,
      offer: {},
      step: 1,
      totalAmount: 1,
      offerAmount: 1,
      quantity: 1,
      message: "",
      name: "",
      email: "",
      phone: "",
      clientToken: ""
    }

    this.handleContinue = this.handleContinue.bind(this);
    this.handleStepBack = this.handleStepBack.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    getToken()
      .then((data) => {
        this.setState({
          ...this.state,
          clientToken: data.token
        });
      })
      .catch(console.warn);

    getOffer('8e2002c6-ab9f-48a5-bf2b-bb25d37e1d42')
      .then((data) => {
        console.log('offer Fetched', data);
        this.setState({
          ...this.state,
          offer: data
        });
      })
      .catch(console.warn);
  }

  handleContinue(e) {
    this.setState({
      ...this.state,
      step: this.state.step+1
    });
    // make the request for braintree token,
    // plus fire the event for analytics
    // send attribution data.
  }

  handleStepBack(e) {
    this.setState({
      ...this.state,
      step: this.state.step-1
    });
  }

  handleSelect(e) {
    this.setState({
      ...this.state,
      quantity: e.target.value,
      totalAmount: this.state.offerAmount * e.target.value
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      ...this.state,
      [name]: value
    });
   }

  renderModal() {
    const stepsMap = {
      1: (<CallToAction
            handleContinue={this.handleContinue}
            offerTitle={this.state.offer.title}
            offerAmount={this.state.offer.value}
            offerId={this.state.offer.id}
          />),
      2: (<AccountInfo
            handleContinue={this.handleContinue}
            handleStepBack={this.handleStepBack}
            name={this.state.name}
            email={this.state.email}
            quantity={this.state.quantity}
            phone={this.state.phone}
            offerTitle={this.state.offer.title}
            offerAmount={this.state.offer.value}
            offerDiscount={this.state.offer.discountPercentage}
            offerFullValue={this.state.offer.fullValue}
            totalAmount={this.state.totalAmount}
            handleInputChange={this.handleInputChange}
            handleSelect={this.handleSelect}
            offerId={this.state.offer.id}
          />),
      3: (<PaymentForm
            handleContinue={this.handleContinue}
            handleStepBack={this.handleStepBack}
            clientToken={this.state.clientToken}
            quantity={this.state.quantity}
            name={this.state.name}
            email={this.state.email}
            phone={this.state.phone}
            offerId='8e2002c6-ab9f-48a5-bf2b-bb25d37e1d42'
          /> ),
      4: (<div> horray</div>)
    }
    return stepsMap[this.state.step];

  }

  render() {
    const progress = (this.state.step / 4) * 100;

    const renderedElement = this.renderModal();

    return (
      <Modal
        defaultOpen={true}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="small"
        dimmer="blurring"
        closeIcon={true}
      >
        <Progress
          percent={progress}
          indicating
          size="tiny"
          >
        </Progress>
        <Container fluid>
          {renderedElement}
        </Container>
      </Modal>
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
