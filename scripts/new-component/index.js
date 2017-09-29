// @flow

const path = require('path');
const minimist = require('minimist');
const promisify = require('promisify-node');
const Mustache = require('mustache');
const fs = require('fs');

const mkdirp = promisify(require('mkdirp'));
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);

const {
  name
} = minimist(process.argv);

/*
 * Filepaths
 */

const pathToMainIndex = path.join(path.resolve(), 'src', 'index.js');
const pathToMainIndexCSS = path.join(path.resolve(), 'src', 'index.scss');
const pathToComponentsDir = path.join(path.resolve(), 'src', 'components');
const pathToComponent = path.join(pathToComponentsDir, name);
const pathToComponentCSS = path.join(pathToComponent, `_${name}.scss`);
const pathToComponentFile = path.join(pathToComponent, `${name}.jsx`);

const pathToStories = path.join(pathToComponent, '__stories__');
const pathToTests = path.join(pathToComponent, '__tests__');

const pathToMainIndexTemplate = path.join(__dirname, 'templates', 'mainIndex.mustache');
const pathToMainCSSTemplate = path.join(__dirname, 'templates', 'mainCSS.mustache');
const pathToComponentTemplate = path.join(__dirname, 'templates', 'component.mustache');
const pathToStoriesIndexTemplate = path.join(__dirname, 'templates', 'storiesIndex.mustache');
const pathToSnapshotIndexTemplate = path.join(__dirname, 'templates', 'snapshotIndex.mustache');

/*
 * Build Component
 */

const $makeDirectories = Promise.all([mkdirp(pathToStories), mkdirp(pathToTests)]);
const $loadTemplates = Promise.all([
  readFile(pathToComponentTemplate, 'utf-8').then((f) => {
    writeFile(pathToComponentFile, Mustache.render(f, { name }), 'utf-8')
  })
]);

if (fs.existsSync(pathToComponentFile)) {
  console.error(`${name} component already exists! Exiting now...`);
  process.exit(0);
}

$makeDirectories
  .then(() => $loadTemplates)
  .then(() => {
    const $mainIndex = readFile(pathToMainIndexTemplate, 'utf-8').then((f) => {
      return appendFile(pathToMainIndex, Mustache.render(f, { name }), 'utf-8')
        .then(console.log)
        .catch(console.warn)
    });

    const $mainCSS = readFile(pathToMainCSSTemplate, 'utf-8').then((f) => {
      return appendFile(pathToMainIndexCSS, Mustache.render(f, { name }), 'utf-8')
        .then(console.log)
        .catch(console.warn)
    });


    const $storiesIndex = readFile(pathToStoriesIndexTemplate, 'utf-8').then((f) => {
      return appendFile(`${pathToStories}/index.jsx`, Mustache.render(f, { name }), 'utf-8')
        .then(console.log)
        .catch(console.warn)
    });

    const $snapshotIndex = readFile(pathToSnapshotIndexTemplate, 'utf-8').then((f) => {
      return appendFile(`${pathToTests}/${name}.spec.jsx`, Mustache.render(f, { name }), 'utf-8')
        .then(console.log)
        .catch(console.warn)
    });

    const $cssIndex = writeFile(pathToComponentCSS, `.snapW-${name} {
      margin: 0;
    }`, 'utf-8');

    return Promise.all([$mainIndex, $mainCSS, $storiesIndex, $snapshotIndex, $cssIndex]);
  })
  .then(() => console.log(`${name} created!`))
  .catch(console.error);
