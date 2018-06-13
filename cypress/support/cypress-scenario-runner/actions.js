const pages = Cypress.env('pages');
const users = Cypress.env('users');

const elAttrName = Cypress.config('elementAttributeName') || 'test-el';

const actions = {

	navigate: function(page) {
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

	inputTable: function(table) {
		for (const row of table.raw()) {
			let [field, value] = row;
			actions.input(field, value);
		}
	},

};

Cypress.env('actions', actions);
