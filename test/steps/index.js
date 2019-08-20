const runner = require('../../index')

const customSteps = {
	actions: {
		doubleClick: 'I double-click {element}',
	},
	assertions: {
		isEven: '{element} should be even',
		isOdd: '{element} should be odd',
	},
}

const actions = {
	doubleClick: function(elem) {
		cy.getElem(elem)
			.first()
			.dblclick()
	},
}

const assertions = {
	isEven: function(elem) {
		cy.getElem(elem).should($element => expect($element.text() % 2 === 0))
	},
	isOdd: function(elem) {
		cy.getElem(elem).should($element => expect($element.text() % 2 !== 0))
	},
}

runner.initSteps({ given, when, then, customSteps, actions, assertions })
