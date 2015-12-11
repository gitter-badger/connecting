// report crashes to the Electron project
var electron = require('electron');
const Configstore = require('configstore');
const pkg = require('./../../package.json');
const conf = new Configstore(pkg.name);
console.log(`Last stored config: ${JSON.stringify(conf.all)}`);
console.log(conf.clientId);
require('crash-reporter').start();
// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();
// prevent window being garbage collected
// var patcher = require('./controller/patcher.js');
var config = require('simpler-config').load({
  login: require('../config/default.json'),
  patch: require('../model/connections.json')
});

import * as mqttControl from './mqtt-controlls';

export function patcher() {
}
export var mainWindow = null;
export var app = null;
var win = null;
export function init(global_app) {
  app = global_app;

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate-with-no-open-windows', () => {
    if (!mainWindow) {
      mainWindow = createMainWindow();
    }
  });

  app.on('ready', () => {
    mainWindow = createMainWindow();
    mqttControl.init();
  });

  app.on('quit',()=>{
    console.log(`writing settings to "${conf.path}" on quit`);
    conf.set(config.patch);
  });
}




function createMainWindow() {

  const win = new electron.BrowserWindow({
    width: 600,
    height: 460,
    'min-width': 600,
    'min-height': 460,
    // 'max-width': 600,
    // 'max-height': 460,
    'title-bar-style': 'hidden'
  });
  console.log('creating window');
  win.loadURL(`file://${__dirname}/../view/index.html`);
  win.on('closed', onClosed);
  return win;
}

function onClosed() {
  // dereference the window
  // for multiple windows store them in an array
  mainWindow = null;
}
