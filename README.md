Cypress Scenario Runner
===
**Run [Gherkin](https://docs.cucumber.io/gherkin/reference/) scenarios without writing a singe line of test code.**

Seriously. This is all you need in order to create a working test:
```
Features: Signup
===

Scenario: Signup success
---
Given I am logged out
And I navigate to "signup"
And I set "email" to "name@example.com"
And I set "password" to "abc123"
When I click "signup button"
Then I will navigate to "home"
```
cypress-scenario-runner will generate all the necessary test harnesses and UI commands on the fly.


How it works
---
1. Tag all interactive or assertable HTML elements with special `data-test` attributes that contain a human-readable description of the element. (eg. `data-test="signup button"`)

2. [Gherkin](https://docs.cucumber.io/gherkin/reference/) scenarios are written using a set of predefined step templates with placeholders for specific elements, values, pages, etc. Each step template has associated logic that knows how to actually perform that behavior with an element that's been tagged in step 1.

3. cypress-scenario-runner uses [cypress-cucumber-preprocessor](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor) to create cucumber `given()`, `when()`, `then()` test commands from Gherkin steps on the fly, which are executed by the [Cypress](https://www.cypress.io/) test runner.


Installation
---
Requires Node 8+

See [Installation](docs/installation.md)


Setup
---
See [Customization](docs/setup.md)


Related
---
Prefer using a UI to write Gherkin scenarios? You'll love [cypress-scenario-builder](https://github.com/nextbigsoundinc/cypress-scenario-builder).
