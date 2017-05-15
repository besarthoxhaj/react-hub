'use strict';

const path = require('path');
const url = require('url');
const fs = require('fs-extra');
const electron = require('electron');
const once = require('once');

const { BrowserWindow } = electron;
const makeAsync = require('../utils/async');
const IMG = `${process.cwd()}/screenshots/imgs`;

module.exports = () => {

  const data = require('../screenshots');
  const currentBrowser = new BrowserWindow({width:1200,height:600});
  const async = makeAsync(currentBrowser);

  Object.keys(data).forEach(elm => {
    const file = data[elm];
    async.add((next,browser) => {

      const callbackLoad = once(() => {
        console.log(`elm`,elm);
        browser.capturePage({
          x: 0,
          y: 0,
          width: 1200,
          height: 600,
        }, img => {
          fs.writeFileSync(`${IMG}/${elm}.png`,img.toPNG());
          next();
        });
      });

      browser.loadURL(`file://${file}`);

      browser.webContents.on('did-finish-load', callbackLoad);
    });
  });

  async(next => {
    console.log('LAST???');
    currentBrowser.close();
    next();
  });
};
