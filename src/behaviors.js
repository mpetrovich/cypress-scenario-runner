const elAttrName = Cypress.config('elementAttributeName') || 'data-test';

module.exports = {

	actions: {

		login: function() {
			throw new Error('You must implement login yourself');
		},

		logout: function() {
			cy.clearCookies();
		},

		navigate: function(page, table, { pages }) {
			cy.visit(pages[page]);
		},

		click: function(name) {
			cy.getElem(name).first().click();
		},

		set: function(field, value) {
			cy.getInput(field).input(value);
		},

		pause: function() {
			cy.pause();
		},

		debug: function() {
			cy.debug();
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
				let $element = $html.find(`[${elAttrName}="${name}"]`);
				poll($element, resolve);
			}));
		},

		inputTable: function(table, { actions }) {
			for (const row of table.raw()) {
				let [field, value] = row;
				actions.set(field, value);
			}
		},
	},

	assertions: {

		isOnPage: function(page, table, { pages }) {
			let path = pages[page];
			let comparator = path instanceof RegExp ? 'match' : 'eq';
			cy.location('pathname').should(comparator, path);
		},

		isNotOnPage: function(page, table, { pages }) {
			let path = pages[page];
			let comparator = path instanceof RegExp ? 'not.match' : 'not.eq';
			cy.location('pathname').should(comparator, path);
		},

		isVisible: function(name) {
			cy.getElem(name).should('be.visible').and('not.empty');
		},

		isNotVisible: function(name) {
			cy.getElem(name).should('not.be.visible');
		},

		hasCount: function(count, name) {
			cy.getElem(name).should('have.length', count);
		},

		hasText: function(name, value) {
			cy.getElem(name).should($element => expect($element.text().trim().toLowerCase()).to.eq(value.toLowerCase()));
		},

		doesNotHaveText: function(name, value) {
			cy.getElem(name).should($element => expect($element.text().trim().toLowerCase()).not.to.eq(value.toLowerCase()));
		},

		containsText: function(name, value) {
			cy.getElem(name).should($element => expect($element.text().toLowerCase()).to.contain(value.toLowerCase()));
		},

		doesNotContainText: function(name, value) {
			cy.getElem(name).should($element => expect($element.text().toLowerCase()).not.to.contain(value.toLowerCase()));
		},
	},

	preconditions: {

		loggedIn: function(usertype, table, context) {
			context.actions.login(usertype, table, context);
		},

		loggedOut: function(table, context) {
			context.actions.logout(table, context);
		},
	},
};
