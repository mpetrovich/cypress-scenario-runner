const { run } = Cypress.env('utils');
const actions = Cypress.env('actions');
const assertions = Cypress.env('assertions');

given('I am logged out', run(actions.logout));
given('I am logged in as a {string} user', run(actions.login));
given('I navigate to {string}', run(actions.navigate));

given('I see the {string}', run(assertions.isVisible));
given('I see {int} instances of {string}', run(assertions.hasCount));
given('I do not see the {string}', run(actions.waitUntilHidden));

given('I click the {string}', run(actions.click));
given('I set the {string} to {string}', run(actions.input));
given('I set:', run(actions.inputTable));

given('the {string} is {string}', run(assertions.hasText));
given('the {string} is not {string}', run(assertions.doesNotHaveText));
given('the {string} does not contain {string}', run(assertions.containsText));
given('the {string} does not contain {string}', run(assertions.doesNotContainText));

given('I pause', run(actions.pause));
given('I debug', run(actions.debug));
