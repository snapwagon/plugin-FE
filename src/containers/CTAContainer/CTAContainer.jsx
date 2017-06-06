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
  // <div>
  //
  //   <Modal.Header>{props.offerTitle}</Modal.Header>
  //   <Modal.Content image>
  //     <Image wrapped size='small' src={props.imageUrl} />
  //     <Modal.Description>
  //       <Header>Default Profile Image</Header>
  //       <p className="coup-Content__text coup-Content__title">{props.offerTitle}</p>
  //       {props.subtitle && (
  //         <p className={cx('coup-Content__text', 'coup-Content__subtitle', subtitleClasses)}>
  //           {props.subtitle}
  //         </p>
  //       )}
  //       {props.tagline && <p className="coup-Content__text coup-Content__tagline">{props.tagline}</p>}
  //       {props.details && <p className="coup-Content__text coup-Content__tagline">{props.details}</p>}
  //     </Modal.Description>
  //   </Modal.Content>
  //   <Modal.Actions>
  //     <Button positive icon='checkmark' labelPosition='right' content="Yep, that's me" onClick={props.handleContinue} />
  //   </Modal.Actions>
  // </div>
  return (
    <Cards>
      <Section type="Header">
        <Image src={props.imageUrl} alt={props.offerTitle} />
      </Section>
      <Section type="Body">
        <Content title={props.offerTitle} subtitle={`ONLY $${props.offerAmount}`} tagline={detailLine} details={props.desc} />

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
  offerDiscount: string,
  offerFullValue: string,
  finePrint: string,
  imageUrl: string,
  desc: string
};

CTAContainer.defaultProps = {
  handleContinue() {},
  offerTitle: "",
  offerAmount: "",
  offerDiscount: "",
  offerFullValue: "",
  imageUrl: "",
  desc: ""
};

export default CTAContainer;
