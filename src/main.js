/* jshint  esnext: true, esversion:6 */
// var app = require('app');
const electron = require('electron');
import * as interfaces from './controller/interface';
import * as connecting from './controller/connecting';
var app = electron.app;
connecting.init(app);
