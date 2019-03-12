'use strict';
/* global require, module, console, __dirname */

var exec    = require('child_process').exec;

module.exports = function (cmd, arg, cb) {
  if (arg !== null || arg !== undefined) {
    arg = ' ' + arg;
  } else { arg = ''; }

  if (cb === 'log') {
    cb = function (err, stdout, stderr) {
      console.log('stout: ' + stdout);
      console.log('stderr: ' + stderr);
    };
  }

  exec('osascript ' + 
         (__dirname + '/SpotifyControl.scpt').replace(' ', '\\ ') +
         ' ' + cmd + arg
      , cb);
};