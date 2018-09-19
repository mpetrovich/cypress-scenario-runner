const merge = require('lodash.merge');
const defaultSteps = require('./steps');
const defaultBehaviors = require('./behaviors');

const beforeFns = [];
const afterFns = [];

function initSteps({ given, when, then, customSteps, actions: customActions, assertions: customAssertions, preconditions: customPreconditions }) {
	const steps = merge({}, defaultSteps, customSteps);
	const actions = Object.assign({}, defaultBehaviors.actions, customActions);
	const assertions = Object.assign({}, defaultBehaviors.assertions, customAssertions);
	const preconditions = Object.assign({}, defaultBehaviors.preconditions, customPreconditions);

	const pages = Cypress.env('cypress-scenario-runner.pages');
	const users = Cypress.env('cypress-scenario-runner.users');

	const context = { actions, assertions, preconditions, pages, users };

	/*
		Replaces custom parameter types like {page}, {user}, etc.
		with standard Gherkin parameters {string}, etc.
	 */

	for (const category in steps) {
		for (const stepKey in steps[category]) {
			steps[category][stepKey] = steps[category][stepKey].replace(/\{(page|user|element)\}/g, '{string}');
		}
	}

	/*
		Creates steps for preconditions
	 */

	for (const stepKey in steps.preconditions) {
		const step = steps.preconditions[stepKey];
		const fn = preconditions[stepKey];

		if (!fn) {
			throw new Error(`Precondition step function missing for ${stepKey}: ${step}`);
		}

		given(step, run(fn, context));
	}

	/*
		Creates steps for actions
	 */

	for (const stepKey in steps.actions) {
		const step = steps.actions[stepKey];
		const fn = actions[stepKey];

		if (!fn) {
			throw new Error(`Action step function missing for ${stepKey}: ${step}`);
		}

		given(step, run(fn, context));
		when(step, run(fn, context));
		then(step, run(fn, context));
	}

	/*
		Creates steps for assertions
	 */

	for (const stepKey in steps.assertions) {
		const step = steps.assertions[stepKey];
		const fn = assertions[stepKey];

		if (!fn) {
			throw new Error(`Assertion step function missing for ${stepKey}: ${step}`);
		}

		then(step, run(fn, context));
	}

	/*
		Special steps
	 */

	given('I set:', run(actions.inputTable, context));

	beforeEachStep(function() {
		cy.wait(Cypress.config('defaultCommandWait') || 0);
	});
}

function beforeEachStep(fn) {
	beforeFns.push(fn);
}

function afterEachStep(fn) {
	afterFns.push(fn);
}

function run(fn, context) {
	return function() {
		beforeFns.forEach(beforeFn => beforeFn());
		const args = [...arguments, context];
		const returned = fn.apply(this, args);
		afterFns.forEach(afterFn => afterFn());
		return returned;
	};
}

module.exports = initSteps;
