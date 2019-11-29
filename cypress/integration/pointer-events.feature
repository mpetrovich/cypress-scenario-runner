Feature: Pointer events
===


Scenario: Can click a visible element
---
Given I navigate to "actions"
When I click "clickable element"
Then "clickable element result" text should be "Button clicked"


Scenario: Can click an invisible element when it has a force attribute
---
Given I navigate to "actions"
And "clickable invisible element" should not be visible
When I click "clickable invisible element"
Then "clickable invisible element result" text should be "Invisible button clicked"


