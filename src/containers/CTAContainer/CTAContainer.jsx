import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import Cards from '../../components/Cards/Cards';

class CTAContainer extends React.Component {
  constructor(props) {
    super(props);

    this.renderOfferList = this.renderOfferList.bind(this);
  }

  renderOfferList() {
    return this.props.offers
      .map((offer, index) => {
        return (
          <div key={offer.id}>
            <Cards
              orientation="column"
              offer={offer}
              clientId={this.props.clientId}
              handleContinue={this.props.handleContinue}
              handleClose={this.props.handleClose}
              handleShowFinePrint={this.props.handleShowFinePrint}
              isFinePrintVisible={this.props.isFinePrintVisible}
            />
          </div>
        );
      });
  }

  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      accessibility: true,
      adaptiveHeight: true,
    };

    const offerComponents = this.renderOfferList();
    if (offerComponents.length > 0) {
      return (
        <Slider
          {...settings}
        >
          {offerComponents}
        </Slider>
      );
    }
    return null;
  }
}

const {
  number,
  string,
  func,
  bool
} = PropTypes;

CTAContainer.propTypes = {
  handleContinue: func,
  handleClose: func,
  offerTitle: string,
  offerAmount: string,
  offerDiscount: number,
  offerFullValue: string,
  finePrint: string,
  imageUrl: string
};

CTAContainer.defaultProps = {
  handleContinue() {},
  handleClose() {},
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
