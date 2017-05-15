import React from 'react';
import PropTypes from 'prop-types';

import { Container } from 'semantic-ui-react';

import Cards from '../../components/Cards/Cards';
import Image from '../../components/Image/Image';
import Content from '../../components/Content/Content';
import Section from '../../components/Content/Section';
import Button from '../../components/Button/Button';

import lifestyleImage from 'images/jump.jpg';

export default class CTAContainer extends React.Component {
  constructor(props) {
    super(props);

    
  }

  render() {
    return (
      <Container fluid>
        <Cards>
          <Section type="Header">
            <Image src={lifestyleImage} alt="Jump into Spring!"/>
          </Section>
          <Section type="Body">
            <Content title="ONLY $17.00" subtitle="Jump into June!" tagline="DISCOUNT: 34%"/>
            <Button
              onClick={this.props.handleContinue}
              type="medium"
              customStyle={{ color:"white", background: "#155885" }}
            />
          </Section>
        </Cards>
      </Container>
    )
  }
}

const {
  number,
  string,
  func
} = PropTypes;

CTAContainer.propTypes = {
  handleContinue () {}
};

CTAContainer.defaultProps = {
  step: 1
};
