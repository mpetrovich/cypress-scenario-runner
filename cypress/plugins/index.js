const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
	on('file:preprocessor', cucumber())

	config.elementAttr = 't-element'
	config.elementValueAttr = 't-value'
	config.elementOptionsAttr = 't-options'
	config.elementOptions = JSON.stringify({ force: false })
	config.defaultCommandWait = 0

	return config
}
