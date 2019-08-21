# Cypress Scenario Runner [![npm version](https://badge.fury.io/js/cypress-scenario-runner.svg)](https://badge.fury.io/js/cypress-scenario-runner) [![Build Status](https://travis-ci.org/mpetrovich/cypress-scenario-runner.svg?branch=master)](https://travis-ci.org/mpetrovich/cypress-scenario-runner)

Write runnable [Gherkin scenarios](https://docs.cucumber.io/gherkin/reference/) without a single line of test code. Powered by [Cypress](https://www.cypress.io).

#### Step 1: Write your Gherkin scenario

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

#### Step 2: Add matching `data-test` attributes to your HTML

```html
<!-- login.html -->
<input name="email" data-test="email input" />
<input name="password" data-test="password input" />
<button type="submit" data-test="login button">Login</button>
```

#### Step 3: That's it. [There's no step 3!](https://www.youtube.com/watch?v=6uXJlX50Lj8)

`cypress-scenario-runner` will run the scenario as-is, no given/when/then glue code needed.

## Table of contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Customization](#customization)
- [Contributing](#CONTRIBUTING.md)

## Installation

Requires Node.js v8+

#### 1. Install packages

Install this package and its dependencies, [cypress](https://github.com/cypress-io/cypress/) and [cypress-cucumber-preprocessor](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor):

```sh
npm install --save-dev cypress cypress-cucumber-preprocessor cypress-scenario-runner
```

#### 2. Set up cypress

Follow the setup instructions for [Cypress](https://github.com/cypress-io/cypress/) and launch it once to create the initial directory structure.

#### 3. Set up cypress-scenario-runner

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

#### 1. Write scenarios

_Coming soon._

#### 2. Annotate HTML elements

_Coming soon._

#### 3. Add routes

_Coming soon._

## Customization

_Coming soon._
