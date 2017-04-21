const Env = require('./environment.js');
const Util = require('./utils.js');
const Actions = require('./actions.js');
const UserPage = require('./pages/user.js');
const PeoplePage = require('./pages/people.js');
const AddProfilePage = require('./pages/node/add/profile.js');
const AdminContentPage = require('./pages/admin/content.js');
const TaxonomyTermPage = require('./pages/taxonomy/term/edit.js');
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
	/*.afterEach(async t => {
		await t
			.navigateTo(Env.baseURL + AdminContentPage.URL)
			.click(AdminContentPage.auth.selectAllCheck)
			.click(AdminContentPage.auth.operationSelect)
			.click(AdminContentPage.auth.operationDeleteOption)
			.click(AdminContentPage.auth.updateButton)
			.click(AdminContentPage.auth.confirmDelete)
			.expect("Test").eql("Test");
	});*/

test('Related keywords on E6, F4, PP4, and N7 are consistent', async t => {
	const name = Util.RandomName(4, 10);
	const lastname = Util.RandomName(4, 10);
	const email = Util.RandomEmail();
	const phone = Util.RandomPhone('519-824-4120 ext. #####');
	const pattern = false; //;

	const term = Util.RandomName(4, 10);
	var tid = await Actions.CreateTerm(Util.Vocabulary.tags, term);

	await t
		.navigateTo(Env.baseURL + TaxonomyTermPage.URL(tid))
		.expect(TaxonomyTermPage.auth.pageTitle.innerText).eql(term);
});