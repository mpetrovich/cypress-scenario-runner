# Cypress Scenario Runner [![npm version](https://badge.fury.io/js/cypress-scenario-runner.svg)](https://badge.fury.io/js/cypress-scenario-runner) [![Build Status](https://travis-ci.org/mpetrovich/cypress-scenario-runner.svg?branch=master)](https://travis-ci.org/mpetrovich/cypress-scenario-runner)

**Run [Gherkin scenarios](https://docs.cucumber.io/gherkin/reference/) in [Cypress](https://www.cypress.io) without a single line of code.**

By adding a few HTML attributes:

```html
<input … data-test="email input" />
<input … data-test="password input" />
<button … data-test="login button">Login</button>
```

Cypress Scenario Runner can run Gherkin scenarios without you needing to write any Cypress glue code like `cy.visit()` or `cy.click()`:

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
  - [Tagging elements](#tagging-elements)
  - [Setting routes](#setting-routes)
  - [Running scenarios](#running-scenarios)
- [Customization](#customization)
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

#### Actions

| Step                                         | Description                                                                                                                      | Examples                                                               |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| <pre>I navigate to {route}</pre>             | Navigates the browser to a preconfigured route (see [Setting routes](#setting-routes)) or an absolute URL                        | [`navigation.feature`](cypress/integration/navigation.feature)         |
| <pre>I click {element}</pre>                 | Clicks the first element with a matching tag (see [Tagging elements](#tagging-elements))                                         | [`pointer-events.feature`](cypress/integration/pointer-events.feature) |
| <pre>I set {element} to {string}</pre>       | Sets the first matching input to the given value (see [Working with inputs](#working-with-inputs))                               | [`input/`](cypress/integration/input/)                                 |
| <pre>I set:</pre>                            | Same as the step above, but for setting multiple inputs using an inline data table (see [Using data tables](#using-data-tables)) | [`input/`](cypress/integration/input/)                                 |
| <pre>I wait for {element} to disappear</pre> | Waits for all matching elements to be invisible (ie. `is(':visible')` returns false), checking every 500ms                       | [`visibility.feature`](cypress/integration/visibility.feature)         |
| <pre>I wait {float} seconds</pre>            | Pauses test execution for the specified number of seconds; fractional seconds allowed                                            | [`miscellaneous.feature`](cypress/integration/miscellaneous.feature)   |
| <pre>I pause</pre>                           | Pauses test execution until manually resumed (see [`cy.pause()`](https://docs.cypress.io/api/commands/pause.html))               | `And I pause`                                                          |
| <pre>I debug</pre>                           | Sets a debugger breakpoint (see [`cy.debug()`](https://docs.cypress.io/api/commands/debug.html))                                 | `And I debug`                                                          |

#### Assertions

| Step                                                        | Description                                                                                                                                                                                                                                                                                       | Examples                                                           |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| <pre>I should be on {route}</pre>                           | Asserts that the current page URL matches the specified route (see [Setting routes](#setting-routes)), an absolute URL, or a regular expression                                                                                                                                                   | [`navigation.feature`](cypress/integration/navigation.feature)     |
| <pre>I should not be on {route}</pre>                       | Asserts the inverse of the step above                                                                                                                                                                                                                                                             | [`navigation.feature`](cypress/integration/navigation.feature)     |
| <pre>{element} should be visible</pre>                      | Asserts that the first matching element is visible, using `.should('be.visible')`                                                                                                                                                                                                                 | [`visibility.feature`](cypress/integration/visibility.feature)     |
| <pre>{element} should not be visible</pre>                  | Asserts that the first matching element is not visible, using `.should('not.be.visible')`                                                                                                                                                                                                         | [`visibility.feature`](cypress/integration/visibility.feature)     |
| <pre>{element} should have {int} occurrences</pre>          | Asserts that the number of matching elements (visible and invisible) is exactly some value                                                                                                                                                                                                        | [`counting.feature`](cypress/integration/counting.feature)         |
| <pre>{element} should have at least {int} occurrences</pre> | Asserts that the number of matching elements (visible and invisible) is greater than or equal to some value                                                                                                                                                                                       | [`counting.feature`](cypress/integration/counting.feature)         |
| <pre>{element} should have at most {int} occurrences</pre>  | Asserts that the number of matching elements (visible and invisible) is less than or equal to some value                                                                                                                                                                                          | [`counting.feature`](cypress/integration/counting.feature)         |
| <pre>{element} should be set to {string}</pre>              | Asserts that the value of an input element (`<input>`, `<select>`, `<textarea>`) matches the given string; for inputs that accept multiple values (eg. checkboxes, multi-selects), the value used for comparison is the string value of each input, concatenated with `,` (eg. `one, two, three`) | [`input/`](cypress/integration/input/)                             |
| <pre>{element} text should be {string}</pre>                | Asserts that a non-input element's text content matches the given string, ignoring case and surrounding whitespace                                                                                                                                                                                | [`text-content.feature`](cypress/integration/text-content.feature) |
| <pre>elements text should be:</pre>                         | Same as the step above, but for asserting multiple elements using an inline data table (see [Using data tables](#using-data-tables))                                                                                                                                                              | [`text-content.feature`](cypress/integration/text-content.feature) |
| <pre>{element} text should not be {string}</pre>            | Asserts the inverse of the step above                                                                                                                                                                                                                                                             | [`text-content.feature`](cypress/integration/text-content.feature) |
| <pre>elements text should not be:</pre>                     | Same as the step above, but for asserting multiple elements using an inline data table (see [Using data tables](#using-data-tables))                                                                                                                                                              | [`text-content.feature`](cypress/integration/text-content.feature) |
| <pre>{element} text should contain {string}</pre>           | Asserts that a non-input element's text content contains the given string, ignoring case and surrounding whitespace                                                                                                                                                                               | [`text-content.feature`](cypress/integration/text-content.feature) |
| <pre>elements text should contain:</pre>                    | Same as the step above, but for asserting multiple elements using an inline data table (see [Using data tables](#using-data-tables))                                                                                                                                                              | [`text-content.feature`](cypress/integration/text-content.feature) |
| <pre>{element} text should not contain {string}</pre>       | Asserts the inverse of the step above                                                                                                                                                                                                                                                             | [`text-content.feature`](cypress/integration/text-content.feature) |
| <pre>elements text should not contain:</pre>                | Same as the step above, but for asserting multiple elements using an inline data table (see [Using data tables](#using-data-tables))                                                                                                                                                              | [`text-content.feature`](cypress/integration/text-content.feature) |

Text in `{brackets}` above are parameters whose values must be (double) quoted in the scenario. For example, this step template:

```sh
I set {element} to {string}
```

should be written like this in a test scenario:

```sh
And I set "email input" to "name@example.com"
```

The full [Gherkin specification](https://cucumber.io/docs/gherkin/reference/) is supported along with [additional enhancements](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor#background-section) by `cypress-cucumber-preprocessor`. For instance, you can use scenario templates/outlines, data tables, and tags in your scenarios.

See the [`cypress/integration/`](cypress/integration/) directory for more examples.

### Tagging elements

HTML attributes are used to map `{element}` step parameters to their corresponding HTML elements. `data-test` attributes is used by default, but this is [configurable](#configuration).

```html
<!-- login.html -->
<input name="email" data-test="email input" />
<input name="password" data-test="password input" />
<button type="submit" data-test="login button">Login</button>
```

##### Element options

Many Cypress commands accept an optional `options` object that can be used to customize how the command is executed (eg. [`cy.type(text, options)`](https://docs.cypress.io/api/commands/type.html#Arguments)). These options can be set on a per-element basis via a `data-options` attribute. Example:

```diff
  <input
    name="search"
    type="text"
    data-test="search input"
+   data-options="{ force: true, log: true }"
  >
```

### Setting routes

Routes need to provided for navigation steps like these to work:

```sh
Given I navigate to "login"
```

A map of all label => path routes should be provided to `addSteps()` in the `cypress/support/step_definitions/index.js` file created during installation. Route paths can be absolute URLs or relative to the web root.

<!-- prettier-ignore -->
```diff
const { addSteps } = require('cypress-scenario-runner')
addSteps({
+ routes: {
+   login: '/login',
+ },
})
```

### Working with inputs

TBD

- input types
  - checkbox: checked, unchecked, by tag
  - select: by tag, by option value or text content
- wrapped inputs
- random values
- note on fact that setting checkboxes does not clear other checkbox values

### Using data tables

TBD

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

TBD

- options
- custom steps
- csr api
