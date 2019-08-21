# Setup

## Tagging

Coming soon.

## Settings

This package adds several new settings that can be configured in the Cypress plugins file (by default, `cypress/plugins/index.js`):

```js
module.exports = (on, config) => {
	config.baseUrl = 'https://www.example.com/'
	config.defaultCommandWait = 250
	config.elementAttr = 'data-test'
	config.elementValueAttr = 'data-test-val'
	config.forceAttr = 'data-test-force'
	return config
}
```

| Parameter            | Default           | Description                                                                                                                                                                                                          |
| -------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defaultCommandWait` | `0`               | Number of milliseconds to wait before each scenario step. Useful if the UI needs a delay for DOM elements to update.                                                                                                 |
| `elementAttr`        | `data-test`       | Name of the attribute whose value is used to match elements                                                                                                                                                          |
| `elementValueAttr`   | `data-test-val`   | Name of the attribute whose value is used to match multi-checkbox inputs                                                                                                                                             |
| `forceAttr`          | `data-test-force` | Name of the attribute whose value is used to determine whether an input's value should be set even if the input is not visible or focusable; if omitted, defaults to behaving as if `data-test-force="true" was set` |

## Custom steps

Coming soon.

## Custom behaviors

See [Custom Behaviors](custom-behaviors.md)
