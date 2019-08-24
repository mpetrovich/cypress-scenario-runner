const fs = require('fs')
const path = require('path')
const get = require('lodash.get')
const pkg = require('./package.json')
const cypress = fs.existsSync('./cypress.json') ? require('./cypress.json') : {}

const append = (src, dest) => {
	src = path.resolve(__dirname, src)
	content = '\n\n' + fs.readFileSync(src, { encoding: 'utf8' })
	fs.appendFileSync(dest, content)
}

append('../defaults/support.js', cypress.supportFile || 'cypress/support/index.js')
append('../defaults/plugins.js', cypress.pluginsFile || 'cypress/plugins/index.js')
append(
	'../defaults/steps.js',
	get(pkg, 'cypress-cucumber-preprocessor.step_definitions', 'cypress/support/step_definitions')
)
