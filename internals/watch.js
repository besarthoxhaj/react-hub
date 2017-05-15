'use strict';

const nodemon = require('nodemon');

nodemon({
  script: 'electron src/main.js',
  ignore: 'app/*',
  env: {
    TEST_PART: process.argv[2]
  },
}).on('start', function () {
  // process started correctly
}).on('restart', function() {
  // Only clear the console if it's an interactive terminal.
  if (process.stdout.isTTY) {
    process.stdout.write('\u001b[2J')
    process.stdout.write('\u001b[1;1H')
    process.stdout.write('\u001b[3J')
  }

  console.log('RESTARTING TESTS\n');
}).on('crash', function () {

}).on('exit', function() {
  // process exit correctly with no
  // errors
});
