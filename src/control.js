var exec    = require('child_process').exec;

module.exports = function (cmd, arg, cb) {
  if (arg !== null || arg !== undefined) {
    arg = ' ' + arg;
  } else { arg = ''; }

  var cb;
  if (cb === 'log') {
    cb = function (err, stdout, stderr) {
      console.log(stdout);
    }
  }

  exec('osascript ' + 
         (__dirname + '/SpotifyControl.scpt').replace(' ', '\\ ') +
         ' ' + cmd + arg
      , cb);
}