# Cypress Scenario Runner [![npm version](https://badge.fury.io/js/cypress-scenario-runner.svg)](https://badge.fury.io/js/cypress-scenario-runner) [![Build Status](https://travis-ci.org/mpetrovich/cypress-scenario-runner.svg?branch=master)](https://travis-ci.org/mpetrovich/cypress-scenario-runner)

Write runnable [Gherkin scenarios](https://docs.cucumber.io/gherkin/reference/) without a single line of test code. Powered by [Cypress](https://www.cypress.io).

### Step 1: Write your Gherkin scenario

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

### Step 2: Add matching `data-test` attributes to your HTML

```html
<!-- login.html -->
<input name="email" data-test="email input" />
<input name="password" data-test="password input" />
<button type="submit" data-test="login button">Login</button>
```

### Step 3: That's it. [There's no step 3!](https://www.youtube.com/watch?v=6uXJlX50Lj8)

`cypress-scenario-runner` will run the scenario as-is, no given/when/then glue code needed.

## Table of contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Customization](#customization)
- [Contributing](#CONTRIBUTING.md)

## Installation

Requires Node.js v8+

### 1. Install packages

Install this package and its dependencies, [cypress](https://github.com/cypress-io/cypress/) and [cypress-cucumber-preprocessor](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor):

```sh
npm install --save-dev cypress cypress-cucumber-preprocessor cypress-scenario-runner
```

### 2. Set up Cypress

Follow the setup instructions for [Cypress](https://github.com/cypress-io/cypress/) and launch it once to create the initial directory structure.

### 3. Set up cypress-scenario-runner

Add these lines to the `pluginsFile` listed in your `cypress.json` ([default path](https://docs.cypress.io/guides/references/configuration.html#Folders-Files) is `cypress/plugins/index.js`):

```diff
+ const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
+	on('file:preprocessor', cucumber())
}
```

Add these lines to the `supportFile` listed in your `cypress.json` ([default path](https://docs.cypress.io/guides/references/configuration.html#Folders-Files) is `cypress/support/index.js`):

```diff
+ const { addCommands } = require('cypress-scenario-runner')
+ addCommands()
```

Create a new file at `cypress/support/step_definitions/index.js` that contains:

```diff
+ const { addSteps } = require('cypress-scenario-runner')
+ addSteps()
```

Now you're ready to begin writing test scenarios.

## Usage

### Writing Gherkin scenarios

A [Gherkin scenario](https://cucumber.io/docs/gherkin/reference/) looks like this:

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

Parameters appear in `{brackets}` in the table above and in `"double quotes"` in actual scenario. For example, this step:

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

In addition, the full [Gherkin specification](https://cucumber.io/docs/gherkin/reference/) is supported along with [additional enhancements](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor#background-section) by `cypress-cucumber-preprocessor`. For instance, you can use scenario templates/outlines, data tables, and tags in your scenarios. See the [`cypress/integration/`](cypress/integration/) directory for examples.

### Annotating HTML elements

`data-test` HTML attributes are used to map the `{element}` step parameters to their corresponding HTML elements:

```html
<!-- login.html -->
<input name="email" data-test="email input" />
<input name="password" data-test="password input" />
<button type="submit" data-test="login button">Login</button>
```

The names of HTML attributes to use are [configurable](#customization).

### Setting routes

Routes need to provided for navigation steps like these to work:

```sh
Given I navigate to "login"
```

A map of label => path should be provided to `addSteps()` in the `cypress/support/step_definitions/index.js` file created during installation. Route paths should be relative to the web root:

```diff
const { addSteps } = require('cypress-scenario-runner')
addSteps({
+	routes: {
+		login: '/login',
+	},
})

```

## Customization

Coming soon.
