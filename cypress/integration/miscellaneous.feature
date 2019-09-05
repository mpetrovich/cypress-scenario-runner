Feature: Miscellaneous
===


Scenario: Can wait for a specified number of seconds
---
When I navigate to "actions"
Then I wait 0.25 seconds


Scenario: Actions can be used with Then
---
When I navigate to "actions"
Then I click "clickable element"
Then "clickable element result" should be "Button clicked"
