const Env = require('./environment.js');
const Util = require('./utils.js');
const UserPage = require('./pages/user.js');
const EventPage = require('./pages/events.js');
const AddEventPage = require('./pages/node_add_event.js');
const AdminContentPage = require('./pages/admin_content.js');
const GenerateTermsPage = require('./pages/admin_config_development_generate_taxonomy.js');
const AddEventCategoryTermPage = require('./pages/admin_structure_taxonomy_event_category_add.js');
const EditTermPage = require('./pages/taxonomy_term_edit.js');

import { Selector } from 'testcafe';

fixture `UG Event`
	.page(Env.baseURL + UserPage.URL)
	.beforeEach(async t => {
		await t
			// Authenticate
			.typeText(UserPage.anon.userInput, Env.creds.admin.username)
			.typeText(UserPage.anon.passInput, Env.creds.admin.password)
			.click(UserPage.anon.submitButton)
			// Ensure login successful
			.expect(UserPage.auth.pageHeader.innerText).eql(Env.creds.admin.username)
	})
	.afterEach(async t => {
		await t
			.navigateTo(Env.baseURL + AdminContentPage.URL)
			.click(AdminContentPage.auth.selectAllCheck)
			.click(AdminContentPage.auth.operationSelect)
			.click(AdminContentPage.auth.operationDeleteOption)
			.click(AdminContentPage.auth.updateButton)
			.click(AdminContentPage.auth.confirmDelete)
			.expect("Test").eql("Test");
	});

test('Test calendar text color', async t => {
	await t
		// Create node
		.navigateTo(Env.baseURL + AddEventPage.URL)
		.typeText(AddEventPage.auth.titleInput, 'Test Event')
		.click(AddEventPage.auth.allDayCheck)
		.click(AddEventPage.auth.saveButton)
		// Navigate to calendar page
		.navigateTo(Env.baseURL + EventPage.URL + '/month/grid')
		.expect(EventPage.common.pageHeader.innerText).eql('Monthly Calendar')
		.expect(EventPage.common.month.grid.allDayEvent.innerText).contains('Test Event')
		.expect(EventPage.common.month.grid.allDayEvent.getStyleProperty('color')).eql('rgb(0, 0, 0)');
});

test('Descriptive title appears in the correct place', async t => {
	var startDate = new Date();
	startDate.setDate(startDate.getDate() + 1);

	var endDate = new Date();
	endDate.setDate(endDate.getDate() + 2);

	const termName = Util.RandomName(4, 10);

	await t
		// Create term
		.navigateTo(Env.baseURL + AddEventCategoryTermPage.URL)
		.typeText(AddEventCategoryTermPage.auth.nameInput, termName)
		.click(AddEventCategoryTermPage.auth.saveButton)
		// Get TID
		.navigateTo(Env.baseURL + '/admin/structure/taxonomy/event_category')
		.click(await Selector('a').withText(termName));

	const tid = await t.eval(function() {
		var edit = null;
		document.querySelectorAll('li a').forEach(function(el) {
			if(el.innerText == "Edit") edit = el;
		});
		var arr = /term\/(\d*)\//g.exec(edit.getAttribute('href'));
		return parseInt(arr[1]);
	});

	await t
		// Create node
		.navigateTo(Env.baseURL + AddEventPage.URL)
		.typeText(AddEventPage.auth.titleInput, Util.RandomName(5, 12))
		.click(AddEventPage.auth.categorySelect)
		.click(AddEventPage.auth.categoryFirstOption)
		.selectText(AddEventPage.auth.startDateInput)
		.pressKey('backspace')
		.typeText(AddEventPage.auth.startDateInput, Util.FormatDate(startDate, 'M j Y'))
		.selectText(AddEventPage.auth.endDateInput)
		.pressKey('backspace')
		.typeText(AddEventPage.auth.endDateInput, Util.FormatDate(endDate, 'M j Y'))
		.click(AddEventPage.auth.saveButton)
		// Check page titles
		.navigateTo(Env.baseURL + EventPage.URL)
		.expect(EventPage.common.pageHeader.innerText).eql('Upcoming Events')
		.navigateTo(Env.baseURL + EventPage.URL + '/' + tid)
		.expect(EventPage.common.pageHeader.innerText).eql('Events related to ' + termName)
		// Cleanup term
		.navigateTo(Env.baseURL + EditTermPage.URL(tid)).wait(500)
		.click(EditTermPage.auth.deleteButton)
		.click(EditTermPage.auth.confirmDeleteButton);
});