# kjsquared-FE
Front end of the ish

# Table of Contents

* [Setup](#setup)
  * [Local](#local)
  * [Project](#project)
* [Installation and Usage](#installation-and-usage)
  * [npm install](#npm-install)
  * [Module Usage](#module-usage)
  * [Prebuilt Script Usage](#prebuilt-script-usage)
* [Development](#development)
  * [Software dependencies](#software-dependencies)
  * [Useful npm commands](#useful-npm-commands)
  * [Storybook development](#storybook-development)
  * [Application development](#application-development)
  * [Testing and Linting](#testing-and-linting)
  * [Adding Mock Data](#adding-mock-data)
* [Versioning](#versioning)

## Installation and Usage

pomegranate-ui can be included in your project via two methods: 1. as an ES module (preferred); 2. as a script tag that contains a global `Pomegranate`. The npm module includes both formats.

`cd your-project && npm install pomegrante-ui --save`

### Module Usage

If you're bundling your project with a bundler like `webpack`, `rollup`, or `browserify`, you can import individual components.
```javascript
import React from 'react';
import { Button } from 'pomegranate-ui';

const MyComponent = (props) => (
  return (
    <div>
      <h1>Button</h1>
      <Button
        color="white"
        type="full"
        text={props.text}
      />
    </div>
  );
);
```
### Prebuilt Script Usage

1. Include the `dist/recoop.js` or `dist/recoop.min.js` file in your project
```
<script src="your-path-to/node_modules/recoop-ui/dist/recoop.js"></script>
```

2. Use the global `Pomegranate` to access the components.
```javascript
const MyComponent = function (props) {
  return (
    <Pomegranate.Card>
      <div>Hello?</div>
    </Pomegranate.Card>
  );
};
```

# Development

## Software dependencies

nodenv

`npm install`

## Useful npm commands

`npm run` to get an output of available npm scripts

| cmd | purpose | usage |
| ------ | ------ | ------ |
|"build"| Builds components and css into their output directories | `npm run build` |
|"component:new"| Script for generating component boilerplate. | `npm run component:new -- --name=Input` |
|"test"| Runs Jest, Flow and eslint | `npm run test` |
|"storybook"| Builds storybook application on port 6006 for an isolated development environment | `npm run storybook` |

## Storybook development

Storybook is an isolated development environment for your components where you write individual stories for a component state and render the output in the application. It is a full-fledge webpack application so you can import all your code and assets as modules.

0. Run storybook: `npm run storybook`
0. Make stories available to storybook in `./.storybook/config.js`
    ```javascript
      import { configure, setAddon } from '@kadira/storybook';
      import infoAddon from '@kadira/react-storybook-addon-info';

      require('../src/index.scss');

      setAddon(infoAddon);

      function loadStories() {
        require('../src/components/Image/__stories__');
        require('../src/components/<Your Component>/__stories__'); // Require your component
      }

      configure(loadStories, module);
    ```
0. Write your stories in `./src/components/<Your Component>/__stories__/index.jsx`
    ```javascript
    import React from 'react';
    import { storiesOf } from '@kadira/storybook';
    import { compose, withState } from 'recompose';

    import Card from '../Card';
    import Content from '../../Content/Content';
    import Image from '../../Image/Image';
    import Section from '../Section';

    import wineImage from './images/wine-image.jpg';

    storiesOf('Card', module)
      .addWithInfo('rendered as a wine <Card />', () => (
        <Card>
          <Section type="Header">
            <Image
              alt="Le P'tit Paysan"
              src={wineImage}
            />
          </Section>
          <Section type="Body">
            <Content
              title="Riesling"
              subtitle="Le P'tit Paysan"
              tagline="California, 2016"
            />
          </Section>
        </Card>
      ))
    ```

## Application development

To develop in a project, you'll need to `npm link` your local pomegranate-ui to the target application. Since we use nodenv for most of our projects, you'll have to make sure you set the correct `NODENV_VERSION` for your target application when you run `npm link`. The `package.json` entry points to `lib/index.js` so make sure to run `npm run build` to generate the transpiled components.

0. `cd pomegranate-ui && NODENV_VERSION=<YOUR APPLICATION VERSION> npm link && npm run build`
0. `cd <YOUR APPLICATION> && npm link pomegranate-ui`

The `node_modules` directory should include a symlinked directory for your local pomegranate-ui. Follow the usage instructions above as normal.

## Testing and Linting

Your tests should live alongside the component in the `src/components/<Your Component>/__test__/<Your Component>.spec.jsx`

```javascript
/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import Button from '../Button.jsx';

describe('<Button /> snapshots', () => {
  test('rendered with required props', () => {
    const tree = shallow(<Button />);
    expect(tree).toMatchSnapshot();
  });

  test('rendered with props', () => {
    const tree = shallow(
      <Button
        color="orange"
        classNames={{
          'my-Button': true,
          'my-NonButton': false
        }}
        isDisabled={true}
        onClick={() => {
          return true;
        }}
        text="Save"
        type="large"
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('<Button /> interactions', () => {
  test('calls the onClick function', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Button onClick={fn} />);

    wrapper.simulate('click');
    wrapper.simulate('keyPress', { enter: true });
    expect(fn).toHaveBeenCalled();
  });
});
```

`npm run test`

0. [Jest](https://facebook.github.io/jest/) - `npm run jest` - Required
0. [eslint](https://www.npmjs.com/package/eslint-config-airbnb) - `npm run lint` - Required
0. [Flow](https://flow.org/) - `npm run flow` - Not a requirement, but is available if you're into static typecheckers.

## Adding Mock Data

The best way to make mock data available to your stories or tests is by including your data alongside the component in an appropriate directory as an importable asset. This is preferred because it maintains the idea that components are bundled units with the code, tests, stories, fixtures all in one place.


# Versioning

For all changes, you'll need to bump the `VERSION` file to the appropriate [semantic version](http://semver.org/)
