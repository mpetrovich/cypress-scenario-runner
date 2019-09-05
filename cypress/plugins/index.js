const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
	on('file:preprocessor', cucumber())

	config.elementAttr = 'test-elem'
	config.elementValueAttr = 'test-value'
	config.elementOptionsAttr = 'test-options'
	config.elementOptions = JSON.stringify({ force: false })
	config.defaultCommandWait = 0

	return config
}
