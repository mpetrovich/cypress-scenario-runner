# Cypress Scenario Runner [![npm version](https://badge.fury.io/js/cypress-scenario-runner.svg)](https://badge.fury.io/js/cypress-scenario-runner) [![Build Status](https://travis-ci.org/mpetrovich/cypress-scenario-runner.svg?branch=master)](https://travis-ci.org/mpetrovich/cypress-scenario-runner)

**Run [Gherkin scenarios](https://docs.cucumber.io/gherkin/reference/) with [Cypress](https://www.cypress.io) without a single line of code.**

By adding a few HTML attributes:

```html
<input … data-test="email input" />
<input … data-test="password input" />
<button … data-test="login button">Login</button>
```

Cypress Scenario Runner can run Gherkin scenarios without you needing to write any Cypress code like `cy.visit()` or `cy.click()`:

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

- [Installation](#installation)
- [Usage](#usage)
  - [Writing test scenarios](#writing-test-scenarios)
  - [Annotating HTML elements](#annotating-html-elements)
  - [Setting routes](#setting-routes)
  - [Running scenarios](#running-scenarios)
- [Configuration](#configuration)
- [Contributing](CONTRIBUTING.md)

## Installation

Requires:

- Node.js 8.0+
- [`cypress`](https://github.com/cypress-io/cypress/)
- [`cypress-cucumber-preprocessor`](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor)

```sh
npm install --save-dev cypress cypress-cucumber-preprocessor cypress-scenario-runner
$(npm bin)/install-cypress-scenario-runner
```

The installer will create or modify a handful of files. You should review and commit those changes.

## Usage

### Writing test scenarios

Test scenarios are written in [Gherkin syntax](https://cucumber.io/docs/gherkin/reference/):

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

Each line in the scenario is called a _step_. `cypress-scenario-runner` works by using a predefined set of reusable step templates:

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

Text in `{brackets}` above are parameters whose values must be (double) quoted in the scenario. For example, this step template:

```sh
I set {element} to {string}
```

would appear as this in the scenario:

```sh
And I set "email input" to "name@example.com"
```

In addition, the full [Gherkin specification](https://cucumber.io/docs/gherkin/reference/) is supported along with [additional enhancements](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor#background-section) by `cypress-cucumber-preprocessor`. For instance, you can use scenario templates/outlines, data tables, and tags in your scenarios.

See the [`cypress/integration/`](cypress/integration/) directory for more examples.

### Annotating HTML elements

HTML attributes are used to map `{element}` step parameters to their corresponding HTML elements. `data-test` attributes is used by default, but this is [configurable](#configuration).

```html
<!-- login.html -->
<input name="email" data-test="email input" />
<input name="password" data-test="password input" />
<button type="submit" data-test="login button">Login</button>
```

### Setting routes

Routes need to be provided for navigation steps like these to work:

```sh
Given I navigate to "login"
```

A map of all label => path routes should be provided to `addSteps()` in the `cypress/support/step_definitions/index.js` file created during installation. Route paths can be absolute URLs or relative to the web root.

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

## Configuration

Coming soon.
