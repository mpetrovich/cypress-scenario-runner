Feature: Visibility
===


Scenario: Can wait for an element to become hidden
---
Given I navigate to "actions"
And "disappearing element" should be visible
When I click "disappear button"
And I wait for "disappearing element" to disappear
Then "disappearing element" should not be visible


Scenario: A non-empty visible element is visible
---
When I navigate to "assertions"
Then "non-empty visible element" should be visible


Scenario: An empty visible element is not visible
---
When I navigate to "assertions"
Then "empty visible element" should not be visible


Scenario: A visually hidden element is not visible
---
When I navigate to "assertions"
Then "visually hidden element" should not be visible


Scenario: A nonexistent element is not visible
---
When I navigate to "assertions"
Then "nonexistent element" should not be visible
