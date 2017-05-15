import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';

require('../src/index.scss');

setAddon(infoAddon);

function loadStories() {
  require('../src/components/Button/__stories__');
  require('../src/components/Cards/__stories__');
  require('../src/containers/CTAContainer/__stories__');
  require('../src/containers/BaseContainer/__stories__');

}

configure(loadStories, module);
