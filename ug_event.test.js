const Env = require('./environment.js');
const UserPage = require('./pages/user.js');
const EventPage = require('./pages/events.js');
const AddEventPage = require('./pages/node_add_event.js');

fixture `UG Event`
	.page(Env.baseURL + UserPage.URL);

test('Test calendar text color', async t => {
	await t
		// Authenticate
		.typeText(UserPage.anon.userInput, Env.creds.admin.username)
		.typeText(UserPage.anon.passInput, Env.creds.admin.password)
		.click(UserPage.anon.submitButton)
		// Ensure login successful
		.expect(UserPage.auth.pageHeader.innerText).eql(Env.creds.admin.username)
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