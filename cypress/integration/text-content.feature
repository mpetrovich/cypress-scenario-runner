Feature: Text content
===


Scenario: Text content of an element can be asserted to be equal to a string, ignoring case and surrounding whitespace
---
When I navigate to "assertions"
Then "element text" text should be "element text content"
And "element text" text should be "  ELEMENT TEXT CONTENT  "


Scenario: Text content of a descendent element within an ancestor element can be asserted to be equal to a string, ignoring case and surrounding whitespace
---
When I navigate to "assertions"
Then within "ancestor element", "descendant element text" text should be "descendant element text content"
And within "ancestor element", "descendant element text" text should be "  DESCENDANT ELEMENT TEXT CONTENT  "


Scenario: Text content of an element can be asserted to be inequal to a string, ignoring case and surrounding whitespace
---
When I navigate to "assertions"
Then "element text" text should not be "different text content"


Scenario: Text content of a descendent element within an ancestor element can be asserted to be inequal to a string, ignoring case and surrounding whitespace
---
When I navigate to "assertions"
Then within "ancestor element", "descendant element text" text should not be "different descendant text content"


Scenario: Element text content can be asserted to contain a string, ignoring case but not surrounding whitespace
---
When I navigate to "assertions"
Then "element text" text should contain "text content"
Then "element text" text should contain "TEXT CONTENT"
Then "element text" text should not contain " text content "


Scenario: Element text content can be asserted to not contain a string, ignoring case but not surrounding whitespace
---
When I navigate to "assertions"
Then "element text" text should not contain "different text content"
Then "element text" text should not contain "  DIFFERENT TEXT CONTENT  "
Then "element text" text should contain " text content"


Scenario: Inline data tables can be used to assert that element text content is equal to a string, ignoring case and surrounding whitespace
---
When I navigate to "assertions"
Then elements text should be:
| element      | value                |
| element text | element text content |
| another text | another text content |


Scenario: Inline data tables can be used to assert that element text content is not equal to a string, ignoring case and surrounding whitespace
---
When I navigate to "assertions"
Then elements text should not be:
| element      | value                |
| element text | another text content |
| another text | element text content |


Scenario: Inline data tables can be used to assert that element text content contains a string, ignoring case
---
When I navigate to "assertions"
And elements text should contain:
| element      | value   |
| element text | element |
| another text | another |


Scenario: Inline data tables can be used to assert that element text content does not contain a string, ignoring case
---
When I navigate to "assertions"
And elements text should not contain:
| element      | value   |
| element text | another |
| another text | element |
