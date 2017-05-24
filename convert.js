const fs = require('fs');
const path = require('path');

var file = process.argv[2];
var filename = path.basename(file, '.feature');

fs.readFile(file, 'utf8', function(err, data) {
	if(err) throw err;

	let contents = `const Env = require('./environment.js');
const Util = require('./utils.js');
const Actions = require('./actions.js');

fixture \`` + filename + `\`;
`;

	let scenarios = data.match(/^\s*Scenario:(?:.|\s)*?\n\n/gm);
	scenarios.forEach(function(el, i) {
		let scenario = {
			name:'',
			given:[],
			when:[],
			then:[]
		}

		let parts = el.split('\n');
		parts = parts.filter(function(el) {
			return el;
		});

		let last = '';
		parts.forEach(function(el, i) {
			el = el.trim();
			let exp = /^(\w*):*\s(.*)/g;
			let match = exp.exec(el);
			let keyword = match[1];
			let content = match[2];

			switch(keyword) {
				case 'Scenario':
					scenario.name = content.trim();
					break;
				case 'Given':
					scenario.given.push(content.trim());
					break;
				case 'When':
					scenario.when.push(content.trim());
					break;
				case 'Then':
					scenario.then.push(content.trim());
					break;
				case 'And':
					switch(last) {
						case 'Given':
							scenario.given.push(content.trim());
							break;
						case 'When':
							scenario.when.push(content.trim());
							break;
						case 'Then':
							scenario.then.push(content.trim());
							break;
					}
					break;
			};
			last = keyword;
		});

		contents += `
test
	.before(async t => {`;

		scenario.given.forEach(function(el) {
			contents += `
		// ` + el;
		});

		contents += `
	})('` + scenario.name + `', async t => {`;

		scenario.when.forEach(function(el) {
			contents += `
		// ` + el;
		});
		scenario.then.forEach(function(el) {
			contents += `
		// ` + el;
		});

		contents += `
	})
	.after(async t => {

	});
`;
	});

	fs.writeFile('./' + filename + '.test.js', contents, function(err) {
		if(err) throw err;
		console.log('Testfile for ' + path.basename(file) + ' successfully written.');
	});
});