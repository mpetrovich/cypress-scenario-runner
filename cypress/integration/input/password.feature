Feature: Password inputs
===


Scenario: Password inputs can be set
---
Given I navigate to "password input test page"
And "password input" should be set to "Initial password"
And I set "password input" to "New password"
And "password input" should be set to "New password"
When I click "submit button"
Then "submitted password" should be "New password"


Scenario: Invisible password inputs can be set when they have a force attribute
---
Given I navigate to "password input test page"
And "invisible-password input" should not be visible
And "invisible-password input" should be set to "Initial invisible password"
And I set "invisible-password input" to "New password"
And "invisible-password input" should be set to "New password"
When I click "submit button"
Then "submitted invisible-password" should be "New password"


Scenario: Password inputs with the test element attribute set on an ancestor can be set
---
Given I navigate to "password input test page"
And "wrapped-password input" should be set to "Initial wrapped password"
And I set "wrapped-password input" to "New password"
And "wrapped-password input" should be set to "New password"
When I click "submit button"
Then "submitted wrapped-password" should be "New password"
