import React from 'react';
import PropTypes from 'prop-types';

import { analytics } from '../../utils/utils';

import Cards from '../../components/Cards/Cards';
import Image from '../../components/Image/Image';
import Content from '../../components/Content/Content';
import Section from '../../components/Content/Section';
import Button from '../../components/Button/Button';

import lifestyleImage from 'images/jump.jpg';

const CTAContainer = (props) => {
  analytics.track('Product Viewed', {
    offerId: this.props.offerId
  })
  const detailLine = `Discount: ${props.offerDiscount}% Value: $${props.offerFullValue}`;
  return (
    <Cards>
      <Section type="Header">
        <Image src={lifestyleImage} alt={props.offerTitle}/>
      </Section>
      <Section type="Body">
        <Content title={props.offerTitle} subtitle={`ONLY $${props.offerAmount}`} tagline={detailLine}/>
        <Button
          onClick={props.handleContinue}
          size="small"
          style={{ color:"white", background: "#155885" }}
        />
      </Section>
    </Cards>
  )
}

const {
  number,
  string,
  func
} = PropTypes;

CTAContainer.propTypes = {
  handleContinue: func,
  offerTitle: string,
  offerAmount: number,
  offerDiscount: number,
  offerFullValue: number
};

CTAContainer.defaultProps = {
  handleContinue() {},
  offerTitle: "MEGA ALL-ACCESS PASS",
  offerAmount: 17,
  offerDiscount: 35,
  offerFullValue: 24
};

export default CTAContainer;
