Feature: Custom steps
===


Scenario: Can use custom actions
---
Given I navigate to "actions"
When I double-click "double-clickable element"
Then "double-clickable element result" text should be "Element double-clicked"


Scenario: Can use custom assertions
---
When I navigate to "actions"
Then "even number" should be even
Then "odd number" should be odd
