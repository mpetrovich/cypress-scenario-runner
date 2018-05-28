const setupCommands = require('./commands');

function setPages(pages) {
	Cypress.env('pages', pages);
}

function setLogins(logins) {
	Cypress.env('logins', logins);
}

module.exports = {
	setupCommands,
	setPages,
	setLogins,
};
