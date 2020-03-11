Feature: Checkbox inputs
===


Scenario: A checkbox input can be set by value
---
Given I navigate to "checkbox input test page"
And I set "checkbox input" to "checkbox 2 value"
And "checkbox input" should be set to "checkbox 2 value"
When I click "submit button"
Then "submitted checkbox" text should be "checkbox 2 value"


Scenario: An invisible checkbox input can be set by value when it has a force attribute
---
Given I navigate to "checkbox input test page"
And "invisible-checkbox input" should not be visible
And I set "invisible-checkbox input" to "checkbox 2 value"
And "invisible-checkbox input" should be set to "checkbox 2 value"
When I click "submit button"
Then "submitted invisible-checkbox" text should be "checkbox 2 value"


Scenario: A wrapped checkbox input with the test element attribute set on an ancestor can be set by value
---
Given I navigate to "checkbox input test page"
And I set "wrapped-checkbox input" to "checkbox 2 value"
And "wrapped-checkbox input" should be set to "checkbox 2 value"
When I click "submit button"
Then "submitted wrapped-checkbox" text should be "checkbox 2 value"


Scenario: Multiple checkbox inputs can be set by value individually
---
Given I navigate to "checkbox input test page"
And I set "checkbox input" to "checkbox 2 value"
And I set "checkbox input" to "checkbox 3 value"
And "checkbox input" should be set to "checkbox 2 value, checkbox 3 value"
When I click "submit button"
Then "submitted checkbox" text should be "checkbox 2 value, checkbox 3 value"


Scenario: Multiple checkbox inputs can be set by value together
---
Given I navigate to "checkbox input test page"
And I set "checkbox input" to "checkbox 2 value, checkbox 3 value"
And "checkbox input" should be set to "checkbox 2 value, checkbox 3 value"
When I click "submit button"
Then "submitted checkbox" text should be "checkbox 2 value, checkbox 3 value"


Scenario: A solo unselected checkbox input can be checked
---
Given I navigate to "checkbox input test page"
And I set "solo-unselected-checkbox input" to "checked"
And "solo-unselected-checkbox input" should be set to "checkbox custom attribute value"
When I click "submit button"
Then "submitted solo-unselected-checkbox" text should be "checkbox value"


Scenario: A solo preselected checkbox input can be unchecked
---
Given I navigate to "checkbox input test page"
And I set "solo-preselected-checkbox input" to "unchecked"
And "solo-preselected-checkbox input" should not be set to "checkbox custom attribute value"
When I click "submit button"
Then "submitted solo-preselected-checkbox" text should not be "checkbox value"


Scenario: A single unselected checkbox input can be checked
---
Given I navigate to "checkbox input test page"
And I set "single-unselected-checkbox input" to "checkbox 2 value"
And "single-unselected-checkbox input" should be set to "checkbox 2 value"
When I click "submit button"
Then "submitted single-unselected-checkbox" text should be "checkbox 2 value"


Scenario: A single preselected checkbox input can be unchecked
---
Given I navigate to "checkbox input test page"
And I set "single-preselected-checkbox input" to "checkbox 2 value"
And "single-preselected-checkbox input" should be set to "checkbox 2 value"
When I click "submit button"
Then "submitted single-preselected-checkbox" text should be "checkbox 2 value"


Scenario: Multiple unselected checkboxes inputs can be checked
---
Given I navigate to "checkbox input test page"
And I set "multiple-unselected-checkbox input" to "checkbox 2 value"
And "multiple-unselected-checkbox input" should be set to "checkbox 2 value"
When I click "submit button"
Then "submitted multiple-unselected-checkbox" text should be "checkbox 2 value"


Scenario: Multiple preselected checkbox inputs can be unchecked
---
Given I navigate to "checkbox input test page"
And I set "multiple-preselected-checkbox input" to "checkbox 2 value"
And "multiple-preselected-checkbox input" should be set to "checkbox 2 value"
When I click "submit button"
Then "submitted multiple-preselected-checkbox" text should be "checkbox 2 value"
