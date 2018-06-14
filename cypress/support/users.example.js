/*
	Replace the users with your own, then rename and include this file via:

		require('./users');

	from support/index.js
 */

Cypress.env('users', {
	'a user': {
		email: 'name@example.com',
		password: 'abc123'
	},
	'an admin user': {
		email: 'admin@example.com',
		password: 'def456'
	},
});
