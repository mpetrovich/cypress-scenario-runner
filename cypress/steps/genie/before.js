const { beforeEach } = Cypress.env('utils');

beforeEach(function() {
	cy.wait(Cypress.config('defaultCommandWait') || 0);
});
