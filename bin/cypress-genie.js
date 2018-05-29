#!/usr/bin/env node

const mergedirs = require('merge-dirs').default;
const exec = require('child_process').exec;

const command = process.argv[2];
const path = require('path');
const pwd = path.resolve();
const src = path.resolve('node_modules', 'cypress-genie', 'cypress');
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
