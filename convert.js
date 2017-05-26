const fs = require('fs');
const path = require('path');
const yesno = require('yesno');

var file = process.argv[2];
var filename = path.basename(file, '.feature');

fs.readFile(file, 'utf8', function(err, data) {
	if(err) throw err;

	console.log(filename);

	let contents = `const Env = require('./environment.js');
const Util = require('./utils.js');
const Actions = require('./actions.js');

fixture \`` + filename + `\`;
`;

	let scenarios = data.split('\n\n');
	scenarios = scenarios.filter(function(el) {
		return el.indexOf('Scenario:') != -1;
	});
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

	var dest = './' + filename + '.test.js';
	fs.exists(dest, function(exists) {
		if(exists) {
			console.log('File \'' + dest + '\' already exists and will be overwritten.');
			yesno.ask('Are you sure you want to continue?', true, function(ok) {
				if(ok) {
					fs.writeFile(dest, contents, function(err) {
						if(err) throw err;
						console.log('\x1b[32m', 'Testfile for ' + path.basename(file) + ' successfully written.');
						process.exit();
					});
				} else {
					console.log('Feature conversion aborted.');
					process.exit();
				}
			});
		} else {
			fs.writeFile(dest, contents, function(err) {
				if(err) throw err;
				console.log('\x1b[32m', 'Testfile for ' + path.basename(file) + ' successfully written.');
			});
		}
	});
});