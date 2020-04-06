# Cypress Scenario Runner [![npm version](https://badge.fury.io/js/cypress-scenario-runner.svg)](https://badge.fury.io/js/cypress-scenario-runner) [![Build Status](https://travis-ci.org/mpetrovich/cypress-scenario-runner.svg?branch=master)](https://travis-ci.org/mpetrovich/cypress-scenario-runner)

> ⚠️ **CAUTION:** These docs are for latest unstable development version. For for the latest stable release, see the [2.x branch docs](https://github.com/mpetrovich/cypress-scenario-runner/blob/2.x/README.md).

**Run [Gherkin scenarios](https://docs.cucumber.io/gherkin/reference/) in [Cypress](https://www.cypress.io) without a single line of code.**

To run a Gherkin scenario like this:

```sh
Feature: Login
===

Scenario: Successful login
---
Given I navigate to "/login"
And I set "email input" to "name@example.com"
And I set "password input" to "p4ssw0rd"
When I click "login button"
Then I should be on "/dashboard"
```

Just tag the appropriate HTML elements:

```html
<input … test-element="email input" />
<input … test-element="password input" />
<button … test-element="login button">Login</button>
```

That's it. No other coding required.

## Table of contents

-   [Installation](#installation)
-   [Usage](#usage)
    -   [Writing test scenarios](#writing-test-scenarios)
    -   [Tagging elements](#tagging-elements)
    -   [Mapping routes](#mapping-routes)
    -   [Working with inputs](#working-with-inputs)
    -   [Data tables](#data-tables)
    -   [Running scenarios](#running-scenarios)
-   [Customization](#customization)
-   [Contributing](CONTRIBUTING.md)

## Installation

Requires:

-   Node.js 8.0+
-   [`cypress`](https://github.com/cypress-io/cypress/)
-   [`cypress-cucumber-preprocessor`](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor)

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

Each line in the scenario is called a _step_. `cypress-scenario-runner` works by using a predefined set of reusable step templates below, but you can also add your own (see [Customization](#customization)).

| Step                                                                                  | Description                                                                                                                                                                                                                                                                                       | Examples                                                                                                                                   |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| <h3>Navigation</h3>                                                                   |                                                                                                                                                                                                                                                                                                   |                                                                                                                                            |
| <pre>I navigate to {route}</pre>                                                      | Navigates the browser to a route or an absolute URL. See [Mapping routes](#mapping-routes).                                                                                                                                                                                                       | <pre>I navigate to "login"</pre> [More examples](cypress/integration/navigation.feature)                                                   |
| <pre>I should be on {route}</pre>                                                     | Asserts that the current page URL matches the specified route, an absolute URL, or a regular expression. See [Mapping routes](#mapping-routes).                                                                                                                                                   | <pre>I should be on "/login"</pre> [More examples](cypress/integration/navigation.feature)                                                 |
| <pre>I should not be on {route}</pre>                                                 | Asserts that the current page URL does not match the specified route, an absolute URL, or a regular expression. See [Mapping routes](#mapping-routes).                                                                                                                                            | <pre>I should not be on "/users\/\d+\$/"</pre> [More examples](cypress/integration/navigation.feature)                                     |
| <h3>Pointer actions</h3>                                                              |                                                                                                                                                                                                                                                                                                   |                                                                                                                                            |
| <pre>I click {element}</pre>                                                          | Clicks the first element with a matching tag. See [Tagging elements](#tagging-elements).                                                                                                                                                                                                          | <pre>I click "login button"</pre> [More examples](cypress/integration/pointer-events.feature)                                              |
| <pre>Within {ancestorElement}, I click {element}</pre>                                | Clicks the first element with a matching tag. See [Tagging elements](#tagging-elements).                                                                                                                                                                                                          | <pre>Within "profile card", I click "edit button"</pre> [More examples](cypress/integration/pointer-events.feature)                        |
| <h3>Input</h3>                                                                        |                                                                                                                                                                                                                                                                                                   |                                                                                                                                            |
| <pre>I set {element} to {string}</pre>                                                | Sets the first matching input to the given value (see [Working with inputs](#working-with-inputs))                                                                                                                                                                                                | <pre>I set "email" to "name@example.com"</pre> [More examples](cypress/integration/input/)                                                 |
| <pre>I set:</pre>                                                                     | Same as the step above, but for setting multiple inputs using an inline data table (see [Data tables](#data-tables))                                                                                                                                                                              | [Examples](cypress/integration/input/)                                                                                                     |
| <pre>{element} should be set to {string}</pre>                                        | Asserts that the value of an input element (`<input>`, `<select>`, `<textarea>`) matches the given string; for inputs that accept multiple values (eg. checkboxes, multi-selects), the value used for comparison is the string value of each input, concatenated with `,` (eg. `one, two, three`) | <pre>"email" should be set to "name@example.com"</pre> [More examples](cypress/integration/input/)                                         |
| <pre>Within {ancestorElement}, I set {element} to {string}</pre>                      | Sets the first matching input to the given value (see [Working with inputs](#working-with-inputs))                                                                                                                                                                                                | <pre>Within "primary address form", I set "city" to "Chicago"</pre> [More examples](cypress/integration/input/)                            |
| <pre>Within {ancestorElement}, I set:</pre>                                           | Same as the step above, but for setting multiple inputs using an inline data table (see [Data tables](#data-tables))                                                                                                                                                                              | [Examples](cypress/integration/input/)                                                                                                     |
| <pre>Within {ancestorElement}, {element} should be set to {string}</pre>              | Asserts that the value of an input element (`<input>`, `<select>`, `<textarea>`) matches the given string; for inputs that accept multiple values (eg. checkboxes, multi-selects), the value used for comparison is the string value of each input, concatenated with `,` (eg. `one, two, three`) | <pre>Within "primary address form", "city" should be set to "Chicago"</pre> [More examples](cypress/integration/input/)                    |
| <h3>Element visibility</h3>                                                           |                                                                                                                                                                                                                                                                                                   |                                                                                                                                            |
| <pre>{element} should be visible</pre>                                                | Asserts that the first matching element is visible, using `.should('be.visible')`                                                                                                                                                                                                                 | <pre>"profile card" should be visible</pre> [More examples](cypress/integration/visibility.feature)                                        |
| <pre>{element} should not be visible</pre>                                            | Asserts that the first matching element is not visible, using `.should('not.be.visible')`                                                                                                                                                                                                         | <pre>"signup link" should not be visible</pre> [More examples](cypress/integration/visibility.feature)                                     |
| <pre>I wait for {element} to disappear</pre>                                          | Waits for all matching elements to be invisible (ie. `is(':visible')` returns false), checking every 500ms                                                                                                                                                                                        | <pre>I wait for "loading icon" to disappear</pre> [More examples](cypress/integration/visibility.feature)                                  |
| <pre>Within {ancestorElement}, {element} should be visible</pre>                      | Asserts that the first matching element within an ancestor element is visible, using `.should('be.visible')`                                                                                                                                                                                      | <pre>Within "profile card", "profile picture" should be visible</pre> [More examples](cypress/integration/visibility.feature)              |
| <pre>Within {ancestorElement}, {element} should not be visible</pre>                  | Asserts that the first matching element within an anscestor element is not visible, using `.should('not.be.visible')`                                                                                                                                                                             | <pre>Within "profile card", "edit link" should not be visible</pre> [More examples](cypress/integration/visibility.feature)                |
| <pre>Within {ancestorElement}, I wait for {element} to disappear</pre>                | Waits for all matching elements to be invisible (ie. `is(':visible')` returns false), checking every 500ms                                                                                                                                                                                        | <pre>Within "profile card", I wait for "loading icon" to disappear</pre> [More examples](cypress/integration/visibility.feature)           |
| <h3>Element count</h3>                                                                |                                                                                                                                                                                                                                                                                                   |                                                                                                                                            |
| <pre>{element} should have {int} occurrences</pre>                                    | Asserts that the number of matching elements (visible and invisible) is exactly some value                                                                                                                                                                                                        | <pre>"search result" should have 5 occurrences</pre> [More examples](cypress/integration/counting.feature)                                 |
| <pre>{element} should have at least {int} occurrences</pre>                           | Asserts that the number of matching elements (visible and invisible) is greater than or equal to some value                                                                                                                                                                                       | <pre>"search result" should have at least 1 occurrences</pre> [More examples](cypress/integration/counting.feature)                        |
| <pre>{element} should have at most {int} occurrences</pre>                            | Asserts that the number of matching elements (visible and invisible) is less than or equal to some value                                                                                                                                                                                          | <pre>"search result" should have at most 10 occurrences</pre> [More examples](cypress/integration/counting.feature)                        |
| <pre>Within {ancestorElement}, {element} should have {int} occurrences</pre>          | Asserts that the number of matching elements (visible and invisible) is exactly some value                                                                                                                                                                                                        | <pre>Within "profile card", "tag" should have 3 occurrences</pre> [More examples](cypress/integration/counting.feature)                    |
| <pre>Within {ancestorElement}, {element} should have at least {int} occurrences</pre> | Asserts that the number of matching elements (visible and invisible) is greater than or equal to some value                                                                                                                                                                                       | <pre>Within "profile card", "tag" should have at least 1 occurrences</pre> [More examples](cypress/integration/counting.feature)           |
| <pre>Within {ancestorElement}, {element} should have at most {int} occurrences</pre>  | Asserts that the number of matching elements (visible and invisible) is less than or equal to some value                                                                                                                                                                                          | <pre>Within "profile card", "tag" should have at most 5 occurrences</pre> [More examples](cypress/integration/counting.feature)            |
| <h3>Text content</h3>                                                                 |                                                                                                                                                                                                                                                                                                   |                                                                                                                                            |
| <pre>{element} text should be {string}</pre>                                          | Asserts that the text content of a non-input element equals the given string. Capitalization and surrounding whitespace are ignored.                                                                                                                                                              | <pre>"profile title" text should be "Dr. Jekyll"</pre> [More examples](cypress/integration/text-content.feature)                           |
| <pre>{element} text should not be {string}</pre>                                      | Asserts that the text content of a non-input element does not equal the given string. Capitalization and surrounding whitespace are ignored.                                                                                                                                                      | <pre>"profile title" text should not be "Mr. Hyde"</pre> [More examples](cypress/integration/text-content.feature)                         |
| <pre>{element} text should contain {string}</pre>                                     | Asserts that the text content of a non-input element contains the given string. Capitalization and surrounding whitespace are ignored.                                                                                                                                                            | <pre>"welcome message" text should contain "Dr. Jekyll"</pre> [More examples](cypress/integration/text-content.feature)                    |
| <pre>{element} text should not contain {string}</pre>                                 | Asserts that the text content of a non-input element does not contain the given string. Capitalization and surrounding whitespace are ignored.                                                                                                                                                    | <pre>"welcome message" text should not contain "Mr. Hyde"</pre> [More examples](cypress/integration/text-content.feature)                  |
| <pre>elements text should be:</pre>                                                   | Asserts that the text contents of multiple non-input elements equal specific strings, using a data table (see [Data tables](#data-tables)). Capitalization and surrounding whitespace are ignored.                                                                                                | [Examples](cypress/integration/text-content.feature)                                                                                       |
| <pre>elements text should not be:</pre>                                               | Asserts that the text contents of multiple non-input elements do not equal specific strings, using a data table (see [Data tables](#data-tables)). Capitalization and surrounding whitespace are ignored.                                                                                         | [Examples](cypress/integration/text-content.feature)                                                                                       |
| <pre>elements text should contain:</pre>                                              | Asserts that the text contents of multiple non-input elements contain specific strings, using a data table (see [Data tables](#data-tables)). Capitalization and surrounding whitespace are ignored.                                                                                              | [Examples](cypress/integration/text-content.feature)                                                                                       |
| <pre>elements text should not contain:</pre>                                          | Asserts that the text contents of multiple non-input elements do not contain specific strings, using a data table (see [Data tables](#data-tables)). Capitalization and surrounding whitespace are ignored.                                                                                       | [Examples](cypress/integration/text-content.feature)                                                                                       |
| <h3>Text content within ancestor</h3>                                                 |                                                                                                                                                                                                                                                                                                   |                                                                                                                                            |
| <pre>Within {ancestorElement}, {element} text should be {string}</pre>                | Asserts that the text content of a non-input element within an ancestor element equals the given string. Capitalization and surrounding whitespace are ignored.                                                                                                                                   | <pre>Within "search result #1", "rank" text should be "#1"</pre> [More examples](cypress/integration/text-content.feature)                 |
| <pre>Within {ancestorElement}, {element} text should not be {string}</pre>            | Asserts that the text content of a non-input element within an ancestor element does not equal the given string. Capitalization and surrounding whitespace are ignored.                                                                                                                           | <pre>Within "search result #1", "rank" text should not be "#2"</pre> [More examples](cypress/integration/text-content.feature)             |
| <pre>Within {ancestorElement}, {element} text should contain {string}</pre>           | Asserts that the text content of a non-input element within an ancestor element contains the given string. Capitalization and surrounding whitespace are ignored.                                                                                                                                 | <pre>Within "search result #1", "title" text should contain "Dr. Jekyll"</pre> [More examples](cypress/integration/text-content.feature)   |
| <pre>Within {ancestorElement}, {element} text should not contain {string}</pre>       | Asserts that the text content of a non-input element within an ancestor element does not contain the given string. Capitalization and surrounding whitespace are ignored.                                                                                                                         | <pre>Within "search result #1", "title" text should not contain "Mr. Hyde"</pre> [More examples](cypress/integration/text-content.feature) |
| <pre>Within {ancestorElement}, elements text should be:</pre>                         | Asserts that the text contents of multiple non-input elements within an ancestor element equal specific strings, using a data table (see [Data tables](#data-tables)). Capitalization and surrounding whitespace are ignored.                                                                     | [Examples](cypress/integration/text-content.feature)                                                                                       |
| <pre>Within {ancestorElement}, elements text should not be:</pre>                     | Asserts that the text contents of multiple non-input elements within an ancestor element do not equal specific strings, using a data table (see [Data tables](#data-tables)). Capitalization and surrounding whitespace are ignored.                                                              | [Examples](cypress/integration/text-content.feature)                                                                                       |
| <pre>Within {ancestorElement}, elements text should contain:</pre>                    | Asserts that the text contents of multiple non-input elements within an ancestor element contain specific strings, using a data table (see [Data tables](#data-tables)). Capitalization and surrounding whitespace are ignored.                                                                   | [Examples](cypress/integration/text-content.feature)                                                                                       |
| <pre>Within {ancestorElement}, elements text should not contain:</pre>                | Asserts that the text contents of multiple non-input elements within an ancestor element do not contain specific strings, using a data table (see [Data tables](#data-tables)). Capitalization and surrounding whitespace are ignored.                                                            | [Examples](cypress/integration/text-content.feature)                                                                                       |
| <h3>Miscellaneous</h3>                                                                |                                                                                                                                                                                                                                                                                                   |                                                                                                                                            |
| <pre>I wait {float} seconds</pre>                                                     | Pauses test execution for the specified number of seconds, fractional values allowed.                                                                                                                                                                                                             | <pre>I wait 2.5 seconds</pre> [More examples](cypress/integration/miscellaneous.feature)                                                   |
| <pre>I pause</pre>                                                                    | Pauses test execution until manually resumed. See [`cy.pause()`](https://docs.cypress.io/api/commands/pause.html).                                                                                                                                                                                | <pre>I pause</pre>                                                                                                                         |
| <pre>I debug</pre>                                                                    | Sets a debugger breakpoint. See [`cy.debug()`](https://docs.cypress.io/api/commands/debug.html).                                                                                                                                                                                                  | <pre>I debug</pre>                                                                                                                         |

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

HTML attributes are used to map `{element}` step parameters to their corresponding HTML elements. `test-element` attributes is used by default, but this is [configurable](#configuration).

```html
<!-- login.html -->
<input name="email" test-element="email input" />
<input name="password" test-element="password input" />
<button type="submit" test-element="login button">Login</button>
```

#### Element options

Many Cypress commands accept an optional `options` object that can be used to customize how the command is executed (eg. [`cy.type(text, options)`](https://docs.cypress.io/api/commands/type.html#Arguments)). These options can be set on a per-element basis via a `test-options` attribute. Example:

```diff
  <input
    name="search"
    type="text"
    test-element="search input"
+   test-options="{ force: true, log: true }"
  >
```

### Mapping routes

Routes need to be provided for navigation steps like these to work:

```sh
Given I navigate to "login"
```

A map of all route names to URIs should be provided to `addSteps()` in the `cypress/support/step_definitions/index.js` file created during installation. Route URIs can be absolute URLs, relative to the web root, or regular expressions.

<!-- prettier-ignore -->
```diff
const { addSteps } = require('cypress-scenario-runner')
addSteps({
+ routes: {
+   login: '/login',
+   'a specific product': '/products/acme-widget',
+   'any product': '\/products\/.*'
+ }
})
```

### Working with inputs

Like other HTML elements, input elements are selectable by their `test-element` attribute (or whichever attribute [you've configured](#configuration)).

Nearly [any type of input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#%3Cinput%3E_types) can be set with this step:

```
I set {element} to {string}
```

#### Selects

A `<select>` option can be selected by its value or label. For example, given:

```html
<select name="fav_color" test-element="favorite color">
    <option value="#f00">Red</option>
    <option value="#0f0">Green</option>
    <option value="#00f">Blue</option>
</select>
```

These steps are equivalent:

```
I set "favorite color" to "#0f0"
I set "favorite color" to "Green"
```

For more example usage, see [input/select.feature](cypress/integration/input/select.feature).

#### Multi-selects

For multi-selects (ie. `<select multiple>`), multiple options can be selected by stringing together their labels or values with commas. For example, given:

```html
<select multiple name="select" test-element="select input">
    <option value="Value A">Label A</option>
    <option value="Value B">Label B</option>
    <option value="Value C">Label C</option>
</select>
```

The second and third `<option>`s can be selected by their values or by their labels:

```
# By values:
I set "select input" to "Value B, Value C"

# By labels:
I set "select input" to "Label B, Label C"
```

For more example usage, see [input/select.feature](cypress/integration/input/select.feature).

#### Radios

A radio option can set by its value or `test-value` label. For example:

```html
<label>
    <input type="radio" name="fav_color" value="#f00" test-element="favorite color" test-value="Red" />
    Red
</label>
<label>
    <input type="radio" name="fav_color" value="#0f0" test-element="favorite color" test-value="Green" />
    Green
</label>
<label>
    <input type="radio" name="fav_color" value="#00f" test-element="favorite color" test-value="Blue" />
    Blue
</label>
```

These steps are equivalent:

```
I set "favorite color" to "#0f0"
I set "favorite color" to "Green"
```

#### Wrapped inputs

When using UI frameworks, it may not be practical to add `test-element` and other attributes directly to the input elements themselves. In such cases, those attributes can be added to an ancestor element that wraps the input. For example:

```html
<my-custom-input test-element="some input"></my-custom-input>
```

This is convenient when checkbox or radio inputs are wrapped with labels:

```html
<label test-element="color options">
    <input type="checkbox" name="colors" value="red" />
</label>
<label test-element="color options">
    <input type="checkbox" name="colors" value="green" />
</label>
<label test-element="color options">
    <input type="checkbox" name="colors" value="blue" />
</label>
```

#### Checkboxes

Checkboxes can be checked by their value or by their `test-value` attributes (or whichever attribute [you've configured](#configuration) for input values). For example, given:

```html
<input type="checkbox" name="color" value="f00" test-element="colors" test-value="red" />
<input type="checkbox" name="color" value="0f0" test-element="colors" test-value="green" />
<input type="checkbox" name="color" value="00f" test-element="colors" test-value="blue" />
```

The second checkbox can be set by its `test-value` attribute `green` or by its value `0f0`:

```
# By test-value:
I set "colors" to "green"

# By value:
I set "colors" to "0f0"
```

Multiple checkboxes can be checked individually by `test-value` or by value:

```
# By test-value:
I set "colors" to "green"
I set "colors" to "blue"

# By value:
I set "colors" to "0f0"
I set "colors" to "00f"
```

Multiple checkboxes can also be checked together by stringing together their `test-value` or `value` attributes with commas:

```
# By test-value:
I set "colors" to "green, blue"

# By value:
I set "colors" to "0f0, 00f"
```

A single-option checkbox can be checked or unchecked by setting its value to the string `checked` or `unchecked`. For example, given:

```html
<input type="checkbox" name="remember_me" value="1" test-element="remember me" />
```

```
I set "remember me" to "checked"
```

**NOTE:** Setting one or more checkboxes does not clear the other checkboxes.

For more example usage, see [input/checkbox.feature](cypress/integration/input/checkbox.feature).

### Data tables

Repetitive steps can be written in tabular form with inline data tables.

For example, this scenario:

```
I set "first name" to "Jane"
I set "last name" to "Doe"
I set "email" to "jdoe@example.com"
I set "address" to "123 Somewhere St."
I set "city" to "Anywhere"
I set "zip" to "38274"
```

Can be written as a data table with `I set:`:

```
I set:
| element    | value             |
| first name | Jane              |
| last name  | Doe               |
| email      | jdoe@example.com  |
| address    | 123 Somewhere St. |
| city       | Anywhere          |
| zip        | 38274             |
```

The first column of the table are column headers. It doesn't matter how you name them—they're meant to be purely informational and are ignored.

The list steps that use data tables are:

-   `I set:`
-   `elements text should be:`
-   `elements text should not be:`
-   `elements text should contain:`
-   `elements text should not contain:`

For more example usage, see [input/tables.feature](cypress/integration/input/tables.feature) and the [official Gherkin spec](https://cucumber.io/docs/gherkin/reference/#data-tables).

### Scenario outlines/templates

Repetitive scenarios can be parameterized with a scenario outline (aka scenario template):

```
Scenario Template: Multiple valid forms can be submitted
---
Given I navigate to "form"
And I set "first name" to "<first name>"
And I set "last name" to "<last name>"
And I set "email" to "<email>"
When I click "submit button"
Then I "form submitted message" should be visible

Examples:
| first name  | last name      | email                 |
| Peter       | Gibbons        | pgibbons@initech.com  |
| Samir       | Nagheenanajar  | samir@initrode.com    |
| Mike        | Bolton         | pcl04dl3tt3r@aol.com  |
```

The scenario is run once for each row in the table. Parameters denoted by `< >` are replaced with the associated column value.

For more details, see the [official Gherkin spec](https://cucumber.io/docs/gherkin/reference/#scenario-outline).

### Running scenarios

Scenario files can be run directly with Cypress:

```sh
$(npm bin)/cypress run [files]
```

or by using the Cypress UI:

```sh
$(npm bin)/cypress open
```

## Customization

TBD

-   Options
-   Custom steps
-   API
