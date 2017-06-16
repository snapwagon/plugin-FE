import React from 'react';
import PropTypes from 'prop-types';

import { getOffer, getToken, analytics } from '../../utils/utils';

import CallToAction from '../CTAContainer/CTAContainer';
import AccountInfo from '../AccountInfoContainer/AccountInfoContainer';
import PaymentForm from '../PaymentContainer/PaymentContainer';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
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
      isLoading: true,
      isFinePrintVisible: false
    };

    this.handleContinue = this.handleContinue.bind(this);
    this.handleStepBack = this.handleStepBack.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowFinePrint = this.handleShowFinePrint.bind(this);

    analytics.page();

    getToken()
      .then((data) => {
        this.setState({
          clientToken: data.token
        });
      })
      .catch(console.warn);

    getOffer('d6fa53ad-b2ad-475c-a492-45ab0d6fedf6')
      .then((data) => {
        console.log('offer Fetched', data);
        this.setState({
          offer: data,
          totalAmount: (data.discounted_value * 1).toFixed(2),
          isLoading: false
        });
      })
      .catch(console.warn);
  }

  handleContinue(e) {
    if (this.state.step < 4) {
      this.setState({
        step: this.state.step + 1
      });
    } else {
      this.setState(() => ({
        hidden: true
      }));
      this.setState(() => ({
        step: 1
      }));
    }
  }

  handleStepBack(e) {
    this.setState({
      step: this.state.step - 1
    });
  }

  handleSelect(e) {
    this.setState({
      quantity: e.target.value,
      totalAmount: (this.state.offer.discounted_value * e.target.value).toFixed(2)
    });
  }

  handleShowFinePrint(e) {
    this.setState({
      isFinePrintVisible: true
    })
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

  renderContent() {
    const stepsMap = {
      1: (<CallToAction
        handleContinue={this.handleContinue}
        offerTitle={this.state.offer.title}
        offerAmount={this.state.offer.discounted_value}
        offerDiscount={this.state.offer.discount_percentage}
        offerFullValue={this.state.offer.value}
        finePrint={this.state.offer.desc}
        offerId={this.state.offer.id}
        clientId={this.state.clientId}
        imageUrl={this.state.offer.image_url}
        handleShowFinePrint={this.handleShowFinePrint}
        isFinePrintVisible={this.state.isFinePrintVisible}
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
              hidden: false
            });
          }}
        />
      );
    }

    const renderedContent = this.renderContent();
    const progress = (this.state.step / 4) * 100;
    const barStyle = {
      width: `${progress}%`
    };
    return (
      <Modal
        open={!this.state.hidden}
        onClose={this.handleClose}
        size="small"
      >
        <div
          className="ui tiny active indicating progress"
          data-percent={progress}
        >
          <div className="bar" style={barStyle} />
        </div>
        {renderedContent}
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
