Feature: Text inputs
===


Scenario: Text inputs can be set within an ancestor element
---
Given I navigate to "input container"
And within "ancestor element", I set "text input" to "Text value"
When I click "submit button"
Then "submitted text" text should be "Text value"


Scenario: Invisible text inputs can be set within an ancestor element when they have a force attribute
---
Given I navigate to "input container"
And "invisible-text input" should not be visible
And within "ancestor element", I set "invisible-text input" to "Text value"
When I click "submit button"
Then "submitted invisible-text" text should be "Text value"


Scenario: Text inputs within an ancestor element with the test element attribute set on an ancestor can be set
---
Given I navigate to "input container"
And within "ancestor element", I set "wrapped-text input" to "Text value"
When I click "submit button"
Then "submitted wrapped-text" text should be "Text value"


Scenario: Text input value can be asserted to be equal to its string value within an ancestor element
---
Given I navigate to "input container"
And within "ancestor element", "text input" should be set to "Initial text value"
When within "ancestor element", I set "text input" to "New text value"
Then within "ancestor element", "text input" should be set to "New text value"
