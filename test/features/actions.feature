Feature: Actions
===


Scenario: Can navigate to a page by name
---
When I navigate to "actions"
Then I should be on "actions"


Scenario: Can navigate to a page by path
---
When I navigate to "actions"
Then I should be on "/test/pages/actions.html"


Scenario: Can click a visible element
---
Given I navigate to "actions"
When I click "clickable element"
Then "clickable element result" should be "Button clicked"


Scenario: Can click an invisible element when it has a force attribute
---
Given I navigate to "actions"
When I click "clickable invisible element"
Then "clickable invisible element result" should be "Invisible button clicked"


Scenario: Can wait for a specified number of seconds
---
When I navigate to "actions"
Then I wait 0.25 seconds


Scenario: Can wait for an element to become hidden
---
Given I navigate to "actions"
And "disappearing element" should be visible
When I click "disappear button"
And I wait for "disappearing element" to disappear
Then "disappearing element" should not be visible


Scenario: Can use custom actions
---
Given I navigate to "actions"
When I double-click "double-clickable element"
Then "double-clickable element result" should be "Element double-clicked"


Scenario: Can use custom assertions
---
When I navigate to "actions"
Then "even number" should be even
Then "odd number" should be odd


Scenario: Actions can be used with Then
---
When I navigate to "actions"
Then I click "clickable element"
Then "clickable element result" should be "Button clicked"
