Feature: Login
===

Users can log in with their email and password.
Upon successful login, they are redirected to the dashboard.
Upon unsuccessful login, the are returned to the login screen with a visible error message.


Scenario: Login success
---
Given I am logged out
And I navigate to "login"
And I set "email input" to "name@example.com"
And I set "password input" to "abc123"
And I set "remember me checkbox" to "checked"
When I click "login button"
Then I will navigate to "dashboard"


Scenario: Login failure
---
Given I am logged out
And I navigate to "login"
And I set "email input" to "name@example.com"
And I set "password input" to "the wrong password"
And I set "remember me checkbox" to "checked"
When I click "login button"
Then I will not navigate to "dashboard"
And I will navigate to "login"
And I will see "login error message"
