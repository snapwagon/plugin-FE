import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import toMarkdown from 'to-markdown';
import marked from 'marked';

import { analytics } from '../../utils/utils';

import Image from '../../components/Image/Image';
import Content from '../../components/Content/Content';
import Section from '../../components/Content/Section';
import Button from '../../components/Button/Button';

class Cards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFinePrintVisible: false
    };

    this.handleShowFinePrint = this.handleShowFinePrint.bind(this);
    this.handleInterest = this.handleInterest.bind(this);
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
      this.handleInterest(e);
    }
  }

  handleInterest(e) {
    analytics.track('Product Viewed', {
      offerId: this.props.offer.id,
      clientId: this.props.clientId
    });
    return this.props.handleContinue(this.props.offer.id);
  }

  handleShowFinePrint(e) {
    this.setState({
      isFinePrintVisible: true
    });
  }

  render() {
    const savingsAmt = this.props.offer.value - this.props.offer.discounted_value;
    const detailLine = `Discount: ${this.props.offer.discount_percentage}% Value: $${this.props.offer.value}`;

    const markup = this.props.offer.desc;
    const sanitize = (htmlString) => {
      return { __html: marked(toMarkdown(htmlString), {sanitize: true})};
    };

    return (
      <div
        className={cx(
          'snapW-Cards',
          `snapW-Cards--${this.props.orientation}`,
          this.props.classNames
        )}
      >
        <Section type="Header">
          <Image src={this.props.offer.image_url} alt={this.props.offer.title} />
        </Section>
        <Section type="Body">
          <Content title={this.props.offer.title} subtitle={`ONLY $${this.props.offer.discounted_value}`} tagline={detailLine} />
          {this.props.offer.desc && (
           !this.state.isFinePrintVisible ?
             (<button
               className={'snapW-SubSection--Link--Button'}
               onClick={this.handleShowFinePrint}
             >
               Fine print...
             </button>) :
             (
               <div
                 dangerouslySetInnerHTML={sanitize(markup)}
                 className={`snapW-SubSection snapW-SubSection--${this.state.isFinePrintVisible}`}
               />
             )
           )
         }
          <Button
            onClick={this.handleInterest}
            size="small"
            text={`Save $${savingsAmt}!`}
          />
        </Section>
      </div>
    );
  }
}

const {
  arrayOf,
  node,
  bool,
  string,
  oneOf,
  oneOfType,
  objectOf,
  func
} = PropTypes;

Cards.propTypes = {
  classNames: oneOfType([
    string,
    objectOf(bool)
  ]),
  orientation: oneOf([
    'column',
    'row'
  ]),
  handleClose: func,
  handleContinue: func,
  offer: objectOf(node)
};

Cards.defaultProps = {
  handleClose() {},
  handleContinue() {},
  classNames: undefined,
  orientation: 'row',
  offer: {},
};

export default Cards;
