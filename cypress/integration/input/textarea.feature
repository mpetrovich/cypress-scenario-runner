Feature: Textarea inputs
===


Scenario: Textarea inputs can be set
---
Given I navigate to "input actions"
And I set "textarea input" to "Textarea value"
When I click "submit button"
Then "submitted textarea" should be "Textarea value"


Scenario: Invisible textarea inputs can be set when they have a force attribute
---
Given I navigate to "input actions"
And "invisible-textarea input" should not be visible
And I set "invisible-textarea input" to "Textarea value"
When I click "submit button"
Then "submitted invisible-textarea" should be "Textarea value"


Scenario: Textarea inputs with the test element attribute set on an ancestor can be set
---
Given I navigate to "input actions"
And I set "wrapped-textarea input" to "Textarea value"
When I click "submit button"
Then "submitted wrapped-textarea" should be "Textarea value"


Scenario: Textarea input value can be asserted to be equal to its string value
---
Given I navigate to "input assertions"
And "textarea input" should be set to "Initial textarea value"
When I set "textarea input" to "New textarea value"
Then "textarea input" should be set to "New textarea value"
