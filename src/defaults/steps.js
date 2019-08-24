const { addSteps, getElementOptions } = require('cypress-scenario-runner')
const options = require('../../../cypress-scenario-runner.json')

addSteps({
	options,
	routes: {
		// Examples, replace with your own
		// see https://github.com/mpetrovich/cypress-scenario-runner#configuration
		login: '/login',
		home: '/home',
	},
	steps: {
		// Examples, replace with your own
		// see https://github.com/mpetrovich/cypress-scenario-runner#configuration
		'I double-click {element}': function(element, table, { options }) {
			cy.getElement(element).then($element => {
				const elementOptions = getElementOptions($element, options)
				cy.wrap($element).dblclick(elementOptions)
			})
		},
		'{element} should be an even number': function(element) {
			cy.getElement(element).should($element => expect($element.text() % 2 === 0))
		},
	},
})