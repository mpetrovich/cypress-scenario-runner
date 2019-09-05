#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp').sync
const readJson = from => (fs.existsSync(from) ? JSON.parse(fs.readFileSync(from, { encoding: 'utf8' })) : {})
const append = (from, to) => {
	const content = fs.readFileSync(from, { encoding: 'utf8' })
	mkdirp(path.dirname(to))
	fs.appendFileSync(to, content)
}

const cypress = readJson(path.resolve(process.cwd(), 'cypress.json'))

const defaultSupportPath = path.resolve(__dirname, '../templates/support.js')
const supportPath = cypress.supportFile || 'cypress/support/index.js'
append(defaultSupportPath, supportPath)

const defaultPluginsPath = path.resolve(__dirname, '../templates/plugins.js')
const pluginsPath = cypress.pluginsFile || 'cypress/plugins/index.js'
append(defaultPluginsPath, pluginsPath)

const defaultStepDefinitionsPath = path.resolve(__dirname, '../templates/steps.js')
const stepDefinitionsPath = path.join(path.dirname(supportPath), 'step_definitions', 'index.js')
append(defaultStepDefinitionsPath, stepDefinitionsPath)
