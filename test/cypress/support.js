const runner = require('../../index')
const path = require('path')

runner.setPages({
	actions: '/test/pages/actions.html',
	assertions: '/test/pages/assertions.html',
	'input actions': '/test/pages/actions-inputs.html',
	'input assertions': '/test/pages/assertions-inputs.html',
})
runner.setUsers({})
runner.initCommands()
