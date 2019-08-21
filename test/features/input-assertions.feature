Feature: Input assertions
===


Scenario: Text input value can be asserted to be equal to its string value
---
Given I navigate to "input assertions"
And "text input" should be set to "Initial text value"
When I set "text input" to "New text value"
Then "text input" should be set to "New text value"


Scenario: Password input value can be asserted to be equal to its string value
---
Given I navigate to "input assertions"
And "password input" should be set to "Initial password value"
When I set "password input" to "New password value"
Then "password input" should be set to "New password value"


Scenario: Radio input value can be asserted to be equal to its string value
---
Given I navigate to "input assertions"
And "radio input" should be set to "radio 1 value"
When I set "radio input" to "radio 2 value"
Then "radio input" should be set to "radio 2 value"


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


Scenario: Select input value can be asserted to be equal to its string value
---
Given I navigate to "input assertions"
And "select input" should be set to "option 1 value"
When I set "select input" to "option 2 value"
Then "select input" should be set to "option 2 value"


Scenario: The value of a single-selection file input can be asserted to be equal to its string value
---
Given I navigate to "input assertions"
When I set "single-file input" to "file.txt"
Then "single-file input" should be set to "file.txt"


Scenario: The value of multiple-selection file input can be asserted to be equal to a comma-delimited string of its values
---
Given I navigate to "input assertions"
When I set "multi-file input" to "file.txt, file-2.txt"
Then "multi-file input" should be set to "file.txt, file-2.txt"
