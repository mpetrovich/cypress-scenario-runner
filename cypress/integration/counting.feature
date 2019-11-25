Feature: Counting
===


Scenario: The count of a set of existing elements is nonzero
---
When I navigate to "assertions"
Then "countable element" should have 3 occurrences


Scenario: Visually hidden and invisible elements are countable
---
When I navigate to "assertions"
Then "mixed visibility countable element" should have 6 occurrences


Scenario: The count of a set of nonexistent elements is zero
---
When I navigate to "assertions"
Then "nonexistent element" should have 0 occurrences
