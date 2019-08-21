const runner = require('../../index')
const path = require('path')

runner.setPages({
	actions: '/test/pages/actions.html',
	assertions: '/test/pages/assertions.html',
	'input actions': '/test/pages/input-actions.html',
	'input assertions': '/test/pages/input-assertions.html',
})
runner.setUsers({})
runner.initCommands()
