/* jshint  esnext: true, esversion:6 */
import 'app-module-path/register';
// Is equivalent to:
import { addPath } from 'app-module-path';
addPath(__dirname);
const electron = require('electron');
import * as interfaces from 'controller/interface';
import * as connecting from 'controller/connecting';
var app = electron.app;
connecting.init(app);
