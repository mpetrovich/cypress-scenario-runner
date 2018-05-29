const beforeFns = [];
const afterFns = [];

const utils = {

	beforeEach: function(fn) {
		beforeFns.push(fn);
	},

	afterEach: function(fn) {
		afterFns.push(fn);
	},

	run: function(fn) {
		return function() {
			beforeFns.forEach(fn => fn());
			let returned = fn.apply(this, arguments);
			afterFns.forEach(fn => fn());
			return returned;
		};
	},

};

Cypress.env('utils', utils);
