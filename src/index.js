const { given } = require("cypress-cucumber-preprocessor/steps")

const defaultOptions = {
    elementAttr: "test-element",
    elementValueAttr: "test-value",
    elementOptionsAttr: "test-options",
    elementOptions: {
        force: false,
    },
    defaultCommandWait: 0,
}

function addSteps({ steps: customSteps = {}, routes = {} } = {}) {
    const customOptions = {
        elementAttr: Cypress.config("elementAttr"),
        elementValueAttr: Cypress.config("elementValueAttr"),
        elementOptionsAttr: Cypress.config("elementOptionsAttr"),
        elementOptions: JSON.parse(Cypress.config("elementOptions") || "{}"),
        defaultCommandWait: Cypress.config("defaultCommandWait"),
    }
    const options = Object.assign({}, defaultOptions, customOptions)

    const defaultSteps = require("./steps")
    const steps = Object.assign({}, defaultSteps, customSteps)
    const normalizeStep = step => step.replace(/\{(route|element)\}/g, "{string}")

    for (const [step, fn] of Object.entries(steps)) {
        given(normalizeStep(step), function() {
            if (options.defaultCommandWait) {
                cy.wait(options.defaultCommandWait)
            }
            return fn.call(this, ...arguments, { steps, routes, options })
        })
    }
}

function addCommands() {
    const customOptions = {
        elementAttr: Cypress.config("elementAttr"),
        elementValueAttr: Cypress.config("elementValueAttr"),
        elementOptionsAttr: Cypress.config("elementOptionsAttr"),
        elementOptions: JSON.parse(Cypress.config("elementOptions") || "{}"),
        defaultCommandWait: Cypress.config("defaultCommandWait"),
    }
    const options = Object.assign({}, defaultOptions, customOptions)

    Cypress.Commands.add("getElement", element => getElement(element, options))
    Cypress.Commands.add("getInputElement", element => getInputElement(element, options))
    Cypress.Commands.add("setInputElement", (element, value) => setInputElement(element, value, options))
}

function getElement(element, options) {
    return cy.get(`[${options.elementAttr}="${element}"]`)
}

function getInputElement(element, options) {
    return cy.get(`[${options.elementAttr}="${element}"]:input, [${options.elementAttr}="${element}"] :input`)
}

function setInputElement(element, value, options) {
    cy.getInputElement(element).then($element => {
        const elementOptions = getElementOptions($element, options)

        if ($element.is(":checkbox") || $element.is(":radio")) {
            if (value === "checked") {
                // Explicitly checks a checkbox/radio
                cy.wrap($element).check(elementOptions)
            } else if (value === "unchecked") {
                // Explicitly unchecks a checkbox/radio
                cy.wrap($element).uncheck(elementOptions)
            } else {
                // Checks a checkbox/radio by value
                const selectors = value
                    .split(",")
                    .map(val => val.trim())
                    .map(val => `[${options.elementValueAttr}="${val}"], [value="${val}"]`)

                cy.wrap($element)
                    .filter(selectors.join(", "))
                    .check(elementOptions)
            }
        } else if ($element.is("select")) {
            // Selects an option by value or text content
            const values = value.split(",").map(s => s.trim())
            cy.wrap($element).select(values, elementOptions)
        } else {
            // Replaces the value for all other input types
            cy.wrap($element)
                .clear(elementOptions)
                .type(value, elementOptions)
        }
    })
}

function getElementOptions($element, options) {
    var opts
    return Object.assign(
        {},
        options.elementOptions,
        $element.attr(options.elementOptionsAttr) ? eval(`opts = ${$element.attr(options.elementOptionsAttr)}`) : {}
    )
}

module.exports = { addSteps, addCommands, getElementOptions }
