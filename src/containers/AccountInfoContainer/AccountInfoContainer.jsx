import React from 'react';
import PropTypes from 'prop-types';

import { Form, Input, Select } from 'semantic-ui-react';

import { analytics } from '../../utils/utils';

import Button from '../../components/Button/Button';

class AccountInfoContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };

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
      return this.props.handleContinue()
    }
  }

  render() {
    const message = this.props.warning && (<Message
      success={this.props.success}
      header='Could you check something!'
      list={[
        'That e-mail has been subscribed, but you have not yet clicked the verification link in your e-mail.',
      ]}
    />);

    return (
      <Form size="mini" className="coup-form">
        {message}
        <Form.Group className="coup-form-flex-group coup-form-flex-group-info">
          <Form.Field id='form-input-control-description' className="coup-field-descriptiion">
            <label>Description</label>
            <p className="coup-main-text">{this.props.offerTitle}</p>
            <span className="coup-subtitle">Discount: {this.props.offerDiscount}%</span>
            <span className="coup-subtitle">Value: ${this.props.offerFullValue}</span>
          </Form.Field>

          <Form.Select control={Select} label='Qty' control='select' name={this.props.quantity} onChange={this.handleSelect} className="coup-field-center coup-quantity">
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </Form.Select>
          <Form.Field id='form-input-control-offer-amount' className="">
            <label>Offer $</label>
            <p className="coup-main-text">${this.props.offerAmount}</p>
          </Form.Field>
          <Form.Field id='form-input-control-total' className="">
            <label>Total</label>
            <p className="coup-main-text">${this.props.totalAmount}</p>
          </Form.Field>
        </Form.Group>

        <Form.Group className="coup-form-flex-group">
          <Form.Input id='form-input-control-full-name' label='Name' placeholder='Name' name="name" value={this.props.name} className="coup-input-third" onChange={this.handleInputChange} required />
          <Form.Input id='form-input-control-email' label='Email' type="email" value={this.props.email} name="email" placeholder='awesomemom@gmail.com' className="coup-input-third" onChange={this.handleInputChange} required/>
          <Form.Input id='form-input-control-phone' type='tel' label='Phone' placeholder='Phone' className="coup-input-third" name="phone" onChange={this.handleInputChange} value={this.props.phone} />
        </Form.Group>
        <Form.Button id='form-button-control-public' content='Confirm' control={Button} text="Continue" onClick={this.handleValidate}/>
      </Form>
    );
  };
}

const {
  string,
  number,
  func
} = PropTypes;

AccountInfoContainer.propTypes = {
  handleContinue: func,
  handleInputChange: func,
  offerTitle: string,
  offerAmount: string,
  offerDiscount: string,
  offerFullValue: string,
  totalAmount: string
};

AccountInfoContainer.defaultProps = {
  handleContinue() {},
  handleInputChange() {},
  offerTitle: "MEGA ALL-ACCESS PASS",
  offerAmount: 17,
  offerDiscount: 35,
  offerFullValue: 24
};

export default AccountInfoContainer;
