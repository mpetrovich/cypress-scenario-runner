const scenarioRunner = require('./cypress-scenario-runner/index');

module.exports = (on, config) => {
	scenarioRunner(on, config);

	// Optional settings
	// config.defaultCommandWait = 250;
	// config.elementAttributeName = 'data-test';
	// config.valueAttributeName = 'data-test-val';

	return config;
};
