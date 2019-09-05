Feature: Checkbox inputs
===


Scenario: A single checkbox input can be set by value
---
Given I navigate to "input actions"
And I set "checkbox input" to "checkbox 2 value"
When I click "submit button"
Then "submitted checkbox" should be "checkbox 2 value"


Scenario: A single checkbox input can be set by value when they have a force attribute
---
Given I navigate to "input actions"
And "invisible-checkbox input" should not be visible
And I set "invisible-checkbox input" to "checkbox 2 value"
When I click "submit button"
Then "submitted invisible-checkbox" should be "checkbox 2 value"


Scenario: A single checkbox input with the test element attribute set on an ancestor can be set by value
---
Given I navigate to "input actions"
And I set "wrapped-checkbox input" to "checkbox 2 value"
When I click "submit button"
Then "submitted wrapped-checkbox" should be "checkbox 2 value"


Scenario: Multiple checkbox inputs can be set by value individually
---
Given I navigate to "input actions"
And I set "checkbox input" to "checkbox 2 value"
And I set "checkbox input" to "checkbox 3 value"
When I click "submit button"
Then "submitted checkbox" should be "checkbox 2 value; checkbox 3 value"


Scenario: Multiple checkbox inputs can be set by value together
---
Given I navigate to "input actions"
And I set "checkbox input" to "checkbox 2 value, checkbox 3 value"
When I click "submit button"
Then "submitted checkbox" should be "checkbox 2 value; checkbox 3 value"


Scenario: The value of a single checked checkbox can be asserted to be equal to its string value
---
When I navigate to "input assertions"
Then "checkbox input" should be set to "checkbox 1 value"


Scenario: The value of multiple checked checkboxes can be asserted to be equal to a comma-delimited string of the checked values
---
Given I navigate to "input assertions"
And "checkbox input" should be set to "checkbox 1 value"
And I set "checkbox input" to "checkbox 2 value"
Then "checkbox input" should be set to "checkbox 1 value, checkbox 2 value"
