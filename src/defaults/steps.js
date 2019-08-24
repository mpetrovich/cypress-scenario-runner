const { addSteps, getElementOptions } = require('cypress-scenario-runner')
const options = require('../../../cypress-scenario-runner')

addSteps({
	options,
	routes: {
		login: '/login',
		home: '/home',
	},
	steps: {
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
