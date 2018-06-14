/*
	Replace the pages with your own, then rename and include this file via:

		require('./pages');

	from support/index.js
 */

Cypress.env('pages', {
	'login': '/login',
	'home': '/home',
	'projects': '/projects',
	'a project': /\/projects\/\d+$/,
});
