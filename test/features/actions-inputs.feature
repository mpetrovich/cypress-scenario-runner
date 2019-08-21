Feature: Actions for inputs
===


Scenario: Text inputs can be set
---
Given I navigate to "input actions"
And I set "text input" to "Text value"
When I click "submit button"
Then "submitted text" should be "Text value"


Scenario: Invisible text inputs can be set when they have a force attribute
---
Given I navigate to "input actions"
And I set "invisible-text input" to "Text value"
When I click "submit button"
Then "submitted invisible-text" should be "Text value"


Scenario: Text inputs with the test element attribute set on an ancestor can be set
---
Given I navigate to "input actions"
And I set "wrapped-text input" to "Text value"
When I click "submit button"
Then "submitted wrapped-text" should be "Text value"


Scenario: Password inputs can be set
---
Given I navigate to "input actions"
And I set "password input" to "Password value"
When I click "submit button"
Then "submitted password" should be "Password value"


Scenario: Invisible password inputs can be set when they have a force attribute
---
Given I navigate to "input actions"
And I set "invisible-password input" to "Password value"
When I click "submit button"
Then "submitted invisible-password" should be "Password value"


Scenario: Password inputs with the test element attribute set on an ancestor can be set
---
Given I navigate to "input actions"
And I set "wrapped-password input" to "Password value"
When I click "submit button"
Then "submitted wrapped-password" should be "Password value"


Scenario: Textarea inputs can be set
---
Given I navigate to "input actions"
And I set "textarea input" to "Textarea value"
When I click "submit button"
Then "submitted textarea" should be "Textarea value"


Scenario: Invisible textarea inputs can be set when they have a force attribute
---
Given I navigate to "input actions"
And I set "invisible-textarea input" to "Textarea value"
When I click "submit button"
Then "submitted invisible-textarea" should be "Textarea value"


Scenario: Textarea inputs with the test element attribute set on an ancestor can be set
---
Given I navigate to "input actions"
And I set "wrapped-textarea input" to "Textarea value"
When I click "submit button"
Then "submitted wrapped-textarea" should be "Textarea value"


Scenario: Radio inputs can be set by value
---
Given I navigate to "input actions"
And I set "radio input" to "radio 2 value"
When I click "submit button"
Then "submitted radio" should be "radio 2 value"


Scenario: Invisible radio inputs can be set by value when they have a force attribute
---
Given I navigate to "input actions"
And I set "invisible-radio input" to "radio 2 value"
When I click "submit button"
Then "submitted invisible-radio" should be "radio 2 value"


Scenario: Radio inputs with the test element attribute set on an ancestor can be set by value
---
Given I navigate to "input actions"
And I set "wrapped-radio input" to "radio 2 value"
When I click "submit button"
Then "submitted wrapped-radio" should be "radio 2 value"


Scenario: Radio inputs can be set by custom attribute value
---
Given I navigate to "input actions"
And I set "radio input" to "radio 2 custom attribute value"
When I click "submit button"
Then "submitted radio" should be "radio 2 value"


Scenario: A single checkbox input can be set by value
---
Given I navigate to "input actions"
And I set "checkbox input" to "checkbox 2 value"
When I click "submit button"
Then "submitted checkbox" should be "checkbox 2 value"


Scenario: A single checkbox input can be set by value when they have a force attribute
---
Given I navigate to "input actions"
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


Scenario: Select inputs can be set by value
---
Given I navigate to "input actions"
And I set "select input" to "option 2 value"
When I click "submit button"
Then "submitted select" should be "option 2 value"


Scenario: Invisible select inputs can be set by value when they have a force attribute
---
Given I navigate to "input actions"
And I set "invisible-select input" to "option 2 value"
When I click "submit button"
Then "submitted invisible-select" should be "option 2 value"


Scenario: Select inputs with the test element attribute set on an ancestor can be set by value
---
Given I navigate to "input actions"
And I set "wrapped-select input" to "option 2 value"
When I click "submit button"
Then "submitted wrapped-select" should be "option 2 value"


Scenario: Select inputs can be set by label
---
Given I navigate to "input actions"
And I set "select input" to "option 2 label"
When I click "submit button"
Then "submitted select" should be "option 2 value"


Scenario: Multi-select inputs can be set by value
---
Given I navigate to "input actions"
And I set "multi-select input" to "option 2 value, option 3 value"
When I click "submit button"
Then "submitted multi-select" should be "option 2 value; option 3 value"


Scenario: Multi-select inputs can be set by label
---
Given I navigate to "input actions"
And I set "multi-select input" to "option 2 label, option 3 label"
When I click "submit button"
Then "submitted multi-select" should be "option 2 value; option 3 value"


Scenario: Single-selection file inputs can be set
---
Given I navigate to "input actions"
And I set "single-file input" to "file.txt"
When I click "submit button"
Then "submitted single-file" should be "file.txt"


Scenario: Single-selection file inputs can be set when they have a force attribute
---
Given I navigate to "input actions"
And I set "invisible-single-file input" to "file.txt"
When I click "submit button"
Then "submitted invisible-single-file" should be "file.txt"


Scenario: Single-selection file inputs with the test element attribute set on an ancestor can be set
---
Given I navigate to "input actions"
And I set "wrapped-single-file input" to "file.txt"
When I click "submit button"
Then "submitted wrapped-single-file" should be "file.txt"


Scenario: Multiple-selection file inputs can be set
---
Given I navigate to "input actions"
And I set "multi-file input" to "file.txt, file-2.txt"
When I click "submit button"
Then "submitted multi-file" should be "file.txt; file-2.txt"


Scenario: Multiple-selection file inputs can be set when they have a force attribute
---
Given I navigate to "input actions"
And I set "invisible-multi-file input" to "file.txt, file-2.txt"
When I click "submit button"
Then "submitted invisible-multi-file" should be "file.txt; file-2.txt"


Scenario Template: Input values can be set within a scenario template
---
Given I navigate to "input actions"
And I set "<field>" to "<value>"
When I click "submit button"
Then "<submitted field>" should be "<submitted value>"

Examples:
| field             | value                              | submitted field       | submitted value                    |
| text input        | Text value                         | submitted text        | Text value                         |
| password input    | Password value                     | submitted password    | Password value                     |
| textarea input    | Textarea value                     | submitted textarea    | Textarea value                     |
| radio input       | radio 2 value                      | submitted radio       | radio 2 value                      |
| radio input       | radio 2 custom attribute value     | submitted radio       | radio 2 value                      |
| checkbox input    | checkbox 2 value                   | submitted checkbox    | checkbox 2 value                   |
| checkbox input    | checkbox 2 value, checkbox 3 value | submitted checkbox    | checkbox 2 value; checkbox 3 value |
| select input      | option 2 value                     | submitted select      | option 2 value                     |
| select input      | option 2 label                     | submitted select      | option 2 value                     |
| single-file input | file.txt                           | submitted single-file | file.txt                           |
| multi-file input  | file.txt, file-2.txt               | submitted multi-file  | file.txt; file-2.txt               |


Scenario: Input values can be set using inline data tables
---
Given I navigate to "input actions"
And I set:
| element          | value                              |
| text input       | Text value                         |
| password input   | Password value                     |
| textarea input   | Textarea value                     |
| radio input      | radio 2 value                      |
| checkbox input   | checkbox 2 value, checkbox 3 value |
| select input     | option 2 label                     |
| multi-file input | file.txt, file-2.txt               |
When I click "submit button"
Then "submitted text" should be "Text value"
Then "submitted password" should be "Password value"
Then "submitted textarea" should be "Textarea value"
Then "submitted radio" should be "radio 2 value"
Then "submitted checkbox" should be "checkbox 2 value; checkbox 3 value"
Then "submitted select" should be "option 2 value"
Then "submitted multi-file" should be "file.txt; file-2.txt"


Scenario: Random values can be set inline
---
Given I navigate to "input actions"
And I set "text input" to "<random full name>"
And I set "password input" to "<random password>"
When I click "submit button"
Then "submitted text" should be visible
Then "submitted text" should not be "<random full name>"
Then "submitted password" should be visible
Then "submitted password" should not be "<random password>"


Scenario: Random values can be set using inline data tables
---
Given I navigate to "input actions"
And I set:
| element        | value              |
| text input     | <random full name> |
| password input | <random password>  |
When I click "submit button"
Then "submitted text" should be visible
Then "submitted text" should not be "<random full name>"
Then "submitted password" should be visible
Then "submitted password" should not be "<random password>"


Scenario Template: Random values can be set in a scenario template table
---
Given I navigate to "input actions"
And I set "text input" to "<text value>"
And I set "password input" to "<password value>"
When I click "submit button"
Then "submitted text" should be visible
Then "submitted text" should not contain "random"
Then "submitted password" should be visible
Then "submitted password" should not contain "random"

Examples:
| text value              | password value          |
| <random full name>      | <random full name>      |
| <random first name>     | <random first name>     |
| <random last name>      | <random last name>      |
| <random full name>      | <random full name>      |
| <random phone>          | <random phone>          |
| <random email>          | <random email>          |
| <random password>       | <random password>       |
| <random street address> | <random street address> |
| <random city>           | <random city>           |
| <random state>          | <random state>          |
| <random zip>            | <random zip>            |
| <random number>         | <random number>         |
| <random dollar value>   | <random dollar value>   |
