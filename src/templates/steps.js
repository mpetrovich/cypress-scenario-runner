const { addSteps, getElementOptions } = require('cypress-scenario-runner')

addSteps({
	routes: {
		// Examples to replace with your own
		// see https://github.com/mpetrovich/cypress-scenario-runner#customization
		login: '/login.html',
		home: '/home.html',
	},
	steps: {
		// Examples to replace with your own
		// see https://github.com/mpetrovich/cypress-scenario-runner#customization
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
