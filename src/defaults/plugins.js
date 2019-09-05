const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
	on('file:preprocessor', cucumber())

	config.elementAttr = 'data-test'
	config.elementValueAttr = 'data-value'
	config.elementOptionsAttr = 'data-options'
	config.elementOptions = JSON.stringify({ force: false })
	config.defaultCommandWait = 0

	return config
}
