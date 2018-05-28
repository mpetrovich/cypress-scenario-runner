const cucumber = require('cypress-cucumber-preprocessor').default;
const setupCommands = require('./commands');

function setupPlugins(on, config) {
	on('file:preprocessor', cucumber());
}

function setPages(pages) {
	Cypress.env('pages', pages);
}

function setLogins(logins) {
	Cypress.env('logins', logins);
}

module.exports = {
	setupCommands,
	setupPlugins,
	setPages,
	setLogins,
};
