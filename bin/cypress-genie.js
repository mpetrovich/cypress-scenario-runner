#!/usr/bin/env node

const mergedirs = require('merge-dirs').default;
const exec = require('child_process').exec;

const command = process.argv[1];
const path = require('path');
const pwd = path.resolve();
const src = path.resolve(__dirname, 'cypress');
const dest = path.resolve(pwd, 'cypress');

if (command === 'install') {
	mergedirs(src, dest, 'skip');
}
else if (command === 'uninstall') {
	exec(`rm -rf ${dest}/*/genie/`);
}
else {
	console.log('Unsupported command: ' + command);
}
