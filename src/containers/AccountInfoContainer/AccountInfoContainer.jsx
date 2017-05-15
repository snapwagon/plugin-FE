import React from 'react';
import PropTypes from 'prop-types';

import { Form, Input } from 'semantic-ui-react';

import Button from '../../components/Button/Button';

const AccountInfoContainer = (props) => {

  return (
    <Form>
      <Form.Group widths='equal'>
        <Form.Field id='form-input-control-full-name' control={Input} label='Name' placeholder='Name' required/>
        <Form.Field  control={Input} id='form-input-control-email' label='Email' placeholder='awesomemom@gmail.com' required/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field id='form-input-control-full-name' control={Input} label='Name' placeholder='Name' />
      </Form.Group>
      <Form.Field id='form-button-control-public' control={Button} content='Confirm' />
    </Form>
  );
}

const {
  string
} = PropTypes;

AccountInfoContainer.propTypes = {
  componentName: string
};

AccountInfoContainer.defaultProps = {
  componentName: 'AccountInfoContainer'
};

export default AccountInfoContainer;
