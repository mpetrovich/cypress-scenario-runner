Feature: Text inputs
===


Scenario: Text inputs can be set
---
Given I navigate to "input actions"
And I set "text input" to "Text value"
When I click "submit button"
Then "submitted text" text should be "Text value"


Scenario: Invisible text inputs can be set when they have a force attribute
---
Given I navigate to "input actions"
And "invisible-text input" should not be visible
And I set "invisible-text input" to "Text value"
When I click "submit button"
Then "submitted invisible-text" text should be "Text value"


Scenario: Text inputs with the test element attribute set on an ancestor can be set
---
Given I navigate to "input actions"
And I set "wrapped-text input" to "Text value"
When I click "submit button"
Then "submitted wrapped-text" text should be "Text value"


Scenario: Text input value can be asserted to be equal to its string value
---
Given I navigate to "input assertions"
And "text input" should be set to "Initial text value"
When I set "text input" to "New text value"
Then "text input" should be set to "New text value"
