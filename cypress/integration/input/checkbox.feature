Feature: Checkbox inputs
===


Scenario: A single checkbox input can be set by value
---
Given I navigate to "checkbox input test page"
And I set "checkbox input" to "checkbox 2 value"
And "checkbox input" should be set to "checkbox 2 value"
When I click "submit button"
Then "submitted checkbox" should be "checkbox 2 value"


Scenario: A single checkbox input can be set by value when it has a force attribute
---
Given I navigate to "checkbox input test page"
And "invisible-checkbox input" should not be visible
And I set "invisible-checkbox input" to "checkbox 2 value"
And "invisible-checkbox input" should be set to "checkbox 2 value"
When I click "submit button"
Then "submitted invisible-checkbox" should be "checkbox 2 value"


Scenario: A single checkbox input with the test element attribute set on an ancestor can be set by value
---
Given I navigate to "checkbox input test page"
And I set "wrapped-checkbox input" to "checkbox 2 value"
And "wrapped-checkbox input" should be set to "checkbox 2 value"
When I click "submit button"
Then "submitted wrapped-checkbox" should be "checkbox 2 value"


Scenario: Multiple checkbox inputs can be set by value individually
---
Given I navigate to "checkbox input test page"
And I set "checkbox input" to "checkbox 2 value"
And I set "checkbox input" to "checkbox 3 value"
And "checkbox input" should be set to "checkbox 2 value, checkbox 3 value"
When I click "submit button"
Then "submitted checkbox" should be "checkbox 2 value; checkbox 3 value"


Scenario: Multiple checkbox inputs can be set by value together
---
Given I navigate to "checkbox input test page"
And I set "checkbox input" to "checkbox 2 value, checkbox 3 value"
And "checkbox input" should be set to "checkbox 2 value, checkbox 3 value"
When I click "submit button"
Then "submitted checkbox" should be "checkbox 2 value; checkbox 3 value"
