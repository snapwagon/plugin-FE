import React from 'react';
import PropTypes from 'prop-types';

// import { Form } from 'semantic-ui-react';

import { analytics } from '../../utils/utils';

import Button from '../../components/Button/Button';

class AccountInfoContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
    }

    return null;
  }

  render() {
    return (
      <Form size="mini" className="coup-form">
        <Form.Group className="coup-form-flex-group coup-form-flex-group-info">
          <Form.Field id="form-input-control-description" className="coup-field-descriptiion">
            <label htmlFor="coup-offer-description">Description</label>
            <p id="coup-offer-description" className="coup-main-text">{this.props.offerTitle}</p>
            <span className="coup-subtitle">Discount: {this.props.offerDiscount}%</span>
            <span className="coup-subtitle">Value: ${this.props.offerFullValue}</span>
          </Form.Field>

          <Form.Select control="select" label="Qty" value={this.props.quantity} name="quantity" onChange={this.handleSelect} className="coup-field-center coup-quantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Select>
          <Form.Field id="form-input-control-offer-amount" className="">
            <label htmlFor="coup-offer-amount">Offer $</label>
            <p id="coup-offer-amount" className="coup-main-text">${this.props.offerAmount}</p>
          </Form.Field>
          <Form.Field id="form-input-control-total" className="">
            <label htmlFor="coup-total-amount">Total</label>
            <p id="coup-total-amount" className="coup-main-text">${this.props.totalAmount}</p>
          </Form.Field>
        </Form.Group>

        <Form.Group className="coup-form-flex-group">
          <Form.Input id="form-input-control-full-name" label="Name" placeholder="Name" name="name" value={this.props.name} className="coup-input-third" onChange={this.handleInputChange} required />
          <Form.Input id="form-input-control-email" label="Email" type="email" value={this.props.email} name="email" placeholder="awesomemom@gmail.com" className="coup-input-third" onChange={this.handleInputChange} required />
          <Form.Input id="form-input-control-phone" type="tel" label="Phone" placeholder="Phone" className="coup-input-third" name="phone" onChange={this.handleInputChange} value={this.props.phone} />
        </Form.Group>
        <Button
          id="account-back-button"
          text="Back"
          size="small"
          onClick={this.props.handleStepBack}
        />
        <Button id="form-button-control-public" content="Confirm" control={Button} text="Continue" onClick={this.handleValidate} />
      </Form>
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
