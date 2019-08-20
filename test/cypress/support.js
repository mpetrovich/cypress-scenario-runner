const runner = require('../../index')
const path = require('path')

runner.setPages({
	actions: '/test/pages/actions.html',
	inputs: '/test/pages/inputs.html',
	assertions: '/test/pages/assertions.html',
})
runner.setUsers({})
runner.initCommands()
