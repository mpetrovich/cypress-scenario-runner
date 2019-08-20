Feature: Inputs
===


Scenario: Text inputs can be set
---
Given I navigate to "inputs"
And I set "text input" to "Text value"
When I click "submit button"
Then "submitted text" should be "Text value"


Scenario: Password inputs can be set
---
Given I navigate to "inputs"
And I set "password input" to "Password value"
When I click "submit button"
Then "submitted password" should be "Password value"


Scenario: Radio inputs can be set by value
---
Given I navigate to "inputs"
And I set "radio input" to "radio 2 value"
When I click "submit button"
Then "submitted radio" should be "radio 2 value"


Scenario: Radio inputs can be set by custom attribute value
---
Given I navigate to "inputs"
And I set "radio input" to "radio 2 custom attribute value"
When I click "submit button"
Then "submitted radio" should be "radio 2 value"


Scenario: A single checkbox input can be set by value
---
Given I navigate to "inputs"
And I set "checkbox input" to "checkbox 2 value"
When I click "submit button"
Then "submitted checkbox" should be "checkbox 2 value"


Scenario: Multiple checkbox inputs can be set by value individually
---
Given I navigate to "inputs"
And I set "checkbox input" to "checkbox 2 value"
And I set "checkbox input" to "checkbox 3 value"
When I click "submit button"
Then "submitted checkbox" should be "checkbox 2 value; checkbox 3 value"


Scenario: Multiple checkbox inputs can be set by value together
---
Given I navigate to "inputs"
And I set "checkbox input" to "checkbox 2 value, checkbox 3 value"
When I click "submit button"
Then "submitted checkbox" should be "checkbox 2 value; checkbox 3 value"


Scenario: Select inputs can be set by value
---
Given I navigate to "inputs"
And I set "select input" to "option 2 value"
When I click "submit button"
Then "submitted select" should be "option 2 value"


Scenario: Select inputs can be set by label
---
Given I navigate to "inputs"
And I set "select input" to "option 2 label"
When I click "submit button"
Then "submitted select" should be "option 2 value"


Scenario: Single-selection file inputs can be set
---
Given I navigate to "inputs"
And I set "file input" to "file.txt"
When I click "submit button"
Then "submitted file" should be "file.txt"


Scenario: Multiple-selection file inputs can be set
---
Given I navigate to "inputs"
And I set "file input" to "file.txt, file-2.txt"
When I click "submit button"
Then "submitted file" should be "file.txt; file-2.txt"


Scenario Template: Input values can be set within a scenario template
---
Given I navigate to "inputs"
And I set "<field>" to "<value>"
When I click "submit button"
Then "<submitted field>" should be "<submitted value>"

Examples:
| field          | value                              | submitted field    | submitted value                    |
| text input     | Text value                         | submitted text     | Text value                         |
| password input | Password value                     | submitted password | Password value                     |
| radio input    | radio 2 value                      | submitted radio    | radio 2 value                      |
| radio input    | radio 2 custom attribute value     | submitted radio    | radio 2 value                      |
| checkbox input | checkbox 2 value                   | submitted checkbox | checkbox 2 value                   |
| checkbox input | checkbox 2 value, checkbox 3 value | submitted checkbox | checkbox 2 value; checkbox 3 value |
| select input   | option 2 value                     | submitted select   | option 2 value                     |
| select input   | option 2 label                     | submitted select   | option 2 value                     |
| file input     | file.txt                           | submitted file     | file.txt                           |
| file input     | file.txt, file-2.txt               | submitted file     | file.txt; file-2.txt               |
