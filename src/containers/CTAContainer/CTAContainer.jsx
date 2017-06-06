import React from 'react';
import PropTypes from 'prop-types';
// import { Popup, Button, Header, Image, Modal } from 'semantic-ui-react'

import Cards from '../../components/Cards/Cards';
import Image from '../../components/Image/Image';
import Content from '../../components/Content/Content';
import Section from '../../components/Content/Section';
import Button from '../../components/Button/Button';

const CTAContainer = (props) => {
  const detailLine = `Discount: ${props.offerDiscount}% Value: $${props.offerFullValue}`;
  return (
    <Cards>
      <Section type="Header">
        <Image src={props.imageUrl} alt={props.offerTitle} />
      </Section>
      <Section type="Body">
        <Content title={props.offerTitle} subtitle={`ONLY $${props.offerAmount}`} tagline={detailLine} details={props.finePrint} />

        <Button
          onClick={props.handleContinue}
          size="small"
          style={{ color: 'white', background: '#155885' }}
        />
      </Section>
    </Cards>
  );
};

const {
  number,
  string,
  func
} = PropTypes;

CTAContainer.propTypes = {
  handleContinue: func,
  offerTitle: string,
  offerAmount: string,
  offerDiscount: number,
  offerFullValue: string,
  finePrint: string,
  imageUrl: string
};

CTAContainer.defaultProps = {
  handleContinue() {},
  offerTitle: '',
  offerAmount: '',
  offerDiscount: 30,
  offerFullValue: '',
  imageUrl: '',
  finePrint: ''
};

export default CTAContainer;
