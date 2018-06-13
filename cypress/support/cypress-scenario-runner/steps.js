// This should be kept in sync with cypress-scenario-builder
const steps = {
	preconditions: {
		loggedOut: 'I am logged out',
		loggedIn: 'I am logged in as {string}',
	},
	actions: {
		navigate: 'I navigate to {page}',
		click: 'I click {element}',
		set: 'I set {element} to {string}',
		waitUntilHidden: 'I wait for {element} to be hidden',
		pause: 'I pause',
		debug: 'I debug',
	},
	assertions: {
		isOnPage: 'I will navigate to {page}',
		isNotOnPage: 'I will not navigate to {page}',
		isVisible: 'I will see {element}',
		isNotVisible: 'I will not see {element}',
		hasCount: 'I will see {number} instances of {element}',
		hasText: '{element} will be {string}',
		doesNotHaveText: '{element} will not be {string}',
		containsText: '{element} will contain {string}',
		doesNotContainText: '{element} will not contain {string}',
	},
};

// Replaces custom parameter types like {page}, {number}, etc. with standard Gherkin {string}, {int}, etc.
for (const category in steps) {
	for (const stepKey in steps[category]) {
		steps[category][stepKey] = steps[category][stepKey].replace(/({page}|{element})/g, '{string}');
		steps[category][stepKey] = steps[category][stepKey].replace(/({number})/g, '{int}');
	}
}

Cypress.env('steps', steps);
