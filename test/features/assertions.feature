Feature: Assertions
===


Scenario: Can assert to be on the current page by page name
---
When I navigate to "assertions"
Then I should be on "assertions"


# Scenario: Can assert to be on the current page by page path string
# ---
# When I navigate to "assertions"
# Then I should be on "/test/pages/assertions.html"


# Scenario: Can assert to be on the current page by page path regex
# ---
# When I navigate to "assertions"
# Then I should be on "/assert.*\.html$/"


Scenario: Can assert to not be on a different page by page name
---
When I navigate to "assertions"
Then I should not be on "another page"


Scenario: Can assert to not be on a different page by page path string
---
When I navigate to "assertions"
Then I should not be on "/test/pages/another.html"


Scenario: Can assert to not be on a different page by page path regex
---
When I navigate to "assertions"
Then I should not be on "/another.*\.html$/"


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


Scenario: The count of a set of existing elements is nonzero
---
When I navigate to "assertions"
Then "countable element" should have 5 occurrences


Scenario: The count of a set of nonexistent elements is zero
---
When I navigate to "assertions"
Then "nonexistent element" should have 0 occurrences


Scenario: Element text content can be asserted to be equal to a string, ignoring case and surrounding whitespace
---
When I navigate to "assertions"
Then "element text" should be "element text content"


Scenario: Element text content can be asserted to be inequal to a string, ignoring case and surrounding whitespace
---
When I navigate to "assertions"
Then "element text" should not be "different text content"


Scenario: Element text content can be asserted to contain a string, ignoring case and surrounding whitespace
---
When I navigate to "assertions"
Then "element text" should contain "text content"


Scenario: Element text content can be asserted to not contain a string, ignoring case and surrounding whitespace
---
When I navigate to "assertions"
Then "element text" should not contain "different text content"
