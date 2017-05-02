const Env = require('./environment.js');
const Util = require('./utils.js');
const Actions = require('./actions.js');
const UserPage = require('./pages/user.js');
const PeoplePage = require('./pages/people.js');
const AddProfilePage = require('./pages/node/add/profile.js');
const AdminContentPage = require('./pages/admin/content.js');
import { Selector } from 'testcafe';

fixture `UG Profile`
	.beforeEach(async t => {
		await Actions.Login(await t, Env.creds.admin.username, Env.creds.admin.password);
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

test('Search by last name exists on PP1, PP1B, PP5', async t => {
	const firstName = Util.RandomName(4, 10);
	const lastName = Util.RandomName(4, 10);
	const fullName = firstName + ' ' + lastName;
	var n = ((lastName.lentgh) - 2);
	const partial = lastName.substring(0,n);

	await t

	// Create Profile to be searched for
	t.ctx.profile_nid = await Actions.CreateNode({
		type:"profile",
		name:{
			first:firstName,
			last:lastName
		},
	});

	await t

	// Check PP1
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.setNativeDialogHandler(() => true)
	.typeText(PeoplePage.auth.searchByLastNameBox, lastName)
	.click(PeoplePage.auth.ppSearchButton)
	.click(Selector('a').withText(fullName))
	.typeText(PeoplePage.auth.searchByLastNameBox, partial)
	.click(PeoplePage.auth.ppSearchButton)
	.click(Selector('a').withText(fullName))


	// Check PP6
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.setNativeDialogHandler(() => true)
	.click(PeoplePage.auth.panelsCustomizeButton)
	.click(PeoplePage.auth.pp1DeleteButton)
	.click(PeoplePage.auth.panelsAddToLeft)
	.click(PeoplePage.auth.viewPanesLink)
	.click(PeoplePage.auth.pp6Link)
	.click(PeoplePage.auth.largeImageCheck)
	.click(PeoplePage.auth.finishButton)
	.wait(500).click(PeoplePage.auth.panelsSaveButton)
	.typeText(PeoplePage.auth.searchByLastNameBox, lastName)
	.click(PeoplePage.auth.ppSearchButton)
	.click(Selector('a').withText(fullName))
	.typeText(PeoplePage.auth.searchByLastNameBox, partial)
	.click(PeoplePage.auth.ppSearchButton)
	.click(Selector('a').withText(fullName))

	// Check PP5
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.setNativeDialogHandler(() => true)
	.click(PeoplePage.auth.panelsCustomizeButton)
	.click(PeoplePage.auth.pp6DeleteButton)
	.click(PeoplePage.auth.panelsAddToLeft)
	.click(PeoplePage.auth.viewPanesLink)
	.click(PeoplePage.auth.pp5Link)
	.click(PeoplePage.auth.finishButton)
	.wait(500).click(PeoplePage.auth.panelsSaveButton)
	.typeText(PeoplePage.auth.searchByLastNameBox, lastName)
	.click(PeoplePage.auth.ppSearchButton)
	.click(Selector('a').withText(fullName))
	.typeText(PeoplePage.auth.searchByLastNameBox, partial)
	.click(PeoplePage.auth.ppSearchButton)
	.click(Selector('a').withText(fullName))

	// Check PP1B
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.setNativeDialogHandler(() => true)
	.click(PeoplePage.auth.panelsCustomizeButton)
	.click(PeoplePage.auth.pp5DeleteButton)
	.click(PeoplePage.auth.panelsAddToLeft)
	.click(PeoplePage.auth.viewPanesLink)
	.click(PeoplePage.auth.pp1BLink)
	.click(PeoplePage.auth.finishButton)
	.wait(500).click(PeoplePage.auth.panelsSaveButton)
	.typeText(PeoplePage.auth.searchByLastNameBox, lastName)
	.click(PeoplePage.auth.ppSearchButton)
	.click(Selector('a').withText(fullName))
	.typeText(PeoplePage.auth.searchByLastNameBox, partial)
	.click(PeoplePage.auth.ppSearchButton)
	.click(Selector('a').withText(fullName))

	// Check PP1 No Pictures
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.setNativeDialogHandler(() => true)
	.click(PeoplePage.auth.panelsCustomizeButton)
	.click(PeoplePage.auth.pp1BDeleteButton)
	.click(PeoplePage.auth.panelsAddToLeft)
	.click(PeoplePage.auth.viewPanesLink)
	.click(PeoplePage.auth.pp1NoPicturesLink)
	.click(PeoplePage.auth.finishButton)
	.wait(500).click(PeoplePage.auth.panelsSaveButton)
	.typeText(PeoplePage.auth.searchByLastNameBox, lastName)
	.click(PeoplePage.auth.ppSearchButton)
	.click(Selector('a').withText(fullName))
	.typeText(PeoplePage.auth.searchByLastNameBox, partial)
	.click(PeoplePage.auth.ppSearchButton)
	.click(Selector('a').withText(fullName))

	// Check PP5 No Pictures
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.setNativeDialogHandler(() => true)
	.click(PeoplePage.auth.panelsCustomizeButton)
	.click(PeoplePage.auth.pp1NoPicturesDeleteButton)
	.click(PeoplePage.auth.panelsAddToLeft)
	.click(PeoplePage.auth.viewPanesLink)
	.click(PeoplePage.auth.pp5NoPicturesLink)
	.click(PeoplePage.auth.finishButton)
	.wait(500).click(PeoplePage.auth.panelsSaveButton)
	.typeText(PeoplePage.auth.searchByLastNameBox, lastName)
	.click(PeoplePage.auth.ppSearchButton)
	.click(Selector('a').withText(fullName))
	.typeText(PeoplePage.auth.searchByLastNameBox, partial)
	.click(PeoplePage.auth.ppSearchButton)
	.click(Selector('a').withText(fullName))

	// Put PP1 Back
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.setNativeDialogHandler(() => true)
	.click(PeoplePage.auth.panelsCustomizeButton)
	.click(PeoplePage.auth.pp5NoPicturesDeleteButton)
	.click(PeoplePage.auth.panelsAddToLeft)
	.click(PeoplePage.auth.viewPanesLink)
	.click(PeoplePage.auth.pp1Link)
	.click(PeoplePage.auth.finishButton)
	.wait(500).click(PeoplePage.auth.panelsSaveButton)
});
