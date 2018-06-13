Feature: Login
===


Scenario: Login success
---
Given I am logged out
And I navigate to "login"
And I set the "email input" to "name@example.com"
And I set the "password input" to "abc123"
When I click the "login button"
Then I will navigate to "dashboard"


Scenario: Login failure
---
Given I am logged out
And I navigate to "login"
And I set the "email input" to "name@example.com"
And I set the "password input" to "the wrong password"
When I click the "login button"
Then I will not navigate to "dashboard"
And I will navigate to "login"
And I will see the "login error message"
