const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
	on('file:preprocessor', cucumber())

	config.elementAttributeName = 'test-elem'
	config.valueAttributeName = 'test-value'
	config.forceAttributeName = 'test-force'

	return config
}
