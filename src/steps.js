const { getElementOptions } = require("./index")

module.exports = {
    /*
        Actions
     */

    "I navigate to {route}": function(route, table, { routes }) {
        cy.visit(routes[route] || route)
    },

    "I click {element}": function(element, table, { options }) {
        cy.getElement(element).then($element => {
            const elementOptions = getElementOptions($element, options)
            cy.wrap($element).click(elementOptions)
        })
    },
    "within {element}, I click {element}": function(ancestorElement, element, table, { options }) {
        cy.getElementWithinAncestor(element, ancestorElement).then($element => {
            const elementOptions = getElementOptions($element, options)
            cy.wrap($element).click(elementOptions)
        })
    },

    "I set {element} to {string}": function(element, value) {
        cy.setInputElement(element, value)
    },
    "within {element}, I set {element} to {string}": function(ancestorElement, element, value) {
        cy.setInputElementWithinAncestor(element, ancestorElement, value)
    },

    "I set:": function(table, { steps }) {
        const rows = table.raw().slice(1) // First row is column headers

        for (const [field, value] of rows) {
            steps["I set {element} to {string}"](field, value)
        }
    },

    "I wait for {element} to disappear": function(element, table, { options }) {
        const poll = function($element, resolve) {
            if ($element && $element.is(":visible")) {
                setTimeout(() => poll($element, resolve), 500)
            } else {
                resolve()
            }
        }
        cy.get("html").then(
            $html =>
                new Promise(function(resolve, reject) {
                    const $element = $html.find(`[${options.elementAttr}="${element}"]`)
                    poll($element, resolve)
                })
        )
    },

    "I wait {float} seconds": function(seconds) {
        cy.wait(seconds * 1000)
    },

    "I pause": function() {
        cy.pause()
    },

    "I debug": function() {
        cy.debug()
    },

    /*
        Assertions
     */

    "I should be on {route}": function(route, table, { routes }) {
        let path = routes[route] || route

        const isRegexStringPath = typeof path === "string" && path.startsWith("/") && path.endsWith("/")
        if (isRegexStringPath) {
            path = new RegExp(path.slice(1, -1))
        }

        const comparator = path instanceof RegExp ? "match" : "eq"
        cy.location("pathname").should(comparator, path)
    },

    "I should not be on {route}": function(route, table, { routes }) {
        let path = routes[route] || route

        const isRegexStringPath = typeof path === "string" && path.startsWith("/") && path.endsWith("/")
        if (isRegexStringPath) {
            path = new RegExp(path.slice(1, -1))
        }

        const comparator = path instanceof RegExp ? "not.match" : "not.eq"
        cy.location("pathname").should(comparator, path)
    },

    "{element} should be visible": function(element) {
        cy.getElement(element).should("be.visible")
    },
    "within {element}, {element} should be visible": function(ancestorElement, element) {
        cy.getElementWithinAncestor(element, ancestorElement).should("be.visible")
    },

    "{element} should not be visible": function(element) {
        cy.getElement(element).should("not.be.visible")
    },
    "within {element}, {element} should not be visible": function(ancestorElement, element) {
        cy.getElementWithinAncestor(element, ancestorElement).should("not.be.visible")
    },

    "{element} should have {int} occurrences": function(element, count) {
        cy.getElement(element).should("have.length", count)
    },

    "{element} should have at least {int} occurrences": function(element, count) {
        cy.getElement(element).should("have.length.gte", count)
    },

    "{element} should have at most {int} occurrences": function(element, count) {
        cy.getElement(element).should("have.length.lte", count)
    },

    "{element} text should be {string}": function(element, value) {
        cy.getElement(element).should($element =>
            expect(
                $element
                    .text()
                    .trim()
                    .toLowerCase()
            ).to.eq(value.trim().toLowerCase())
        )
    },
    "within {element}, {element} text should be {string}": function(ancestorElement, element, value) {
        cy.getElementWithinAncestor(element, ancestorElement).should($element =>
            expect(
                $element
                    .text()
                    .trim()
                    .toLowerCase()
            ).to.eq(value.trim().toLowerCase())
        )
    },

    "{element} text should not be {string}": function(element, value) {
        cy.getElement(element).should($element =>
            expect(
                $element
                    .text()
                    .toLowerCase()
                    .trim()
            ).not.to.eq(value.trim().toLowerCase())
        )
    },
    "within {element}, {element} text should not be {string}": function(ancestorElement, element, value) {
        cy.getElementWithinAncestor(element, ancestorElement).should($element =>
            expect(
                $element
                    .text()
                    .toLowerCase()
                    .trim()
            ).not.to.eq(value.trim().toLowerCase())
        )
    },

    "elements text should be:": function(table, { steps }) {
        const rows = table.raw().slice(1) // First row is column headers

        for (const [element, value] of rows) {
            steps["{element} text should be {string}"](element, value)
        }
    },

    "elements text should not be:": function(table, { steps }) {
        const rows = table.raw().slice(1) // First row is column headers

        for (const [element, value] of rows) {
            steps["{element} text should not be {string}"](element, value)
        }
    },

    "{element} text should contain {string}": function(element, value) {
        cy.getElement(element).should($element =>
            expect($element.text().toLowerCase()).to.contain(value.trim().toLowerCase())
        )
    },

    "{element} text should not contain {string}": function(element, value) {
        cy.getElement(element).should($element =>
            expect($element.text().toLowerCase()).not.to.contain(value.toLowerCase())
        )
    },

    "elements text should contain:": function(table, { steps }) {
        const rows = table.raw().slice(1) // First row is column headers

        for (const [element, value] of rows) {
            steps["{element} text should contain {string}"](element, value)
        }
    },

    "elements text should not contain:": function(table, { steps }) {
        const rows = table.raw().slice(1) // First row is column headers

        for (const [element, value] of rows) {
            steps["{element} text should not contain {string}"](element, value)
        }
    },

    "{element} should be set to {string}": function(element, value) {
        cy.getInputElement(element).then($element => {
            if ($element.is(":checkbox") || $element.is(":radio")) {
                const name = $element.attr("name")
                const values = $element
                    .closest("form, :root")
                    .find(`[name="${name}"]`)
                    .filter(":checked")
                    .map(function() {
                        return this.value
                    })
                    .get()
                    .join(", ")

                expect(values).to.eq(value)
            } else if ($element.is("select")) {
                const values = [].concat($element.val()).join(", ")
                expect(values).to.eq(value)
            } else {
                expect($element.val()).to.eq(value)
            }
        })
    },
    "within {element}, {element} should be set to {string}": function(ancestorElement, element, value) {
        cy.getInputElementWithinAncestor(element, ancestorElement).then($element => {
            if ($element.is(":checkbox") || $element.is(":radio")) {
                const name = $element.attr("name")
                const values = $element
                    .closest("form, :root")
                    .find(`[name="${name}"]`)
                    .filter(":checked")
                    .map(function() {
                        return this.value
                    })
                    .get()
                    .join(", ")

                expect(values).to.eq(value)
            } else if ($element.is("select")) {
                const values = [].concat($element.val()).join(", ")
                expect(values).to.eq(value)
            } else {
                expect($element.val()).to.eq(value)
            }
        })
    },
}
