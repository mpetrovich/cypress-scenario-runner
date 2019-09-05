#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const get = require('lodash.get')
const cosmiconfig = require('cosmiconfig')
const mkdirp = require('mkdirp').sync
const readJson = from => (fs.existsSync(from) ? JSON.parse(fs.readFileSync(from, { encoding: 'utf8' })) : {})
const append = (from, to) => {
	const content = fs.readFileSync(from, { encoding: 'utf8' })
	mkdirp(path.dirname(to))
	fs.appendFileSync(to, content)
}

const defaultConfigFile = path.resolve(__dirname, '../defaults/config.json')
fs.copyFileSync(defaultConfigFile, 'cypress-scenario-runner.json')

const defaultStepDefinitionsFile = path.resolve(__dirname, '../defaults/steps.js')
const preprocessor = get(cosmiconfig('cypress-cucumber-preprocessor').searchSync(), 'config', {})
const stepDefinitionsDir = preprocessor.step_definitions || 'cypress/support/step_definitions'
const stepDefinitionsFile = path.resolve(stepDefinitionsDir, 'index.js')
append(defaultStepDefinitionsFile, stepDefinitionsFile)

const cypress = readJson(path.resolve(process.cwd(), 'cypress.json'))

const defaultSupportFile = path.resolve(__dirname, '../defaults/support.js')
const supportFile = cypress.supportFile || 'cypress/support/index.js'
append(defaultSupportFile, supportFile)

const defaultPluginsFile = path.resolve(__dirname, '../defaults/plugins.js')
const pluginsFile = cypress.pluginsFile || 'cypress/plugins/index.js'
append(defaultPluginsFile, pluginsFile)
