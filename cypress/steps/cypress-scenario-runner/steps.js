const { run, beforeEach, afterEach } = Cypress.env('utils');
const steps = Cypress.env('steps');
const preconditions = Cypress.env('preconditions');
const actions = Cypress.env('actions');
const assertions = Cypress.env('assertions');

beforeEach(function() {
	cy.wait(Cypress.config('defaultCommandWait') || 0);
});

afterEach(function() {
	// ...
});

for (const stepKey in steps.preconditions) {
	const step = steps.preconditions[stepKey];
	const fn = preconditions[stepKey];

	given(step, run(fn));
}

for (const stepKey in steps.actions) {
	const step = steps.actions[stepKey];
	const fn = actions[stepKey];

	given(step, run(fn));
	when(step, run(fn));
}

for (const stepKey in steps.assertions) {
	const step = steps.assertions[stepKey];
	const fn = assertions[stepKey];

	then(step, run(fn));
}

given('I set:', run(actions.inputTable));
