Feature: Random values
===


Scenario: Random values can be set inline
---
Given I navigate to "input actions"
And I set "text input" to "<random full name>"
And I set "password input" to "<random password>"
When I click "submit button"
Then "submitted text" should be visible
Then "submitted text" text should not be "<random full name>"
Then "submitted password" should be visible
Then "submitted password" text should not be "<random password>"


Scenario: Random values can be set using inline data tables
---
Given I navigate to "input actions"
And I set:
| element        | value              |
| text input     | <random full name> |
| password input | <random password>  |
When I click "submit button"
Then "submitted text" should be visible
Then "submitted text" text should not be "<random full name>"
Then "submitted password" should be visible
Then "submitted password" text should not be "<random password>"


Scenario Template: Random values can be set in a scenario template table
---
Given I navigate to "input actions"
And I set "text input" to "<text value>"
And I set "password input" to "<password value>"
When I click "submit button"
Then "submitted text" should be visible
Then "submitted text" text should not contain "random"
Then "submitted password" should be visible
Then "submitted password" text should not contain "random"

Examples:
| text value              | password value          |
| <random full name>      | <random full name>      |
| <random first name>     | <random first name>     |
| <random last name>      | <random last name>      |
| <random phone>          | <random phone>          |
| <random email>          | <random email>          |
| <random password>       | <random password>       |
| <random street address> | <random street address> |
| <random city>           | <random city>           |
| <random state>          | <random state>          |
| <random zip>            | <random zip>            |
| <random number>         | <random number>         |
| <random dollar value>   | <random dollar value>   |
