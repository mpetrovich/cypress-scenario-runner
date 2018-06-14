const pages = Cypress.env('pages');

const assertions = {

	isOnPage: function(page) {
		let path = pages[page];
		let comparator = path instanceof RegExp ? 'match' : 'eq';
		cy.location('pathname').should(comparator, path);
	},

	isNotOnPage: function(page) {
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

};

Cypress.env('assertions', assertions);
