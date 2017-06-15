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

test
.before(beforeSearch)('Search by last name exists on PP1', async t => {
	t.ctx.testID = 1;

	await t
	// Check PP1
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.setNativeDialogHandler(() => true)
	.typeText(PeoplePage.common.searchByLastNameBox, t.ctx.lastName)
	.click(PeoplePage.common.ppSearchButton)
	.expect(PeoplePage.common.listingArea.textContent).contains(t.ctx.fullName)
	.expect(PeoplePage.common.listingArea.textContent).notContains(t.ctx.fullName2)
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.typeText(PeoplePage.common.searchByLastNameBox, t.ctx.partial)
	.click(PeoplePage.common.ppSearchButton)
	.expect(PeoplePage.common.listingArea.textContent).contains(t.ctx.fullName)
	.expect(PeoplePage.common.listingArea.textContent).notContains(t.ctx.fullName2)
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.typeText(PeoplePage.common.searchByLastNameBox, t.ctx.noResults)
	.click(PeoplePage.common.ppSearchButton)
	.expect(PeoplePage.common.noResults.textContent).contains("No results found.")
})
.after(async t => {
	await t
	await Actions.DeleteNode(t.ctx.profile_nid)
	await Actions.DeleteNode(t.ctx.profile_nid2)
});

test
.before(beforeSearch)('Search by last name exists on PP6', async t => {
	t.ctx.testID = 2;

	await t
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
	.navigateTo(Env.baseURL)
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.typeText(PeoplePage.common.searchByLastNameBox, t.ctx.lastName)
	.click(PeoplePage.common.ppSearchButton)
	.expect(PeoplePage.common.listingArea.textContent).contains(t.ctx.fullName)
	.expect(PeoplePage.common.listingArea.textContent).notContains(t.ctx.fullName2)
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.typeText(PeoplePage.common.searchByLastNameBox, t.ctx.partial)
	.click(PeoplePage.common.ppSearchButton)
	.expect(PeoplePage.common.listingArea.textContent).contains(t.ctx.fullName)
	.expect(PeoplePage.common.listingArea.textContent).notContains(t.ctx.fullName2)
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.typeText(PeoplePage.common.searchByLastNameBox, t.ctx.noResults)
	.click(PeoplePage.common.ppSearchButton)
	.expect(PeoplePage.common.noResults.textContent).contains("No results found.")

})
.after(afterSearch);

test
.before(beforeSearch)('Search by last name exists on PP5', async t => {
	t.ctx.testID = 3;

	await t
	// Check PP5
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.setNativeDialogHandler(() => true)
	.click(PeoplePage.auth.panelsCustomizeButton)
	.click(PeoplePage.auth.pp1DeleteButton)
	.click(PeoplePage.auth.panelsAddToLeft)
	.click(PeoplePage.auth.viewPanesLink)
	.click(PeoplePage.auth.pp5Link)
	.click(PeoplePage.auth.finishButton)
	.wait(500).click(PeoplePage.auth.panelsSaveButton)
	.navigateTo(Env.baseURL)
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.typeText(PeoplePage.common.searchByLastNameBoxPP5, t.ctx.lastName)
	.click(PeoplePage.common.ppSearchButton)
	.expect(PeoplePage.common.listingArea.textContent).contains(t.ctx.fullName)
	.expect(PeoplePage.common.listingArea.textContent).notContains(t.ctx.fullName2)
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.typeText(PeoplePage.common.searchByLastNameBoxPP5, t.ctx.partial)
	.click(PeoplePage.common.ppSearchButton)
	.expect(PeoplePage.common.listingArea.textContent).contains(t.ctx.fullName)
	.expect(PeoplePage.common.listingArea.textContent).notContains(t.ctx.fullName2)
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.typeText(PeoplePage.common.searchByLastNameBoxPP5, t.ctx.noResults)
	.click(PeoplePage.common.ppSearchButton)
	.expect(PeoplePage.common.noResults.textContent).contains("No results found.")

})
.after(afterSearch);

test
.before(beforeSearch)('Search by last name exists on PP1B', async t => {
	t.ctx.testID = 4;

	await t
	// Check PP1B
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.setNativeDialogHandler(() => true)
	.click(PeoplePage.auth.panelsCustomizeButton)
	.click(PeoplePage.auth.pp1DeleteButton)
	.click(PeoplePage.auth.panelsAddToLeft)
	.click(PeoplePage.auth.viewPanesLink)
	.click(PeoplePage.auth.pp1BLink)
	.click(PeoplePage.auth.finishButton)
	.wait(500).click(PeoplePage.auth.panelsSaveButton)
	.navigateTo(Env.baseURL)
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.typeText(PeoplePage.common.searchByLastNameBox, t.ctx.lastName)
	.click(PeoplePage.common.ppSearchButton)
	.expect(PeoplePage.common.listingArea.textContent).contains(t.ctx.fullName)
	.expect(PeoplePage.common.listingArea.textContent).notContains(t.ctx.fullName2)
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.typeText(PeoplePage.common.searchByLastNameBox, t.ctx.partial)
	.click(PeoplePage.common.ppSearchButton)
	.expect(PeoplePage.common.listingArea.textContent).contains(t.ctx.fullName)
	.expect(PeoplePage.common.listingArea.textContent).notContains(t.ctx.fullName2)
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.typeText(PeoplePage.common.searchByLastNameBox, t.ctx.noResults)
	.click(PeoplePage.common.ppSearchButton)
	.expect(PeoplePage.common.noResults.textContent).contains("No results found.")

})
.after(afterSearch);

test
.before(beforeSearch)('Search by last name exists on PP1 No pictures', async t => {
	t.ctx.testID = 5;

	await t
	// Check PP1 No Pictures
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.setNativeDialogHandler(() => true)
	.click(PeoplePage.auth.panelsCustomizeButton)
	.click(PeoplePage.auth.pp1DeleteButton)
	.click(PeoplePage.auth.panelsAddToLeft)
	.click(PeoplePage.auth.viewPanesLink)
	.click(PeoplePage.auth.pp1NoPicturesLink)
	.click(PeoplePage.auth.finishButton)
	.wait(500).click(PeoplePage.auth.panelsSaveButton)
	.navigateTo(Env.baseURL)
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.typeText(PeoplePage.common.searchByLastNameBox, t.ctx.lastName)
	.click(PeoplePage.common.ppSearchButton)
	.expect(PeoplePage.common.listingArea.textContent).contains(t.ctx.fullName)
	.expect(PeoplePage.common.listingArea.textContent).notContains(t.ctx.fullName2)
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.typeText(PeoplePage.common.searchByLastNameBox, t.ctx.partial)
	.click(PeoplePage.common.ppSearchButton)
	.expect(PeoplePage.common.listingArea.textContent).contains(t.ctx.fullName)
	.expect(PeoplePage.common.listingArea.textContent).notContains(t.ctx.fullName2)
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.typeText(PeoplePage.common.searchByLastNameBox, t.ctx.noResults)
	.click(PeoplePage.common.ppSearchButton)
	.expect(PeoplePage.common.noResults.textContent).contains("No results found.")

})
.after(afterSearch);


test
.before(beforeSearch)('Search by last name exists on PP5 No Pictures', async t => {
	t.ctx.testID = 6;

	await t
	// Check PP5 No Pictures
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.setNativeDialogHandler(() => true)
	.click(PeoplePage.auth.panelsCustomizeButton)
	.click(PeoplePage.auth.pp1DeleteButton)
	.click(PeoplePage.auth.panelsAddToLeft)
	.click(PeoplePage.auth.viewPanesLink)
	.click(PeoplePage.auth.pp5NoPicturesLink)
	.click(PeoplePage.auth.finishButton)
	.wait(500).click(PeoplePage.auth.panelsSaveButton)
	.navigateTo(Env.baseURL)
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.typeText(PeoplePage.common.searchByLastNameBoxPP5, t.ctx.lastName)
	.click(PeoplePage.common.ppSearchButton)
	.expect(PeoplePage.common.listingArea.textContent).contains(t.ctx.fullName)
	.expect(PeoplePage.common.listingArea.textContent).notContains(t.ctx.fullName2)
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.typeText(PeoplePage.common.searchByLastNameBoxPP5, t.ctx.partial)
	.click(PeoplePage.common.ppSearchButton)
	.expect(PeoplePage.common.listingArea.textContent).contains(t.ctx.fullName)
	.expect(PeoplePage.common.listingArea.textContent).notContains(t.ctx.fullName2)
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.typeText(PeoplePage.common.searchByLastNameBoxPP5, t.ctx.noResults)
	.click(PeoplePage.common.ppSearchButton)
	.expect(PeoplePage.common.noResults.textContent).contains("No results found.")

})
.after(afterSearch);

test
.before(async t => {
	//Create 3 profiles as follows
	//Roy Halladay
	//Jose Bautista
	//Josh Donaldson
	//In that order
	await t
	t.ctx.profile_nid = await Actions.CreateNode("Profile",{
		name:{
			first:"Roy",
			last:"Halladay"
		},
	});
	t.ctx.profile_nid2 = await Actions.CreateNode("Profile"{
		name:{
			first:"Jose",
			last:"Bautista"
		},
	});
	t.ctx.profile_nid3 = await Actions.CreateNode("Profile"{
		name:{
			first:"Josh",
			last:"Donaldson"
		},
	});
	t.ctx.page = await Actions.CreateNode({
		type:"page"
	});
	await Actions.Login(await t, Env.creds.admin.username, Env.creds.admin.password);


})
('View PP6 sorts profiles by last name ascending', async t => {
	//Go to /people
	//Change view to PP6
	//Check that names appear in last name alphabetical order
	await t
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
	.expect(PeoplePage.common.resultOne.textContent).contains("Jose Bautista")
	.expect(PeoplePage.common.resultTwo.textContent).contains("Josh Donaldson")
	.expect(PeoplePage.common.resultThree.textContent).contains("Roy Halladay")
}).after(async t => {
	await t
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.setNativeDialogHandler(() => true)
	.click(PeoplePage.auth.panelsCustomizeButton)
	.click(PeoplePage.auth.pp6DeleteButton)
	.click(PeoplePage.auth.panelsAddToLeft)
	.click(PeoplePage.auth.viewPanesLink)
	.click(PeoplePage.auth.pp1Link)
	.click(PeoplePage.auth.finishButton)
	.wait(500).click(PeoplePage.auth.panelsSaveButton)
	await Actions.DeleteNode(t.ctx.profile_nid)
	await Actions.DeleteNode(t.ctx.profile_nid2)
	await Actions.DeleteNode(t.ctx.profile_nid3)
});


async function beforeSearch(t) {
	await Actions.Login(await t, Env.creds.admin.username, Env.creds.admin.password);
	//Create Names for dummy profiles
	t.ctx.firstName = Util.RandomName(4, 10);
	t.ctx.lastName = Util.RandomName(4, 10);
	t.ctx.firstName2 = Util.RandomName(4, 10);
	t.ctx.lastName2 = Util.RandomName(4, 10);
	//Ensure last names could not be found with same search term
	while(t.ctx.lastName.indexOf(t.ctx.lastName2) != -1) {
		t.ctx.lastName2 = Util.RandomName(4,10)
	}

	t.ctx.fullName = t.ctx.firstName + ' ' + t.ctx.lastName;
	t.ctx.fullName2 = t.ctx.firstName2 + ' ' + t.ctx.lastName2;
	t.ctx.noResults = Util.RandomString(12);
	var n = Util.RandomInt(1,t.ctx.lastName.length);
	t.ctx.partial = t.ctx.lastName.substring(0,n);

	// Create Profile to be searched for
	t.ctx.profile_nid = await Actions.CreateNode({
		type:"profile",
		name:{
			first:t.ctx.firstName,
			last:t.ctx.lastName
		},
	});
	// Create Profile to not be searched for
	t.ctx.profile_nid2 = await Actions.CreateNode({
		type:"profile",
		name:{
			first:t.ctx.firstName2,
			last:t.ctx.lastName2
		},
	});
}

async function afterSearch(t){
	await t
	// Put PP1 Back
	.navigateTo(Env.baseURL + PeoplePage.URL).wait(500)
	.setNativeDialogHandler(() => true)
	.click(PeoplePage.auth.panelsCustomizeButton)
	switch (t.ctx.testID){
		case 1:
			break;
		case 2:
			await t
			.click(PeoplePage.auth.pp6DeleteButton)
			break;
		case 3:
			await t
			.click(PeoplePage.auth.pp5DeleteButton)
			break;
		case 4:
			await t
			.click(PeoplePage.auth.pp1BDeleteButton)
			break;
		case 5:
			await t
			.click(PeoplePage.auth.pp1NoPicturesDeleteButton)
			break;
		case 6:
			await t
			.click(PeoplePage.auth.pp5NoPicturesDeleteButton)
			break;
	}
	await t
	.click(PeoplePage.auth.panelsAddToLeft)
	.click(PeoplePage.auth.viewPanesLink)
	.click(PeoplePage.auth.pp1Link)
	.click(PeoplePage.auth.finishButton)
	.wait(500).click(PeoplePage.auth.panelsSaveButton)
	await Actions.DeleteNode(t.ctx.profile_nid)
	await Actions.DeleteNode(t.ctx.profile_nid2)
}
