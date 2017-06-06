import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Progress, Container, Icon } from 'semantic-ui-react';

import { getOffer, getToken, analytics } from '../../utils/utils';

import CallToAction from '../CTAContainer/CTAContainer';
import AccountInfo from '../AccountInfoContainer/AccountInfoContainer';
import PaymentForm from '../PaymentContainer/PaymentContainer';
import Button from '../../components/Button/Button';
import Confirmation from '../../components/Confirmation/Confirmation';

class BaseContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: false,
      clientId: 0,
      offer: {},
      step: 1,
      totalAmount: 1,
      offerAmount: 1,
      quantity: 1,
      message: '',
      name: '',
      email: '',
      phone: '',
      clientToken: '',
      isLoading: true
    };

    this.handleContinue = this.handleContinue.bind(this);
    this.handleStepBack = this.handleStepBack.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);

    analytics.page();
    analytics.track('Product Viewed', {
      offerId: this.state.offer.id,
      clientId: this.state.clientId
    });

    getToken()
      .then((data) => {
        this.setState({
          ...this.state,
          clientToken: data.token
        });
      })
      .catch(console.warn);

    getOffer('d6fa53ad-b2ad-475c-a492-45ab0d6fedf6')
      .then((data) => {
        console.log('offer Fetched', data);
        this.setState({
          ...this.state,
          offer: data,
          totalAmount: data.discounted_value * 1,
          isLoading: false
        });
      })
      .catch(console.warn);
  }

  componentDidMount() {

  }

  handleContinue(e) {
    if (this.state.step < 4) {
      this.setState({
        ...this.state,
        step: this.state.step + 1
      });
    } else {
      this.setState({
        ...this.state,
        hidden: true
      });
      this.setState({
        ...this.state,
        step: 1
      });
    }
  }

  handleStepBack(e) {
    this.setState({
      ...this.state,
      step: this.state.step - 1
    });
  }

  handleSelect(e) {
    this.setState({
      ...this.state,
      quantity: e.target.value,
      totalAmount: this.state.offer.discounted_value * e.target.value
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

  handleClose(event) {
    this.setState({
      ...this.state,
      hidden: true
    });
  }

  renderContent() {
    const stepsMap = {
      1: (<CallToAction
        handleContinue={this.handleContinue}
        offerTitle={this.state.offer.title}
        offerAmount={this.state.offer.discounted_value}
        offerDiscount={this.state.offer.discount_percentage}
        offerFullValue={this.state.offer.value}
        finePrint={this.state.offer.fine_print}
        offerId={this.state.offer.id}
        imageUrl={this.state.offer.image_url}
      />),
      2: (<AccountInfo
        handleContinue={this.handleContinue}
        handleStepBack={this.handleStepBack}
        name={this.state.name}
        email={this.state.email}
        quantity={this.state.quantity}
        phone={this.state.phone}
        offerTitle={this.state.offer.title}
        offerAmount={this.state.offer.discounted_value}
        offerDiscount={this.state.offer.discount_percentage}
        offerFullValue={this.state.offer.value}
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
        offerId={this.state.offer.id}
      />),
      4: (<Confirmation
        handleContinue={this.handleContinue}
      />)
    };
    return stepsMap[this.state.step];
  }

  renderModal() {
    if (this.state.hidden) {
      return (
        <Button
          size="small"
          color="orange"
          type="normal"
          classNames="coup-Button--fixed"
          text="View Exclusive Offers"
          onClick={() => {
            return this.setState({
              ...this.state,
              hidden: false
            });
          }}
        />
      );
    }

  //   <div className="ui page modals dimmer transition active">
  //     <div className="ui modal transition visible active" style="margin-top: -284px;">
  //     <button className="ui right labeled icon positive button"><i aria-hidden="true" className="checkmark icon"></i><!-- react-text: 14 --> <!-- /react-text --><!-- react-text: 15 -->Yep, that's me<!-- /react-text --></button>
  //   </div>
  // </div>

    const renderedContent = this.renderContent();
    const progress = (this.state.step / 4) * 100;
    const barStyle = {
      width: `${progress}%`
    }
    return (
      <Modal
        open={!this.state.hidden}
        onClose={this.handleClose}
        size="small"
      >
        <div className="ui tiny active indicating progress"
          data-percent={progress}>
          <div className="bar" style={barStyle}>
          </div>
        </div>
        <Container fluid>
          {renderedContent}
        </Container>
      </Modal>
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

// to test
export default BaseContainer;
