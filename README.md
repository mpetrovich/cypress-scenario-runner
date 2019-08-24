# Cypress Scenario Runner [![npm version](https://badge.fury.io/js/cypress-scenario-runner.svg)](https://badge.fury.io/js/cypress-scenario-runner) [![Build Status](https://travis-ci.org/mpetrovich/cypress-scenario-runner.svg?branch=master)](https://travis-ci.org/mpetrovich/cypress-scenario-runner)

**Run [Gherkin scenarios](https://docs.cucumber.io/gherkin/reference/) with [Cypress](https://www.cypress.io) without a single line of code.**

By adding a few HTML attributes:

```html
<input … data-test="email input" />
<input … data-test="password input" />
<button … data-test="login button">Login</button>
```

Cypress Scenario Runner can run Gherkin scenarios without any Cypress code like `cy.visit()`, `cy.click()`:

```sh
Feature: Login
===

Scenario: Successful login
---
Given I navigate to "login"
And I set "email input" to "name@example.com"
And I set "password input" to "abc123"
When I click "login button"
Then I should be on "home"
```

## Table of contents

- [Installation & setup](#installation--setup)
- [Usage](#usage)
- [Customization](#customization)
- [Contributing](#CONTRIBUTING.md)

## Installation

Cypress Scenario Runner requires Node.js v8.0+, [`cypress`](https://github.com/cypress-io/cypress/), and [`cypress-cucumber-preprocessor`](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor).

```sh
npm install --save-dev cypress cypress-cucumber-preprocessor cypress-scenario-runner
```

## Configuration

TBD

## Installation & setup

1. [Install packages](#install-packages)
1. [Set up Cypress](#set-up-cypress)
1. [Set up Cypress Scenario Runner](#set-up-cypress-scenario-runner)

**NOTE:** Cypress Scenario Runner requires Node.js v8.0+

### 1. Install packages

Install `cypress-scenario-runner` and its dependencies, [`cypress`](https://github.com/cypress-io/cypress/) and [`cypress-cucumber-preprocessor`](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor):

```sh
npm install --save-dev cypress cypress-cucumber-preprocessor cypress-scenario-runner
```

### 2. Set up Cypress

Follow the setup instructions for [Cypress](https://github.com/cypress-io/cypress/) and launch its GUI at least once in order to create the initial Cypress directory structure.

### 3. Set up cypress-scenario-runner

Edit the [Cypress plugins file](https://docs.cypress.io/guides/references/configuration.html#Folders-Files):

```js
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
	on('file:preprocessor', cucumber())
}
```

Edit the [Cypress support file](https://docs.cypress.io/guides/references/configuration.html#Folders-Files):

```js
const { addCommands } = require('cypress-scenario-runner')
addCommands()
```

Create a new file at `cypress/support/step_definitions/index.js`:

```js
const { addSteps } = require('cypress-scenario-runner')
addSteps()
```

Now you're ready to begin writing test scenarios.

## Usage

- [Writing test scenarios](#writing-test-scenarios)
- [Annotating HTML elements](#annotating-html-elements)
- [Setting routes](#setting-routes)
- [Running scenarios](#running-scenarios)

### Writing test scenarios

Test scenarios are written in [Gherkin syntax](https://cucumber.io/docs/gherkin/reference/) which looks like this:

```sh
Feature: Login
===

Scenario: Successful login
---
Given I navigate to "login"
And I set "email input" to "name@example.com"
And I set "password input" to "abc123"
When I click "login button"
Then I should be on "home"
```

Each given/when/then/and line is called a "step". `cypress-scenario-runner` works by using a comprehensive set of reusable step templates that have already been implemented behind the scenes:

| Step                                      | Description |
| ----------------------------------------- | ----------- |
| `I navigate to {route}`                   | …           |
| `I click {element}`                       | …           |
| `I set {element} to {string}`             | …           |
| `I set:`                                  | …           |
| `I wait for {element} to disappear`       | …           |
| `I wait {float} seconds`                  | …           |
| `I pause`                                 | …           |
| `I debug`                                 | …           |
| `I should be on {route}`                  | …           |
| `I should not be on {route}`              | …           |
| `{element} should be visible`             | …           |
| `{element} should not be visible`         | …           |
| `{element} should have {int} occurrences` | …           |
| `{element} should be {string}`            | …           |
| `elements should be:`                     | …           |
| `{element} should be set to {string}`     | …           |
| `{element} should not be {string}`        | …           |
| `{element} should contain {string}`       | …           |
| `elements should contain:`                | …           |
| `{element} should not contain {string}`   | …           |

Parameters appear in `{brackets}` in step templates and in `"double quotes"` in the scenario. For example, this step:

```sh
And I set "email input" to "name@example.com"
```

corresponds to this step template:

```sh
I set {element} to {string}
```

where:

```
{element} = email input
{string}  = name@example.com
```

In addition, the full [Gherkin specification](https://cucumber.io/docs/gherkin/reference/) is supported along with [additional enhancements](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor#background-section) by `cypress-cucumber-preprocessor`. For instance, you can use scenario templates/outlines, data tables, and tags in your scenarios.

See the [`cypress/integration/`](cypress/integration/) directory for more examples.

### Annotating HTML elements

HTML attributes are used to map the `{element}` step parameters to their corresponding HTML elements. `data-test` is used by default, but this is [configurable](#customization).

```html
<!-- login.html -->
<input name="email" data-test="email input" />
<input name="password" data-test="password input" />
<button type="submit" data-test="login button">Login</button>
```

### Setting routes

Routes need to provided for navigation steps like these to work:

```sh
Given I navigate to "login"
```

A map of all label => path routes should be provided to `addSteps()` in the `cypress/support/step_definitions/index.js` file created during installation. Route paths can be relative to the web root or absolute URLs.

```diff
const { addSteps } = require('cypress-scenario-runner')
addSteps({
+	routes: {
+		login: '/login',
+	},
})
```

### Running scenarios

Scenario files can be run directly with Cypress:

```sh
$(npm bin)/cypress run [files]
```

or, using the Cypress UI:

```sh
$(npm bin)/cypress open
```

## Customization

Coming soon.
