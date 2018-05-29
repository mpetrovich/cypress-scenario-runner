const { run } = Cypress.env('utils');
const actions = Cypress.env('actions');
const assertions = Cypress.env('assertions');

when('I log out', run(actions.logout));
when('I log in as a {string} user', run(actions.login));
when('I navigate to {string}', run(actions.navigate));

when('I see the {string}', run(assertions.isVisible));
when('I do not see the {string}', run(actions.waitUntilHidden));
when('I see {int} instances of {string}', run(assertions.hasCount));

when('I click the {string}', run(actions.click));
when('I set the {string} to {string}', run(actions.input));
when('I set:', run(actions.inputTable));

when('I pause', run(actions.pause));
when('I debug', run(actions.debug));
