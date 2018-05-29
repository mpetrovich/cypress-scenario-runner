const faker = require('faker');

function configure() {
	const elAttrName = Cypress.config('elementAttributeName') || 'test-el';
	const valAttrName = Cypress.config('valueAttributeName') || 'test-val';

	Cypress.Commands.add('getElem', function(name) {
		return cy.get(`[${elAttrName}="${name}"]`);
	});

	Cypress.Commands.add('getInput', function(name) {
		return cy.get(`[${elAttrName}="${name}"]:input, [${elAttrName}="${name}"] :input`);
	});

	Cypress.Commands.add('input', { prevSubject: 'element' }, function($input, value) {
		let randomRegex = /<random ([^>]+)>/g;

		if (randomRegex.test(value)) {
			value = value.replace(randomRegex, (match, type) => getRandomValue(type));
		}

		if ($input.is(':checkbox') || $input.is(':radio')) {
			if (value === 'checked') {
				cy.wrap($input).check({ force: true });  // { force: true } to support custom checkboxes/radios
			}
			else if (value === 'unchecked') {
				cy.wrap($input).uncheck({ force: true });
			}
			else {
				// Multi-value checkboxes
				let values = value.split(',').map(s => s.trim());
				for (let value of values) {
					cy.wrap($input).filter(`[${valAttrName}="${value}"]`).first().check({ force: true });
				}
			}
		}
		else if ($input.is('select')) {
			value = $input.find('option').filter(function() { return this.innerText === value; }).val();  // value is the display text, not the actual value attribute
			cy.wrap($input).select(value);
		}
		else if ($input.is('[type="file"]')) {
			let filename = value;
			let inputName = $input.attr('name');
			let files = {
				[inputName]: new File(['sample data'], filename, { type: 'text/plain' })
			};
			cy.wrap($input).upload(filename);
		}
		else {
			cy.wrap($input).type(value);
		}
	});

	Cypress.Commands.add('upload', { prevSubject: 'element' }, function($input, filename) {
		// source: https://github.com/cypress-io/cypress/issues/170#issuecomment-384252209
		cy.fixture(filename, 'base64').then(content => {
			const elem = $input[0];
			const blob = b64toBlob(content);
			const testFile = new File([blob], filename);
			const dataTransfer = new DataTransfer();

			dataTransfer.items.add(testFile);
			elem.files = dataTransfer.files;
		});
	});
}

function b64toBlob(b64Data, contentType, sliceSize) {
	contentType = contentType || '';
	sliceSize = sliceSize || 512;

	var byteCharacters = atob(b64Data);
	var byteArrays = [];

	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		let slice = byteCharacters.slice(offset, offset + sliceSize);

		let byteNumbers = new Array(slice.length);
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		let byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}

	let blob = new Blob(byteArrays, { type: contentType });
	blob.lastModifiedDate = new Date();
	return blob;
}

function getRandomValue(type) {
	var value;

	if (type === 'first name') {
		value = faker.name.firstName();
	}
	else if (type === 'last name') {
		value = faker.name.lastName();
	}
	else if (type === 'full name') {
		value = faker.name.findName();
	}
	else if (type === 'phone') {
		value = faker.phone.phoneNumberFormat();
	}
	else if (type === 'email') {
		value = faker.internet.email();
	}
	else if (type === 'street address') {
		value = faker.address.streetAddress();
	}
	else if (type === 'city') {
		value = faker.address.city();
	}
	else if (type === 'state') {
		value = faker.address.state();
	}
	else if (type === 'zip') {
		value = faker.address.zipCode('#####');
	}
	else if (type === 'number') {
		value = faker.random.number();
	}
	else if (type === 'dollar value') {
		value = faker.finance.amount();
	}
	else {
		value = faker.random.word();
	}

	return value;
}

module.exports = {
	configure
};
