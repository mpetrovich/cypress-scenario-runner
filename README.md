Genie
===
Framework-agnostic UI behavioral test runner.


Prerequisites
---
- Node 6+


Installation
---
#### 1. Install [Cypress](https://www.cypress.io/) and Genie.
```sh
npm install --save-dev cypress cypress-genie
```

#### 2. Launch Cypress at least once to create the initial `cypress/` directory structure.
```sh
$(npm bin)/cypress open
```

#### 3. Run the Genie installer.
```sh
$(npm bin)/cypress-genie
```

#### 4. Configure Cypress to include the correct Genie assets.

Add this to `package.json`:
```
  ...
  "cypress-cucumber-preprocessor": {
    "step_definitions": "cypress/steps/"
  }
```

Add this to `cypress/plugins/index.js`:
```js
module.exports = (on, config) => {
	...
	require('./genie/index');
};
```

Add this to `cypress/support/index.js`:
```js
require('./genie/index');
```
