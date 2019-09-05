Feature: Password inputs
===


Scenario: Password inputs can be set
---
Given I navigate to "input actions"
And I set "password input" to "Password value"
When I click "submit button"
Then "submitted password" should be "Password value"


Scenario: Invisible password inputs can be set when they have a force attribute
---
Given I navigate to "input actions"
And "invisible-password input" should not be visible
And I set "invisible-password input" to "Password value"
When I click "submit button"
Then "submitted invisible-password" should be "Password value"


Scenario: Password inputs with the test element attribute set on an ancestor can be set
---
Given I navigate to "input actions"
And I set "wrapped-password input" to "Password value"
When I click "submit button"
Then "submitted wrapped-password" should be "Password value"


Scenario: Password input value can be asserted to be equal to its string value
---
Given I navigate to "input assertions"
And "password input" should be set to "Initial password value"
When I set "password input" to "New password value"
Then "password input" should be set to "New password value"
