const Env = require('./environment.js');
const Util = require('./utils.js');
const Actions = require('./actions.js');
const UserPage = require('./pages/user.js');
import { Selector } from 'testcafe';

fixture `UG Filter`
	.page(Env.baseURL);

test
	.before(async t => {
		// Create Page
		t.ctx.page_nid = await Actions.CreateNode('page', {
			body:{
				value:'<img src="http://placehold.it/350x150" alt="" id="testcafeimage" />',
				format:'full_html'
			}
		});
	})('Image with no classes receives img-responsive', async t => {
		await t
			// Navigate to test node
			.navigateTo(Env.baseURL + '/node/' + t.ctx.page_nid)
			// Check the image tag has the img-responsive class
			.expect(Selector('#testcafeimage').hasClass('img-responsive')).ok();
	})
	.after(async t => {
		// Delete test node
		Actions.DeleteNode(t.ctx.page_nid);
	});

test
	.before(async t => {
		// Start img tag, prepare it to have classes appended
		let value = '<img src="http://placehold.it/350x150" alt="" id="testcafeimage" class="';

		// Init empty array for classes that are about to be generated
		t.ctx.classes = [];
		for(var i = 0; i < Util.RandomInt(1, 5); i++) {
			// Generate random class name
			let name = Util.RandomName(4, 10);

			// Store classes for reference in test
			t.ctx.classes.push(name);

			// Add class names to class attribute in the html content
			value += name + ' ';
		}
		// Remove trailing whitespace and close img tag
		value = value.trim() + '" />';

		t.ctx.page_nid = await Actions.CreateNode('page', {
			body:{
				value:value,
				format:'full_html'
			}
		});
	})('Image with pre-existing classes receives img-responsive and maintains own classes', async t => {
		await t
			// Navigate to test node
			.navigateTo(Env.baseURL + '/node/' + t.ctx.page_nid)
			// Check the image tag has the img-responsive class
			.expect(Selector('#testcafeimage').hasClass('img-responsive')).ok();

		for(var i = 0; i < t.ctx.classes.length; i++) {
			// Test each class added early to ensure the filter replaced them properly
			await t.expect(Selector('#testcafeimage').hasClass(t.ctx.classes[i])).ok();
		}
	})
	.after(async t => {
		// Delete test node
		Actions.DeleteNode(t.ctx.page_nid);
	});