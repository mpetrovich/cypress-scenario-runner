Feature: Signup
===

Users can sign up with an email and password.
Upon successful signup, they are redirected to their home page.
Upon unsuccessful signup, the are returned to the signup page with a visible error message.


Scenario: Signup success
---
Given I am logged out
And I navigate to "signup"
And I set "email" to "name@example.com"
And I set "password" to "abc123"
When I click "signup button"
Then I will navigate to "home"


Scenario Outline: Signup error (with an examples table)
---
Given I am logged out
And I navigate to "signup"
And I set "email" to "<email>"
And I set "password" to "<password>"
When I click "signup button"
Then I will not navigate to "home"
And I will navigate to "signup"
And I will see "<error message>"

Examples:
| email            | password          | error message                               |
| not an email     | <random password> | Please enter a valid email address          |
| name@example.com | short             | Your password must be at least 8 characters |


Scenario: Signup error (with inline data tables)
---
Given I am logged out
And I navigate to "signup"
And I set:
| email | not an email |
| password | <random password> |
When I click "signup button"
Then I will not navigate to "home"
And I will navigate to "signup"
And I will see "<error message>"
