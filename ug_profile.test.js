const Env = require('./environment.js');
const Util = require('./utils.js');
const UserPage = require('./pages/user.js');
const PeoplePage = require('./pages/people.js');
const AddProfilePage = require('./pages/node_add_profile.js');
import AdminContent from './pages/admin_content.js';
import { Selector } from 'testcafe';

fixture `UG Profile`
	.page(Env.baseURL + UserPage.URL);

test('Test PP6', async t => {
	const name = Util.RandomString(8);
	const lastname = Util.RandomString(8);
	const email = Util.RandomEmail();
	const phone = '519-824-4120';

	await t
		// Authenticate
		.typeText(UserPage.anon.userInput, Env.creds.admin.username)
		.typeText(UserPage.anon.passInput, Env.creds.admin.password)
		.click(UserPage.anon.submitButton)
		// Ensure login successful
		.expect(UserPage.auth.pageHeader.innerText).eql(Env.creds.admin.username)
		// Create node
		.navigateTo(Env.baseURL + AddProfilePage.URL)
		.typeText(AddProfilePage.auth.nameInput, name)
		.typeText(AddProfilePage.auth.lastNameInput, lastname)
		.typeText(AddProfilePage.auth.emailInput, email)
		.typeText(AddProfilePage.auth.phoneInput, phone)
		.click(AddProfilePage.auth.saveButton)
		// Setup people page with PP6
		.navigateTo(Env.baseURL + PeoplePage.URL)
		.setNativeDialogHandler(() => true)
		.click(PeoplePage.auth.panelsCustomizeButton)
		.click(PeoplePage.auth.panelsAddToLeft)
		.click(PeoplePage.auth.viewPanesLink)
		.click(PeoplePage.auth.pp6Link)
		.click(PeoplePage.auth.largeImageCheck)
		.click(PeoplePage.auth.finishButton)
		.wait(500).click(PeoplePage.auth.panelsSaveButton)

		// Assertions, change config, etc.
		.wait(10000)

		// Teardown panel
		.wait(500).click(PeoplePage.auth.panelsCustomizeButton)
		.setNativeDialogHandler(() => true)
		.click(PeoplePage.auth.pp6DeleteButton)
		.wait(500).click(PeoplePage.auth.panelsSaveButton)

		// Cleanup Test Profiles
		.navigateTo(Env.baseURL + AdminContent.URL)
		.click(await Selector('label').withText('Update ' + name + ' ' + lastname).nextSibling())
		.click(AdminContent.auth.operationSelect)
		.click(AdminContent.auth.operationDeleteOption)
		.click(AdminContent.auth.updateButton)
		.click(AdminContent.auth.confirmDelete);
});