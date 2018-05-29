const mergedirs = require('merge-dirs');
const path = require('path');
const pwd = path.resolve();

const src = path.resolve(__dirname, 'cypress');
const dest = path.resolve(pwd, 'cypress');

mergedirs(src, dest, 'skip');
