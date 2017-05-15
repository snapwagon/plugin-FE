/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import times from 'lodash/times';

import bottleImage from 'images/jump.jpg';
import lifestyleImage from 'images/jump.jpg';

import Cards from '../Cards';
import Image from '../../Image/Image';
import Content from '../../Content/Content';
import Section from '../../Content/Section';
import Button from '../../Button/Button';

storiesOf('Cards', module).addDecorator((story) => (
  <div style={{
    maxWidth: '300px',
    margin: '0 auto'
  }}>
    {story()}
  </div>
)).addWithInfo('rendered as a column of <Cards />', () => {
  return (
    <Cards orientation="column">
      <Section type="Header">
        <div style={{
          margin: '0 auto'
        }}>
          <svg width="80" height="150" viewBox="0 0 33 47" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.153.976a28.237 28.237 0 0 0-3.535-.754l-.467 7.842h-7.76L11.925.222C10.72.402 9.542.654 8.392.98 7.91 5.999 9.522 18.407 0 24.336v16.389s5.781 6.2 16.274 6.2c10.49 0 16.27-6.598 16.27-6.598V24.336c-9.524-5.929-7.912-18.34-8.39-23.36" fill="#0F346C" fillRule="evenodd"/>
          </svg>
        </div>
      </Section>
      <Section type="Body">
        <Content title="Blue Apron" subtitle="Building a Better Food System"/>
      </Section>
    </Cards>
  );
});

storiesOf('Cards', module).addDecorator((story) => (
  <div style={{
    maxWidth: '800px',
    margin: '0 auto'
  }}>
    {story()}
  </div>
)).addWithInfo('rendered as a row of <Card />', () => (
  <Cards>
    <Section type="Header">
      <Image src={lifestyleImage} alt="Jump into Spring!"/>
    </Section>
    <Section type="Body">
      <Content title="ONLY $17.00" subtitle="Jump into June!" tagline="DISCOUNT: 34%"/>
      <Button
        onClick={action('onClick')}
        type="medium"
        customStyle={{ color:"white", background: "#155885" }}
      />
    </Section>

  </Cards>
));

// .add('multiple cards in edit mode', () => {
//   const stubItems = [{
//     title: 'Pinot Noir',
//     subTitle: 'Medel',
//     imageUrl: bottleImage,
//     subText: 'Australia 2014',
//     id: 3
//   },
//   {
//     title: 'Pinot Noir',
//     subTitle: 'Medel',
//     imageUrl: bottleImage,
//     subText: 'Australia 2014',
//     id: 2
//   },
//   {
//     title: 'Pinot Noir',
//     subTitle: 'Medel',
//     imageUrl: bottleImage,
//     subText: 'Australia 2014',
//     id: 8
//   }];

//   const children = stubItems.map((cardData, index) => {
//     return (
//       <Card
//         applyMinimumHeight={false}
//         key={cardData.id}
//         orientation="landscape"
//       >
//         <Section type="Header">
//           <Image
//             alt="Le P'tit Paysan"
//             src={cardData.imageUrl}
//           />
//         </Section>
//         <Section type="Body">
//           <Content
//             title={cardData.title}
//             subtitle={cardData.subTitle}
//             tagline={cardData.subText}
//           />
//           <Button
//             classNames="coup-Content--action"
//             color="blue"
//             text="Select"
//             type="small"
//           />
//         </Section>
//       </Card>
//     );
//   });

//   return (
//     <Cards orientation="column">
//       {children}
//     </Cards>
//   );
// })
// .add('is Selected State', () => {
//   const stubItems = [{
//     title: 'Pinot Noir',
//     subTitle: 'Medel',
//     imageUrl: bottleImage,
//     subText: 'Australia 2014',
//     id: 3
//   },
//   {
//     title: 'Pinot Noir',
//     subTitle: 'Medel',
//     imageUrl: bottleImage,
//     subText: 'Australia 2014',
//     id: 2
//   },
//   {
//     title: 'Pinot Noir',
//     subTitle: 'Medel',
//     imageUrl: bottleImage,
//     subText: 'Australia 2014',
//     id: 8
//   }];

//   const children = stubItems.map((cardData, index) => {
//     return (
//       <Card orientation="landscape" applyMinimumHeight={false} isSelected={true}>
//         <Section type="Header">
//           <Image
//             alt="Le P'tit Paysan"
//             src={cardData.imageUrl}
//           />
//         </Section>
//         <Section type="Body">
//           <Content
//             title={cardData.title}
//             subtitle={cardData.subTitle}
//             tagline={cardData.subText}
//           />
//           <Button classNames="coup-Content--action" color="blue" text="Select" type="small" />
//         </Section>
//       </Card>
//     );
//   });

//   return (
//     <div style={{ width: '300px' }}>
//       <Cards classNames="coup-Cards--column">
//         {children}
//       </Cards>
//     </div>
//   );
// });
