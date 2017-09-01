const Env = require('../../environment.js');
const Util = require('../../utils.js');
const Actions = require('../../actions.js');
const UserPage = require('../../pages/user.js');
const PeoplePage = require('../../pages/people.js');
const CustomizePage = require('../../pages/admin/structure/pages.js');
const Faker = require('faker');

import { Selector } from 'testcafe';

fixture `UG Profile PP6 List View`
	.page(Env.baseURL);

/**
* Selected fields show on Profiles PP6 listing view
*/

	test.before(async t => {
		await Actions.Login(await t, Env.creds.admin.username, Env.creds.admin.password);
		//UG Profile feature is enabled and configured
		t.ctx.randomNodes = await Actions.generateProfiles(await t, 4);
		//PP6 listing view is displayed
		await showPP6(t);
	})
	('Selected fields show on Profiles PP6 listing view', async t => {

		await t.navigateTo(Env.baseURL + PeoplePage.URL);

		let phoneLabel = "Phone:";
		let emailLabel = "Email:";
		let officeLabel = "Office:";

		let profileTitle = await PeoplePage.common.pp6.paneTitle.textContent;
		let profileTitleVisible = await PeoplePage.common.pp6.paneTitle.visible;
		let profileTeaser = await PeoplePage.common.pp6.paneTeaser.textContent;
		let profileTeaserVisible = await PeoplePage.common.pp6.paneTeaser.visible;
		let profilePhone = await PeoplePage.common.pp6.paneSummary.withText(phoneLabel).textContent;
		let profilePhoneVisible = await PeoplePage.common.pp6.paneSummary.withText(phoneLabel).visible;
		let profileEmail = await PeoplePage.common.pp6.paneSummary.withText(emailLabel).textContent;
		let profileEmailVisible = await PeoplePage.common.pp6.paneSummary.withText(emailLabel).visible;
		let profileOffice = await PeoplePage.common.pp6.paneSummary.withText(officeLabel).textContent;
		let profileOfficeVisible = await PeoplePage.common.pp6.paneSummary.withText(officeLabel).visible;

		// strip whitespace from labelled fields
		profilePhone = profilePhone.replace(/\s+/g,'');
		profileEmail = profileEmail.replace(/\s+/g,'');
		profileOffice = profileOffice.replace(/\s+/g,'');

		await t
		    // Node Title shows
			.expect(profileTitleVisible).ok('Node title does not show on PP6 listing view.')
		    .expect(profileTitle.length).gt(0,'Node title field has less than 0 characters on PP6 listing view.')
		    // Teaser summary shows
			.expect(profileTeaserVisible).ok('Teaser field does not show on PP6 listing view.')
			.expect(profileTeaser.length).gt(0,'Teaser field has less than 0 characters on PP6 listing view.')
		    // Phone shows
		    .expect(profilePhoneVisible).ok('Phone label does not show on PP6 listing view.')
		    .expect(profilePhone.length - phoneLabel.length).gt(0,'Phone field has less than 0 characters on PP6 listing view.')
		    // Email shows
		    .expect(profileEmailVisible).ok('Email label does not show on PP6 listing view.')
		    .expect(profileEmail.length - emailLabel.length).gt(0,'Email field has less than 0 characters on PP6 listing view.')
		    // Office shows
		    .expect(profileOfficeVisible).ok('Office label does not show on PP6 listing view.')
		    .expect(profileOffice.length - officeLabel.length).gt(0,'Office field has less than 0 characters on PP6 listing view.');

	})
	.after(async t => {
		await Actions.revertCustomPage(t,CustomizePage.auth.people.filteredByTag);
		await Actions.removeProfiles(await t, t.ctx.randomNodes);
	});

/**
* Shows PP6 view pane on baseURL and returns view pane DOM ID
* 
* @param   {object} t  Test controller
*/

async function showPP6(t){

	let buttonToEmptyLeftRegion = await Selector('#panels-ipe-regionid-left').find('.pane-delete');

	await t
		.navigateTo(Env.baseURL + PeoplePage.URL);

	await t
		// wait for Customize In-Place Editor button to show
		.eval(() => new Promise(resolve => setInterval(function() {
	        if(jQuery('#panels-ipe-customize-page').length > 0) resolve();
		}, 500)));


	await t
		.setNativeDialogHandler(() => true)
		// open In-Place Editor
		.click(PeoplePage.auth.panelsCustomizeButton);

	// Empty Left Region of view panes
	await Actions.repeatClick(t,buttonToEmptyLeftRegion);

	await t
		// open Left Region
		.click(PeoplePage.auth.panelsAddToLeft)
		.click(PeoplePage.auth.viewPanesLink);

	await t
		// wait for Select PP7 View Pane to show
		.eval(() => new Promise(resolve => setInterval(function() {
	        if(jQuery('a.add-content-link-pp6-panel-pane-1-icon-text-button').length > 0) resolve();
		}, 500)));


	await t
		// add PP6 View Pane
		.click(PeoplePage.auth.pp6.selectViewPane)
		.click(PeoplePage.auth.finishButton);

	await t
		// wait for Save button to show
		.eval(() => new Promise(resolve => setInterval(function() {
	        if(jQuery('#panels-ipe-save').length > 0) resolve();
		}, 500)));

	await t
		// save In-Place Editor
		.click(PeoplePage.auth.panelsSaveButton);
}

/**
* Open PP6 Settings dialog
* 
* @param   {object} t  Test controller
*/

async function editPP6(t){

	await t
		.navigateTo(Env.baseURL + "/front");

	await t
		// wait for Customize In-Place Editor button to show
		.eval(() => new Promise(resolve => setInterval(function() {
	        if(jQuery('#panels-ipe-customize-page').length > 0) resolve();
		}, 500)));

	await t
		.setNativeDialogHandler(() => true)
		// open In-Place Editor
		.click(PeoplePage.auth.panelsCustomizeButton)
		// open Edit cog
		.click(PeoplePage.auth.pp6.editButton);
}
