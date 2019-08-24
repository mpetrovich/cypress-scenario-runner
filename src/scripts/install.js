#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const get = require('lodash.get')
const mkdirp = require('mkdirp').sync
const read = from => (fs.existsSync(from) ? fs.readFileSync(from, { encoding: 'utf8' }) : null)
const copy = (from, to) => fs.copyFileSync(from, to)
const append = (from, to) => {
	mkdirp(path.dirname(to))
	fs.appendFileSync(to, '\n' + fs.readFileSync(from, { encoding: 'utf8' }))
}

const pkg = read(path.resolve(process.cwd(), 'package.json')) || {}
const cypress = read(path.resolve(process.cwd(), 'cypress.json')) || {}

copy(path.resolve(__dirname, '../defaults/options.json'), 'cypress-scenario-runner.json')
append(path.resolve(__dirname, '../defaults/support.js'), cypress.supportFile || 'cypress/support/index.js')
append(path.resolve(__dirname, '../defaults/plugins.js'), cypress.pluginsFile || 'cypress/plugins/index.js')
append(
	path.resolve(__dirname, '../defaults/steps.js'),
	get(pkg, 'cypress-cucumber-preprocessor.step_definitions', 'cypress/support/step_definitions/index.js')
)
