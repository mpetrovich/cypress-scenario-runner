const initCommands = require('./src/init-commands');
const initSteps = require('./src/init-steps');

class Runner {

	setPages(pages) {
		Cypress.env('cypress-scenario-runner.pages', pages);
	}

	setUsers(users) {
		Cypress.env('cypress-scenario-runner.users', users);
	}

	initCommands(params) {
		initCommands(params);
	}

	initSteps(params) {
		initSteps(params);
	}
}

module.exports = new Runner();
