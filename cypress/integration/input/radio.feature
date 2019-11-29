Feature: Radio inputs
===


Scenario: Radio inputs can be set by value
---
Given I navigate to "input actions"
And I set "radio input" to "radio 2 value"
When I click "submit button"
Then "submitted radio" text should be "radio 2 value"


Scenario: Invisible radio inputs can be set by value when they have a force attribute
---
Given I navigate to "input actions"
And "invisible-radio input" should not be visible
And I set "invisible-radio input" to "radio 2 value"
When I click "submit button"
Then "submitted invisible-radio" text should be "radio 2 value"


Scenario: Radio inputs with the test element attribute set on an ancestor can be set by value
---
Given I navigate to "input actions"
And I set "wrapped-radio input" to "radio 2 value"
When I click "submit button"
Then "submitted wrapped-radio" text should be "radio 2 value"


Scenario: Radio inputs can be set by custom attribute value
---
Given I navigate to "input actions"
And I set "radio input" to "radio 2 custom attribute value"
When I click "submit button"
Then "submitted radio" text should be "radio 2 value"


Scenario: Radio input value can be asserted to be equal to its string value
---
Given I navigate to "input assertions"
And "radio input" should be set to "radio 1 value"
When I set "radio input" to "radio 2 value"
Then "radio input" should be set to "radio 2 value"
