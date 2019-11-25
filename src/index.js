const { given } = require('cypress-cucumber-preprocessor/steps')
const faker = require('faker')

const defaultOptions = {
	elementAttr: 'data-test',
	elementValueAttr: 'data-value',
	elementOptionsAttr: 'data-options',
	elementOptions: {
		force: false,
	},
	defaultCommandWait: 0,
}

function addSteps({ steps: customSteps = {}, routes = {} } = {}) {
	const customOptions = {
		elementAttr: Cypress.config('elementAttr'),
		elementValueAttr: Cypress.config('elementValueAttr'),
		elementOptionsAttr: Cypress.config('elementOptionsAttr'),
		elementOptions: JSON.parse(Cypress.config('elementOptions') || '{}'),
		defaultCommandWait: Cypress.config('defaultCommandWait'),
	}
	const options = Object.assign({}, defaultOptions, customOptions)

	const defaultSteps = require('./steps')
	const steps = Object.assign({}, defaultSteps, customSteps)
	const normalizeStep = step => step.replace(/\{(route|element)\}/g, '{string}')

	for (const [step, fn] of Object.entries(steps)) {
		given(normalizeStep(step), function() {
			if (options.defaultCommandWait) {
				cy.wait(options.defaultCommandWait)
			}
			return fn.call(this, ...arguments, { steps, routes, options })
		})
	}
}

function addCommands() {
	const customOptions = {
		elementAttr: Cypress.config('elementAttr'),
		elementValueAttr: Cypress.config('elementValueAttr'),
		elementOptionsAttr: Cypress.config('elementOptionsAttr'),
		elementOptions: JSON.parse(Cypress.config('elementOptions') || '{}'),
		defaultCommandWait: Cypress.config('defaultCommandWait'),
	}
	const options = Object.assign({}, defaultOptions, customOptions)

	Cypress.Commands.add('getElement', element => getElement(element, options))
	Cypress.Commands.add('getInputElement', element => getInputElement(element, options))
	Cypress.Commands.add('setInputElement', (element, value) => setInputElement(element, value, options))
}

function getElement(element, options) {
	return cy.get(`[${options.elementAttr}="${element}"]`)
}

function getInputElement(element, options) {
	return cy.get(`[${options.elementAttr}="${element}"]:input, [${options.elementAttr}="${element}"] :input`)
}

function setInputElement(element, value, options) {
	const randomValueRegex = /<random ([^>]+)>/g

	if (randomValueRegex.test(value)) {
		value = value.replace(randomValueRegex, (match, type) => getRandomValue(type))
	}

	cy.getInputElement(element).then($element => {
		const elementOptions = getElementOptions($element, options)

		if ($element.is(':checkbox') || $element.is(':radio')) {
			if (value === 'checked') {
				// Explicitly checks a checkbox/radio
				cy.wrap($element).check(elementOptions)
			} else if (value === 'unchecked') {
				// Explicitly unchecks a checkbox/radio
				cy.wrap($element).uncheck(elementOptions)
			} else {
				// Checks a checkbox/radio by value
				const selectors = value
					.split(',')
					.map(val => val.trim())
					.map(val => `[${options.elementValueAttr}="${val}"], [value="${val}"]`)

				cy.wrap($element)
					.filter(selectors.join(', '))
					.check(elementOptions)
			}
		} else if ($element.is('select')) {
			// Selects an option by value or text content
			const values = value.split(',').map(s => s.trim())
			cy.wrap($element).select(values, elementOptions)
		} else {
			// Replaces the value for all other input types
			cy.wrap($element)
				.clear(elementOptions)
				.type(value, elementOptions)
		}
	})
}

function getElementOptions($element, options) {
	var opts
	return Object.assign(
		{},
		options.elementOptions,
		$element.attr(options.elementOptionsAttr) ? eval(`opts = ${$element.attr(options.elementOptionsAttr)}`) : {}
	)
}

function getRandomValue(type) {
	if (type === 'first name') {
		return faker.name.firstName()
	} else if (type === 'last name') {
		return faker.name.lastName()
	} else if (type === 'full name') {
		return faker.name.findName()
	} else if (type === 'phone') {
		return faker.phone.phoneNumberFormat()
	} else if (type === 'email') {
		return faker.internet.email()
	} else if (type === 'password') {
		return faker.internet.password()
	} else if (type === 'street address') {
		return faker.address.streetAddress()
	} else if (type === 'city') {
		return faker.address.city()
	} else if (type === 'state') {
		return faker.address.state()
	} else if (type === 'zip') {
		return faker.address.zipCode('#####')
	} else if (type === 'number') {
		return faker.random.number()
	} else if (type === 'dollar value') {
		return faker.finance.amount()
	} else {
		return faker.random.word()
	}
}

module.exports = { addSteps, addCommands, getElementOptions }
