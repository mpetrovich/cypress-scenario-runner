const elAttrName = Cypress.config('elementAttributeName') || 'data-test'
const forceAttrName = Cypress.config('forceAttributeName') || 'data-test-force'

module.exports = {
	actions: {
		login: function() {
			throw new Error('You must implement login yourself')
		},

		logout: function() {
			cy.clearCookies()
		},

		navigate: function(page, table, { pages }) {
			cy.visit(pages[page] || page)
		},

		click: function(name) {
			cy.getElem(name).then($element => {
				const force = $element.attr(forceAttrName) === 'true'
				cy.wrap($element).click({ force })
			})
		},

		set: function(field, value) {
			cy.getInput(field).input(value)
		},

		pause: function() {
			cy.pause()
		},

		debug: function() {
			cy.debug()
		},

		wait: function(wait) {
			cy.wait(wait * 1000)
		},

		waitUntilHidden: function(name) {
			const poll = function($element, resolve) {
				if ($element && $element.is(':visible')) {
					setTimeout(() => poll($element, resolve), 500)
				} else {
					resolve()
				}
			}
			cy.get('html').then(
				$html =>
					new Promise(function(resolve, reject) {
						let $element = $html.find(`[${elAttrName}="${name}"]`)
						poll($element, resolve)
					})
			)
		},

		inputTable: function(table, { actions }) {
			const rows = table.raw().slice(1) // First row is column headers

			for (const row of rows) {
				let [field, value] = row
				actions.set(field, value)
			}
		},
	},

	assertions: {
		isOnPage: function(page, table, { pages }) {
			let path = pages[page] || page

			if (path.startsWith('/') && path.endsWith('/')) {
				path = new RegExp(path.slice(1, -1))
			}

			let comparator = path instanceof RegExp ? 'match' : 'eq'
			cy.location('pathname').should(comparator, path)
		},

		isNotOnPage: function(page, table, { pages }) {
			let path = pages[page] || page

			if (path.startsWith('/') && path.endsWith('/')) {
				path = new RegExp(path.slice(1, -1))
			}

			let comparator = path instanceof RegExp ? 'not.match' : 'not.eq'
			cy.location('pathname').should(comparator, path)
		},

		isVisible: function(name) {
			cy.getElem(name).should('be.visible')
		},

		isNotVisible: function(name) {
			cy.getElem(name).should('not.be.visible')
		},

		hasCount: function(name, count) {
			cy.getElem(name).should('have.length', count)
		},

		hasText: function(name, value) {
			cy.getElem(name).should($element =>
				expect(
					$element
						.text()
						.trim()
						.toLowerCase()
				).to.eq(value.toLowerCase())
			)
		},

		hasTextTable: function(table, { assertions }) {
			const rows = table.raw().slice(1) // First row is column headers

			for (const row of rows) {
				let [element, value] = row
				assertions.hasText(element, value)
			}
		},

		hasValue: function(name, value) {
			cy.getInput(name).then($input => {
				if ($input.is(':checkbox') || $input.is(':radio')) {
					const inputName = $input.attr('name')
					const values = $input
						.closest('form, :root')
						.find(`[name="${inputName}"]`)
						.filter(':checked')
						.map(function() {
							return this.value
						})
						.get()
						.join(', ')

					expect(values).to.eq(value)
				} else if ($input.is('select')) {
					const values = [].concat($input.val()).join(', ')
					expect(values).to.eq(value)
				} else if ($input.is('[type="file"]')) {
					const filenames = value.split(',').map(s => s.trim())
					const files = []
					for (let i = 0; i < $input[0].files.length; i++) {
						files.push($input[0].files[i].name)
					}
					expect(files).to.deep.eq(filenames)
				} else {
					expect($input.val()).to.eq(value)
				}
			})
		},

		doesNotHaveText: function(name, value) {
			cy.getElem(name).should($element =>
				expect(
					$element
						.text()
						.trim()
						.toLowerCase()
				).not.to.eq(value.toLowerCase())
			)
		},

		containsText: function(name, value) {
			cy.getElem(name).should($element => expect($element.text().toLowerCase()).to.contain(value.toLowerCase()))
		},

		containsTextTable: function(table, { assertions }) {
			const rows = table.raw().slice(1) // First row is column headers

			for (const row of rows) {
				let [element, value] = row
				assertions.containsText(element, value)
			}
		},

		doesNotContainText: function(name, value) {
			cy.getElem(name).should($element => expect($element.text().toLowerCase()).not.to.contain(value.toLowerCase()))
		},
	},

	preconditions: {
		loggedIn: function(usertype, table, context) {
			context.actions.login(usertype, table, context)
		},

		loggedOut: function(table, context) {
			context.actions.logout(table, context)
		},
	},
}
