Custom Behaviors
===

To modify existing behaviors or add new ones, pass your custom behaviors to `initSteps()`:
```js
initSteps({ preconditions, actions, assertions, ... })
```
where:
- `preconditions`: behaviors that establish the initial conditions of a test
- `actions`: behaviors that can be initiated by a user
- `assertions`: behaviors that verify the conditions of the UI state

Each of those are an object of key-value pairs, where the key is the key of a specific step and the value is a function. For instance, here are a few of the default behaviors:
```js
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

	...
},

assertions: {

	isOnPage: function(page, table, { pages }) {
		let path = pages[page];
		let comparator = path instanceof RegExp ? 'match' : 'eq';
		cy.location('pathname').should(comparator, path);
	},

	isVisible: function(name) {
		cy.getElem(name).should('be.visible').and('not.empty');
	},

	hasText: function(name, value) {
		cy.getElem(name).should($element => expect($element.text().trim().toLowerCase()).to.eq(value.toLowerCase()));
	},

	...
},

preconditions = {

	loggedIn: function(usertype, table, context) {
		context.actions.login(usertype, table, context);
	},

	...
},
```

Each behavior function has a signature of `(stepParam1, stepParam2,... , table, context)` where:
- `stepParam*`: the parameters from the step (ie. placeholder values like `{string}`, `{page}` in the step). If the step has no parameters, these arguments will be omitted.
- `table`: a [data table](https://docs.cucumber.io/gherkin/reference/#data-tables) for the step if provided. If not provided, this will still be included in the arguments list but will be `undefined`.
- `context`: an object containing `{ actions, assertions, preconditions, pages, users }`:
	- `preconditions`: Object map of all preconditions
	- `actions`: Object map of all actions
	- `assertions`: Object map of all assertions
	- `pages`: Object map of all pages
	- `users`: Object map of all users

The Cypress test instance `cy` is also available within each behavior function.


Example
---

As you may have noticed above, there is no default behavior for logging in since login is a very app-specific behavior. Consequently, a custom login behavior needs to be added if your tests require logging in to your application under test.

Here is a custom login action that navigates to a login page, enters credentials, and submits the login:
```js
const actions = {
	login: function(usertype, table, { actions, pages, users }) {
		let { email, password } = users[usertype];
		actions.logout();
		cy.visit(pages.login);
		cy.getInput('email').type(email);
		cy.getInput('password').type(password);
		actions.click('login button');
	}
};

runner.initSteps({ given, when, then, actions });
```
By default, the `loggedIn` precondition is an alias for the `login` action and will automatically call your custom `login` action instead of the default one.
