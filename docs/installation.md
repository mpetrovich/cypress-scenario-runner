Installation
===


1. Install all required packages
---

- [Cypress](https://github.com/cypress-io/cypress/)
- [cypress-cucumber-preprocessor](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor)
- [cypress-scenario-runner](https://github.com/nextbigsoundinc/cypress-scenario-runner)
```sh
npm install --save-dev cypress cypress-cucumber-preprocessor cypress-scenario-runner
```


2. Launch Cypress
---

It needs to be launched at least once to create the initial `cypress/` directory structure.

```sh
$(npm bin)/cypress open
```
You are free to rename and reorganize directories. If you do, adjust the settings below accordingly.


3. Configure Cypress
---

#### a. Specify where to keep steps files

This can be located anywhere but is recommended to be within the Cypress directory.

Add this to `package.json`:
```
  "cypress-cucumber-preprocessor": {
    "step_definitions": "cypress/steps/"
  }
```

#### b. (optional) Add a `cypress.json` file to customize Cypress

If you modified the default Cypress directory structure or want to [customize the Cypress configuration](https://docs.cypress.io/guides/references/configuration.html), you will need to create a new `cypress.json` file at the root of your project:

```json
{
	"pluginsFile": "cypress/plugins/index.js",
	"supportFile": "cypress/support/index.js",
	"integrationFolder": "cypress/features",
	"fixturesFolder": "cypress/fixtures",
	"screenshotsFolder": "cypress/screen-captures",
	"videosFolder": "cypress/screen-captures"
}
```

#### c. Modify the Cypress plugins file

By default, the plugin file is located at `cypress/plugins/index.js`.

```js
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = (on, config) => {
   on('file:preprocessor', cucumber());
   ...
   return config;
};
```

#### d. Modify the Cypress support file

By default, the support file is located at `cypress/support/index.js`.

```js
const pages = {
	'login': '/login',
	'signup': '/signup',
	'home': '/projects',
	'a project': /\/projects\/\d+$/,
	...
};

const users = {
	'a user': {
		email: 'name@example.com',
		password: 'abc123'
	},
	'an admin user': {
		email: 'admin@example.com',
		password: 'def456'
	},
	...
};

const runner = require('cypress-scenario-runner');
runner.setPages(pages);
runner.setUsers(users);
runner.initCommands();
```

#### e. Create a new steps file

Create a new `index.js` file in same directory that you specified for `step_definitions` in step (a). It should contain:
```js
const runner = require('cypress-scenario-runner');

runner.initSteps({ given, when, then });
```
If your tests perform login behaviors, you will need to also [add a custom login behavior](custom-behaviors.md#example) since none is included by default.
