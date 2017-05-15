'use strict';

const R = require('ramda');
const fs = require('fs-extra');
const klawSync = require('klaw-sync')
const dataDir = fs.realpathSync(__dirname);

module.exports = R.pipe(
  R.pluck('path'),
  R.filter(elm => elm.match(/\.html/i)),
  R.reduce(
    (acc, elm) => {
      const key = elm.split('.html')[0].split('/').pop();
      acc[key] = elm;
      return acc;
    },
    {}
  )
)(klawSync(dataDir,{nodir:true}));
