const pages = Cypress.env('pages');
const logins = Cypress.env('logins');

const actions = {

	logout: function() {
		cy.clearCookies();
	},

	navigate: function(page) {
		cy.visit(pages[page]);
	},

	click: function(name) {
		cy.getElem(name).first().click();
	},

	input: function(field, value) {
		cy.getInput(field).input(value);
	},

	pause: function() {
		cy.pause();
	},

	debug: function() {
		cy.debug();
	},

	login: function(usertype) {
		let { email, password } = logins[usertype];
		actions.logout();
		actions.navigate('login');
		cy.getInput('email').type(email);
		cy.getInput('password').type(password);
		cy.getInput('remember').check();
		actions.click('login button');
	},

	inputTable: function(table) {
		for (const row of table.raw()) {
			let [field, value] = row;
			actions.input(field, value);
		}
	},

	waitUntilHidden: function(name) {
		const poll = function($element, resolve) {
			if ($element && $element.is(':visible')) {
				setTimeout(() => poll($element, resolve), 500);
			}
			else {
				resolve();
			}
		};
		cy.get('html').then($html => new Promise(function(resolve, reject) {
			let $element = $html.find(`[test-el="${name}"]`);
			poll($element, resolve);
		}));
	},

};

Cypress.env('actions', actions);
