const Env = require('./environment.js');
const Util = require('./utils.js');
const UserPage = require('./pages/user.js');
const PeoplePage = require('./pages/people.js');
const AddProfilePage = require('./pages/node_add_profile.js');
const AdminContentPage = require('./pages/admin_content.js');
import { Selector } from 'testcafe';

fixture `UG Profile`
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

test('Test PP6', async t => {
	const name = Util.RandomName(4, 10);
	const lastname = Util.RandomName(4, 10);
	const email = Util.RandomEmail();
	const phone = Util.RandomPhone('519-824-4120 ext. #####');

	await t
		// Create node
		.navigateTo(Env.baseURL + AddProfilePage.URL)
		.typeText(AddProfilePage.auth.nameInput, name)
		.typeText(AddProfilePage.auth.lastNameInput, lastname)
		.typeText(AddProfilePage.auth.emailInput, email)
		.typeText(AddProfilePage.auth.phoneInput, phone)
		.click(AddProfilePage.auth.saveButton)

		// Setup people page with PP6
		.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
		.setNativeDialogHandler(() => true)
		.click(PeoplePage.auth.panelsCustomizeButton)
		.click(PeoplePage.auth.panelsAddToLeft)
		.click(PeoplePage.auth.viewPanesLink)
		.click(PeoplePage.auth.pp6Link)
		.click(PeoplePage.auth.largeImageCheck)
		.click(PeoplePage.auth.finishButton)
		.wait(500).click(PeoplePage.auth.panelsSaveButton)

		// Assertions, change config, etc.
		//.wait(10000)

		// Teardown panel
		.wait(500).click(PeoplePage.auth.panelsCustomizeButton)
		.setNativeDialogHandler(() => true)
		.click(PeoplePage.auth.pp6DeleteButton)
		.wait(500).click(PeoplePage.auth.panelsSaveButton)
});

test('Role filter is hidden if no profiles with role term exist', async t => {
	const name = Util.RandomName(4, 10);
	const lastname = Util.RandomName(4, 10);
	const email = Util.RandomEmail();
	const phone = Util.RandomPhone('519-824-4120 ext. #####');

	await t
		// Ensure filter does not exist
		.navigateTo(Env.baseURL + PeoplePage.URL);

	if(PeoplePage.common.viewFilters) {
		await t.expect(PeoplePage.common.viewFilters.innerHTML).notMatch(/[\s\S]*\"edit-field-profile-role-tid-wrapper\"[\s\S]*/g);
	}

	await t
		// Create profile with role to make filter appear
		.navigateTo(Env.baseURL + AddProfilePage.URL)
		.typeText(AddProfilePage.auth.nameInput, name)
		.typeText(AddProfilePage.auth.lastNameInput, lastname)
		.click(AddProfilePage.auth.adjunctFacultyRoleCheck)
		.typeText(AddProfilePage.auth.emailInput, email)
		.typeText(AddProfilePage.auth.phoneInput, phone)
		.click(AddProfilePage.auth.saveButton);

		const nid = await t.eval(function() {
			var edit = null;
			document.querySelectorAll('li a').forEach(function(el) {
				if(el.innerText == "Edit") edit = el;
			});
			var arr = /node\/(\d*)\//g.exec(edit.getAttribute('href'));
			return parseInt(arr[1]);
		});

	await t
		// Ensure filter exists
		.navigateTo(Env.baseURL + PeoplePage.URL)
		.expect(PeoplePage.common.roleFilter).ok()

		// Edit profile to remove role
		.navigateTo(Env.baseURL + '/node/' + nid + '/edit')
		.click(AddProfilePage.auth.adjunctFacultyRoleCheck)
		.click(AddProfilePage.auth.saveButton)

		// Ensure filter is gone again
		.navigateTo(Env.baseURL + PeoplePage.URL);

	if(PeoplePage.common.viewFilters.innerHTML) {
		await t.expect(PeoplePage.common.viewFilters.innerHTML).notMatch(/[\s\S]*\"edit-field-profile-role-tid-wrapper\"[\s\S]*/g);
	}
});