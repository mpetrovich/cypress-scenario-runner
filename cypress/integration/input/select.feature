Feature: Select inputs
===


Scenario: Select inputs can be set by value
---
Given I navigate to "input actions"
And I set "select input" to "option 2 value"
When I click "submit button"
Then "submitted select" text should be "option 2 value"


Scenario: Invisible select inputs can be set by value when they have a force attribute
---
Given I navigate to "input actions"
And "invisible-select input" should not be visible
And I set "invisible-select input" to "option 2 value"
When I click "submit button"
Then "submitted invisible-select" text should be "option 2 value"


Scenario: Select inputs with the test element attribute set on an ancestor can be set by value
---
Given I navigate to "input actions"
And I set "wrapped-select input" to "option 2 value"
When I click "submit button"
Then "submitted wrapped-select" text should be "option 2 value"


Scenario: Select inputs can be set by label
---
Given I navigate to "input actions"
And I set "select input" to "option 2 label"
When I click "submit button"
Then "submitted select" text should be "option 2 value"


Scenario: Multi-select inputs can be set by value
---
Given I navigate to "input actions"
And I set "multi-select input" to "option 2 value, option 3 value"
When I click "submit button"
Then "submitted multi-select" text should be "option 2 value; option 3 value"


Scenario: Multi-select inputs can be set by label
---
Given I navigate to "input actions"
And I set "multi-select input" to "option 2 label, option 3 label"
When I click "submit button"
Then "submitted multi-select" text should be "option 2 value; option 3 value"


Scenario: Select input value can be asserted to be equal to its string value
---
Given I navigate to "input assertions"
And "select input" should be set to "option 1 value"
When I set "select input" to "option 2 value"
Then "select input" should be set to "option 2 value"


Scenario: Multi-select input value can be asserted to be equal to a comma-delimited string of the selected values
---
Given I navigate to "input assertions"
And "multi-select input" should be set to "option 1 value"
When I set "multi-select input" to "option 2 value, option 3 value"
Then "multi-select input" should be set to "option 2 value, option 3 value"
