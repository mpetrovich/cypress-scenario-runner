Genie
===
Framework-agnostic UI behavioral test runner for Cypress.


Prerequisites
---
- Node 6+


Installation
---
#### 1. Install [Cypress](https://www.cypress.io/) and Genie
```sh
npm install --save-dev cypress cypress-genie
```

#### 2. Launch Cypress at least once to create the initial `cypress/` directory structure
```sh
$(npm bin)/cypress open
```

#### 3. Run the Genie installer
```sh
$(npm bin)/cypress-genie install
```

#### 4. Configure Cypress to include the correct Genie assets

Add this to `package.json`:
```
  "cypress-cucumber-preprocessor": {
    "step_definitions": "cypress/steps/"
  }
```

Add this to `cypress/plugins/index.js`:
```js
const genie = require('./genie/index');

module.exports = (on, config) => {
	genie(on, config);
	...
};
```

Add this to `cypress/support/index.js`:
```js
require('./genie/index');
```


Configuration
---
Genie adds several configuration settings.

Parameter | Default | Description
--- | --- | ---
`defaultCommandWait` | `0` | Number of milliseconds to wait before each scenario step. Useful if the UI needs a delay for DOM elements to update.
`elementAttributeName` | `test-el` | Name of the attribute whose value is used to match given/when/then steps
`valueAttributeName` | `test-val` | Name of the attribute whose value is used to match multi-checkbox inputs


Usage
---
Coming soon.


Removal
---
```sh
$(npm bin)/cypress-genie uninstall
npm uninstall cypress-genie --save-dev
```
