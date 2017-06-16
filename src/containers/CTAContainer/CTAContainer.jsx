import React from 'react';
import PropTypes from 'prop-types';

import toMarkdown from 'to-markdown'
import marked from 'marked'

import { analytics } from '../../utils/utils';

import Cards from '../../components/Cards/Cards';
import Image from '../../components/Image/Image';
import Content from '../../components/Content/Content';
import Section from '../../components/Content/Section';
import Button from '../../components/Button/Button';

class CTAContainer extends React.Component {
  constructor(props) {
    super(props);

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
    const savingsAmt = this.props.offerFullValue - this.props.offerAmount;
    const detailLine = `Discount: ${this.props.offerDiscount}% Value: $${this.props.offerFullValue}`;

    const markup = this.props.finePrint;
    const sanitize = (htmlString) => {
      return { __html: marked(toMarkdown(htmlString), {sanitize: true})}
    }

    return (
      <Cards orientation="portrait">
        <Section type="Header">
          <Image src={this.props.imageUrl} alt={this.props.offerTitle} />
        </Section>
        <Section type="Body">
          <Content title={this.props.offerTitle} subtitle={`ONLY $${this.props.offerAmount}`} tagline={detailLine}/>
          {
            !this.props.isFinePrintVisible ?
              (<button
                className={`coup-SubSection--Link--Button`}
                onClick={this.props.handleShowFinePrint}
              >
                Fine print...
              </button>) :
              (
                <div
                  dangerouslySetInnerHTML={sanitize(markup)}
                  className={`coup-SubSection coup-SubSection--${this.props.isFinePrintVisible}`}>
                </div>
              )
          }
          <Button
            onClick={this.handleInterest}
            size="small"
            text={`Save $${savingsAmt}!`}
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
  func,
  bool
} = PropTypes;

CTAContainer.propTypes = {
  handleContinue: func,
  offerTitle: string,
  offerAmount: string,
  offerDiscount: number,
  offerFullValue: string,
  finePrint: string,
  imageUrl: string,
  isFinePrintVisible: bool,
  handleShowFinePrint: func
};

CTAContainer.defaultProps = {
  handleContinue() {},
  offerTitle: '',
  offerAmount: '',
  offerDiscount: 30,
  offerFullValue: '',
  imageUrl: '',
  finePrint: '',
  isFinePrintVisible: false,
  handleShowFinePrint() {}
};

export default CTAContainer;
