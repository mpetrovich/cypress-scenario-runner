const users = Cypress.env('users');
const actions = Cypress.env('actions');

const preconditions = {

	loggedIn: function(usertype) {
		let { email, password } = users[usertype];
		actions.logout();
		actions.navigate('login');
		cy.getInput('email').type(email);
		cy.getInput('password').type(password);
		cy.getInput('remember').check();
		actions.click('login button');
	},

	loggedOut: function() {
		cy.clearCookies();
	},

};

Cypress.env('preconditions', preconditions);
