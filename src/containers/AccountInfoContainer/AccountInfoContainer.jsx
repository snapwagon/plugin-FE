import React from 'react';
import PropTypes from 'prop-types';
import toMarkdown from 'to-markdown'
import marked from 'marked'

import { analytics } from '../../utils/utils';

import Button from '../../components/Button/Button';

class AccountInfoContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailError: false,
      nameError: false
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
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

  handleSelect(e) {
    return this.props.handleSelect(e);
  }

  handleInputChange(event) {
    return this.props.handleInputChange(event);
  }

  handleValidate(e) {
    if (this.props.name && this.props.email) {
      analytics.identify({
        first_name: this.props.name,
        last_name: this.props.name,
        email: this.props.email
      });
      analytics.track('Product Added', {
        offerId: this.props.offerId
      });
      return this.props.handleContinue();
    } else {
      !this.props.name && this.setState({
        nameError: true
      });
      !this.props.email && this.setState({
        emailError: true
      });
    }

    return null;
  }

  render() {
    return (
      <div className="ui mini form snapW-form">
        <div className="snapW-form-flex-group snapW-form-flex-group-info">
          <div id="form-input-control-description" className="field snapW-field-descriptiion">
            <label htmlFor="snapW-offer-description">Description</label>
            <p id="snapW-offer-description" className="snapW-main-text">{this.props.offerTitle}</p>
            <span className="snapW-subtitle">Discount: {this.props.offerDiscount}%</span>
            <span className="snapW-subtitle">Value: ${this.props.offerFullValue}</span>
          </div>
          <div id="form-input-control-qty" className="field snapW-field-descriptiion">
            <label htmlFor="snapW-select-qty">Qty</label>
            <select id="snapW-select-qty" value={this.props.quantity} name="quantity" onChange={this.handleSelect} className="snapW-field-center snapW-quantity">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div id="form-input-control-offer-amount" className="field">
            <label htmlFor="snapW-offer-amount">Offer $</label>
            <p id="snapW-offer-amount" className="snapW-main-text">${this.props.offerAmount}</p>
          </div>
          <div id="form-input-control-total" className="field">
            <label htmlFor="snapW-total-amount">Total</label>
            <p id="snapW-total-amount" className="snapW-main-text">${this.props.totalAmount}</p>
          </div>
        </div>

        <div className="snapW-form-flex-group">
          <div className={`${this.state.nameError ? 'error' : ''} field snapW-input-third`}>
            <label htmlFor="form-input-control-full-name">Name</label>
            <input id="form-input-control-full-name" label="Name" placeholder="Name" name="name" value={this.props.name} className="ui input" onChange={this.handleInputChange} required />
          </div>
          <div className={`${this.state.emailError ? 'error' : ''} field snapW-input-third`}>
            <label htmlFor="form-input-control-email">Email</label>
            <input id="form-input-control-email" label="Email" type="email" value={this.props.email} name="email" placeholder="awesomemom@gmail.com" className="ui input" onChange={this.handleInputChange} required />
          </div>
          <div className="field snapW-input-third">
            <label htmlFor="form-input-control-phone">Phone</label>
            <input id="form-input-control-phone" type="tel" label="Phone" placeholder="Phone" className="ui input" name="phone" onChange={this.handleInputChange} value={this.props.phone} />
          </div>
        </div>
        <div className="snapW-form-flex-group snapW-form-flex-group--right">
          <Button
            id="account-back-button"
            text="Back"
            size="small"
            onClick={this.props.handleStepBack}
          />
          <Button
            id="form-button-control-public"
            content="Confirm"
            text="Continue"
            onClick={this.handleValidate}
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

AccountInfoContainer.propTypes = {
  handleContinue: func,
  handleInputChange: func,
  handleSelect: func,
  offerTitle: string,
  offerAmount: string,
  offerDiscount: string,
  offerFullValue: string,
  totalAmount: string.isRequired,
  name: string,
  email: string,
  phone: string,
  offerId: string,
  quantity: number
};

AccountInfoContainer.defaultProps = {
  handleContinue() {},
  handleInputChange() {},
  handleSelect() {},
  offerTitle: 'MEGA ALL-ACCESS PASS',
  offerAmount: 17,
  offerDiscount: 35,
  offerFullValue: 24,
  name: '',
  email: '',
  phone: '',
  offerId: undefined,
  quantity: 1

};

export default AccountInfoContainer;
