#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const get = require('lodash.get')
const mkdirp = require('mkdirp').sync
const readJson = from => (fs.existsSync(from) ? JSON.parse(fs.readFileSync(from, { encoding: 'utf8' })) : {})
const append = (from, to) => {
	const content = fs.readFileSync(from, { encoding: 'utf8' })
	mkdirp(path.dirname(to))
	fs.appendFileSync(to, content)
}

const defaultOptionsPath = path.resolve(__dirname, '../defaults/options.json')
fs.copyFileSync(defaultOptionsPath, '.cypress-scenario-runnerrc.json')

const cypress = readJson(path.resolve(process.cwd(), 'cypress.json'))

const defaultSupportPath = path.resolve(__dirname, '../defaults/support.js')
const supportPath = cypress.supportFile || 'cypress/support/index.js'
append(defaultSupportPath, supportPath)

const defaultPluginsPath = path.resolve(__dirname, '../defaults/plugins.js')
const pluginsPath = cypress.pluginsPath || 'cypress/plugins/index.js'
append(defaultPluginsPath, pluginsPath)

const defaultStepDefinitionsPath = path.resolve(__dirname, '../defaults/steps.js')
const stepDefinitionsPath = path.join(path.dirname(supportPath), 'step_definitions', 'index.js')
append(defaultStepDefinitionsPath, stepDefinitionsPath)

const preprocessorConfigPath = path.resolve(process.cwd(), '.cypress-cucumber-preprocessorrc.json')
const preprocessorConfig = { step_definitions: stepDefinitionsPath }
fs.writeFileSync(preprocessorConfigPath, JSON.stringify(preprocessorConfig, null, '\t'))
