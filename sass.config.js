/* eslint-disable import/no-extraneous-dependencies, no-console */

const sass = require('node-sass');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

const outputFile = path.resolve(__dirname, `assets/snapwagon${process.env.MINIFY ? '.min' : ''}.css`);
const outputStyle = process.env.MINIFY ? 'compressed' : 'expanded';

sass.render({
  file: path.resolve('src/index.scss'),
  outputStyle
}, (err, { css }) => {
  if (err) throw new Error(err);

  mkdirp(`${__dirname}/assets`, (error_) => {
    if (error_) throw new Error(error_);

    fs.writeFile(outputFile, css, (err_) => {
      if (err_) throw new Error(err_);
      console.log('Sass compilation completed!');
    });
  });
});
