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

const supportTemplate = path.resolve(__dirname, '../templates/support.js')
const supportFile = cypress.supportFile || 'cypress/support/index.js'
append(supportTemplate, supportFile)

const pluginsTemplate = path.resolve(__dirname, '../templates/plugins.js')
const pluginsFile = cypress.pluginsFile || 'cypress/plugins/index.js'
append(pluginsTemplate, pluginsFile)

const stepsTemplate = path.resolve(__dirname, '../templates/steps.js')
const stepsFile = path.join(path.dirname(supportFile), 'steps', 'index.js')
append(stepsTemplate, stepsFile)

const preprocessorConfig = JSON.stringify({ step_definitions: stepsFile }, null, '\t')
const preprocessorFile = path.resolve(process.cwd(), '.cypress-cucumber-preprocessorrc')
fs.writeFileSync(preprocessorFile, preprocessorConfig)
