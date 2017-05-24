import React from 'react';
import PropTypes from 'prop-types';

import { Form, Input, Select } from 'semantic-ui-react';

import Button from '../../components/Button/Button';

class AccountInfoContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalValue: (props.offerAmount * 1),
      quantity: 1,
      message: "",
      name: "",
      email: "",
      phone: ""
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSelect(e) {
    this.setState({
      ...this.state,
      quantity: e.target.value,
      totalValue: this.props.offerAmount * e.target.value
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

  handleValidate(e) {
    if (this.state.name && this.state.email) {
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
      <Form size="tiny" className="coup-form">
        {message}
        <Form.Group className="coup-form-flex-group">
          <Form.Field id='form-input-control-description' width="5" className="coup-field-descriptiion">
            <label>Description</label>
            <p className="coup-main-text">{this.props.offerTitle}</p>
            <span className="coup-subtitle">Discount: {this.props.offerDiscount}%</span>
            <span className="coup-subtitle">Value: ${this.props.offerFullValue}</span>
          </Form.Field>
          <Form.Field label='Qty' control='select' name={this.state.quantity} onChange={this.handleSelect} width="1" className="coup-field-center">
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </Form.Field>
          <Form.Field id='form-input-control-offer-amount' className="field-center" width="2">
            <label>Offer Amount</label>
            <p className="coup-main-text">${this.props.offerAmount}</p>
          </Form.Field>
          <Form.Field id='form-input-control-total' className="field-center" width="2">
            <label>Total Amount</label>
            <p className="coup-main-text">${this.state.totalValue}</p>
          </Form.Field>
        </Form.Group>
        <Form.Group className="coup-form-flex-group" widths="equal">
          <Form.Field id='form-input-control-full-name' control={Input} label='Name' placeholder='Name' name="name" value={this.state.name} className="coup-input-third" onChange={this.handleInputChange} required/>
          <Form.Field  control={Input} id='form-input-control-email' label='Email' value={this.state.email} name="email" placeholder='awesomemom@gmail.com' className="coup-input-third" onChange={this.handleInputChange} required/>
          <Form.Input id='form-input-control-phone' type='tel' label='Phone' placeholder='Phone' className="coup-input-third" name="phone" onChange={this.handleInputChange} value={this.state.phone} />
        </Form.Group>
        <Form.Button id='form-button-control-public' content='Confirm' control={Button} onClick={this.handleValidate}/>
      </Form>
    );
  };
}

const {
  string,
  number
} = PropTypes;

AccountInfoContainer.propTypes = {
  offerTitle: string,
  offerAmount: number,
  offerDiscount: number,
  offerFullValue: number,
};

AccountInfoContainer.defaultProps = {
  offerTitle: "MEGA ALL-ACCESS PASS",
  offerAmount: 17,
  offerDiscount: 35,
  offerFullValue: 24
};

export default AccountInfoContainer;
