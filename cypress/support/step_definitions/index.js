const { addSteps, getElementOptions } = require('../../../src/index')
const options = require('../../../cypress-scenario-runner.json')

addSteps({
	options,
	routes: {
		actions: '/cypress/pages/actions.html',
		assertions: '/cypress/pages/assertions.html',
		'input actions': '/cypress/pages/actions-inputs.html',
		'input assertions': '/cypress/pages/assertions-inputs.html',
	},
	steps: {
		'I double-click {element}': function(element, table, { options }) {
			cy.getElement(element).then($element => {
				const elementOptions = getElementOptions($element, options)
				cy.wrap($element).dblclick(elementOptions)
			})
		},
		'{element} should be even': function(element) {
			cy.getElement(element).should($element => expect($element.text() % 2 === 0))
		},
		'{element} should be odd': function(element) {
			cy.getElement(element).should($element => expect($element.text() % 2 !== 0))
		},
	},
})
