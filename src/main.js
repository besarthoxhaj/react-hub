'use strict';

const electron = require('electron');
const path = require('path');
const url = require('url');
const { app, BrowserWindow, ipcMain } = electron;

const screener = require('./screening');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({width: 1200, height: 800});

  if (process.env.NODE_ENV === 'dev') {
    mainWindow.loadURL(`file://${process.cwd()}/app/index.html`);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(`file://${process.cwd()}/build/index.html`);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log('MAIN: got something');
  screener();
  event.sender.send('asynchronous-reply', 'pong');
});
