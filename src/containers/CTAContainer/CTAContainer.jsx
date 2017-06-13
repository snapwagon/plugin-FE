import React from 'react';
import PropTypes from 'prop-types';

import { analytics } from '../../utils/utils';

import Cards from '../../components/Cards/Cards';
import Image from '../../components/Image/Image';
import Content from '../../components/Content/Content';
import Section from '../../components/Content/Section';
import Button from '../../components/Button/Button';

class CTAContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFinePrintVisible: false
    }

    this.handleInterest = this.handleInterest.bind(this);
  }
  handleInterest() {
    analytics.track('Product Viewed', {
      offerId: this.props.offerId,
      clientId: this.props.clientId
    });
    return this.props.handleContinue();
  }
  render() {
    const detailLine = `Discount: ${this.props.offerDiscount}% Value: $${this.props.offerFullValue}`;

    return (
      <Cards>
        <Section type="Header">
          <Image src={this.props.imageUrl} alt={this.props.offerTitle} />
        </Section>
        <Section type="Body">
          <Content title={this.props.offerTitle} subtitle={`ONLY $${this.props.offerAmount}`} tagline={detailLine} details={this.props.finePrint} />
          <section className={`coup-SubSection coup-SubSection--${this.state.isFinePrintVisible}`}>

          </section>
          <Button
            onClick={this.handleInterest}
            size="small"
            style={{ color: 'white', background: '#155885' }}
          />
        </Section>
      </Cards>
    );
  };
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
