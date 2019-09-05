Feature: Text content
===


Scenario: Element text content can be asserted to be equal to a string, ignoring case and surrounding whitespace
---
When I navigate to "assertions"
Then "element text" should be "element text content"


Scenario: Element text content can be asserted to be inequal to a string, ignoring case and surrounding whitespace
---
When I navigate to "assertions"
Then "element text" should not be "different text content"


Scenario: Element text content can be asserted to contain a string, ignoring case
---
When I navigate to "assertions"
Then "element text" should contain "text content"


Scenario: Element text content can be asserted to not contain a string, ignoring case
---
When I navigate to "assertions"
Then "element text" should not contain "different text content"


Scenario: Inline data tables can be used to assert that element text content is equal to a string, ignoring case and surrounding whitespace
---
When I navigate to "assertions"
Then elements should be:
| element      | value                |
| element text | element text content |
| another text | another text content |


Scenario: Inline data tables can be used to assert that element text content contains a string, ignoring case
---
When I navigate to "assertions"
And elements should contain:
| element      | value   |
| element text | element |
| another text | another |
