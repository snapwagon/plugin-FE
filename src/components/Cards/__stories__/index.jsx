/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Cards from '../Cards';
import Image from '../../Image/Image';
import Content from '../../Content/Content';
import Section from '../../Content/Section';
import Button from '../../Button/Button';

const lifestyleImage = 'https://d2qs5c8ct3mfv5.cloudfront.net/images/standard_Business-4001-f7533f107822795023225e25b6f5dec8-Jumping.JPG';
storiesOf('Cards', module).addDecorator((story) => (
  <div
    style={{
      maxWidth: '300px',
      margin: '0 auto'
    }}
  >
    {story()}
  </div>
)).addWithInfo('rendered as a column of <Cards />', () => {
  return (
    <Cards orientation="column">
      <Section type="Header">
        <div
          style={{
            margin: '0 auto'
          }}
        />
      </Section>
      <Section type="Body">
        <Content title="" subtitle="" />
      </Section>
    </Cards>
  );
});

storiesOf('Cards', module).addDecorator((story) => (
  <div
    style={{
      maxWidth: '800px',
      margin: '0 auto'
    }}
  >
    {story()}
  </div>
)).addWithInfo('rendered as a row of <Card />', () => (
  <Cards>
    <Section type="Header">
      <Image src={lifestyleImage} alt="Jump into Spring!" />
    </Section>
    <Section type="Body">
      <Content title="ONLY $17.00" subtitle="Jump into June!" tagline="DISCOUNT: 34%" />
      <Button
        onClick={action('onClick')}
        type="medium"
        customStyle={{ color: 'white', background: '#155885' }}
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
