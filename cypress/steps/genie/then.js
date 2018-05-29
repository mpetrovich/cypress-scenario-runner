const { run } = Cypress.env('utils');
const actions = Cypress.env('actions');
const assertions = Cypress.env('assertions');

then('I will navigate to {string}', run(assertions.isOnPage));
then('I will not navigate to {string}', run(assertions.isNotOnPage));

then('I will see the {string}', run(assertions.isVisible));
then('I will not see the {string}', run(assertions.isNotVisible));
then('I will see {int} instances of {string}', run(assertions.hasCount));

then('the {string} will be {string}', run(assertions.hasText));
then('the {string} will not be {string}', run(assertions.doesNotHaveText));
then('the {string} will contain {string}', run(assertions.containsText));
then('the {string} will not contain {string}', run(assertions.doesNotContainText));

then('I pause', run(actions.pause));
then('I debug', run(actions.debug));
