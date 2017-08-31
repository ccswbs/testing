const Env = require('../../environment.js');
const Util = require('../../utils.js');
const Actions = require('../../actions.js');
const UserPage = require('../../pages/user.js');
const PeoplePage = require('../../pages/people.js');
const CustomizePage = require('../../pages/admin/structure/pages.js');
const Faker = require('faker');

import { Selector } from 'testcafe';

fixture `UG Profile PP7 Teaser List View`
	.page(Env.baseURL);


/**
* Profiles are shown randomly on Profiles PP7 teaser list view
*/

	test.before(async t => {
		await Actions.Login(await t, Env.creds.admin.username, Env.creds.admin.password);
		//UG Profile feature is enabled and configured
		t.ctx.randomNodes = await Actions.generateProfiles(await t, 3);
		//PP7 teaser view is displayed
		await showPP7(t);
	})
	('Profiles are shown randomly on PP7 teaser list view', async t => {
		let baseProfileName;
		let numChecks = 20;
		let testPasses = false;

		await t.navigateTo(Env.baseURL + "/front");

		// collect first name to compare against
		baseProfileName = await Selector('.view-id-pp7').find('.media-heading').find('a').textContent;

		for(let i=0;i<numChecks;i++){
			//refresh page and collect first name
			await t.navigateTo(Env.baseURL + "/front");
			let profileName = await Selector('.view-id-pp7').find('.media-heading').find('a').textContent;

			if(profileName !== baseProfileName){
				testPasses = true;
				break;
			}
		}

		//Profiles displayed in PP7 teaser view appear randomly
		await t.expect(testPasses).ok('Profiles do not show randomly in PP7 teaser list view.');

	})
	.after(async t => {
		await Actions.revertCustomPage(t,CustomizePage.auth.front);
		await Actions.removeProfiles(await t, t.ctx.randomNodes);
	});


/**
* Selected fields show on Profiles PP7 teaser list view
*/

	test.before(async t => {
		await Actions.Login(await t, Env.creds.admin.username, Env.creds.admin.password);
		//UG Profile feature is enabled and configured
		t.ctx.randomNodes = await Actions.generateProfiles(await t, 1);
		//PP7 teaser view is displayed
		await showPP7(t);
	})
	('Selected fields show on Profiles PP7 teaser list view', async t => {

		await t.navigateTo(Env.baseURL + "/front");

		let profileTitle = await Selector('.view-id-pp7').find('.media-heading').find('a').textContent;
		let profileTitleVisible = await Selector('.view-id-pp7').find('.media-heading').find('a').visible;
		let profileImageExists = await Selector('.view-id-pp7').find('.media-thumbnail').find('img').exists;
		let profileTeaser = await Selector('.view-id-pp7').find('.media-summary').textContent;
		let profileTeaserVisible = await Selector('.view-id-pp7').find('.media-summary').visible;

		await t
		    // Node Title shows
		    .expect(profileTitle.length).gt(0,'Node title field has less than 0 characters on PP7 teaser list view.')
			.expect(profileTitleVisible).ok('Node title does not show on PP7 teaser list view.')
		    // Image shows
			.expect(profileImageExists).ok('Image field does not show on PP7 teaser list view.')
		    // Teaser summary shows
			.expect(profileTeaser.length).gt(0,'Teaser field has less than 0 characters on PP7 teaser list view.')
			.expect(profileTeaserVisible).ok('Teaser field does not show on PP7 teaser list view.');

	})
	.after(async t => {
		await Actions.revertCustomPage(t,CustomizePage.auth.front);
		await Actions.removeProfiles(await t, t.ctx.randomNodes);
	});

/**
* Title can be overridden on Profiles PP7 teaser list view by Site Manager
*/

	test.before(async t => {
		
		//UG Profile feature is enabled and configured
		await Actions.Login(await t, Env.creds.admin.username, Env.creds.admin.password);
		t.ctx.randomNodes = await Actions.generateProfiles(await t, 1);
		// Site Manager (role) is logged in
		await t.click(UserPage.auth.logOut);
		await Actions.Login(await t, Env.creds.sitemanager.username, Env.creds.sitemanager.password);
		//PP7 teaser view is displayed
		await showPP7(t);
	})
	('Title can be overridden on Profiles PP7 teaser list view', async t => {		
		await t.navigateTo(Env.baseURL + "/front");
	    
		let overrideTitleCheckbox = await Selector('#override-title-checkbox');
		let overrideTitleTextfield = await Selector('#override-title-textfield');
		let overriddenText = "Overridden PP7 Title";

		// Edit PP7 view pane
		await editPP7(t);

	    await t
		    // Site Manager role overrides PP7 view pane title
	    	.click(overrideTitleCheckbox)
	    	.expect(overrideTitleCheckbox.checked).ok('Override title checkbox cannot be checked.')
			.expect(overrideTitleTextfield.visible).ok('Override title textfield not visible.')
			.typeText(overrideTitleTextfield,overriddenText,{ replace: true })
			.expect(overrideTitleTextfield.value).eql(overriddenText)
			// Close Edit PP7 view pane dialog
	    	.click(PeoplePage.auth.finishButton);

		await t
			// wait for Save button to show
			.eval(() => new Promise(resolve => setInterval(function() {
		        if(jQuery('#panels-ipe-save').length > 0) resolve();
			}, 500)));

	    await t
			// save In-Place Editor
			.click(PeoplePage.auth.panelsSaveButton)
		    // PP7 title displays overridden title
		    .expect(PeoplePage.auth.pp7.paneTitle.textContent).contains(overriddenText,'Title cannot be overridden on Profiles PP7 teaser list view.');
	})
	.after(async t => {
		await Actions.revertCustomPage(t,CustomizePage.auth.front);
		await Actions.removeProfiles(await t, t.ctx.randomNodes);
	});


/**
* More button can be overridden on Profiles PP7 teaser list view by Site Manager
*/

	test.before(async t => {
		//UG Profile feature is enabled and configured
		await Actions.Login(await t, Env.creds.admin.username, Env.creds.admin.password);
		t.ctx.randomNodes = await Actions.generateProfiles(await t, 2);
		// Site Manager (role) is logged in
		await t.click(UserPage.auth.logOut);
		await Actions.Login(await t, Env.creds.sitemanager.username, Env.creds.sitemanager.password);
		//PP7 teaser view is displayed
		await showPP7(t);
	})
	('More button text can be overridden on Profiles PP7 teaser list view', async t => {		
		await t.navigateTo(Env.baseURL + "/front");
	    
		let moreButtonTextfield = await Selector('#edit-more-text');
		let newText = "Overridden PP7 More Button";
		let editItemsPerPage = await Selector('#edit-items-per-page');
		let itemsPerPage = '1';

		// Edit PP7 view pane
		await editPP7(t);

	    await t
		    // Site Manager role overrides PP7 view pane more button text
			.expect(moreButtonTextfield.visible).ok('Override more button textfield not visible.')
			.typeText(moreButtonTextfield,newText,{ replace: true })
			.expect(moreButtonTextfield.value).eql(newText)
			// Set number of items in teaser view
			.typeText(editItemsPerPage,itemsPerPage,{ replace: true })
			// Close Edit PP7 view pane dialog
	    	.click(PeoplePage.auth.finishButton);

		await t
			// wait for Save button to show
			.eval(() => new Promise(resolve => setInterval(function() {
		        if(jQuery('#panels-ipe-save').length > 0) resolve();
			}, 500)));

	    await t
			// save In-Place Editor
			.click(PeoplePage.auth.panelsSaveButton)
		    // PP7 more button displays overridden text
		    .expect(PeoplePage.auth.pp7.paneMoreButton.textContent).contains(newText,'More button text cannot be overridden on Profiles PP7 teaser list view.');
	})
	.after(async t => {
		await Actions.revertCustomPage(t,CustomizePage.auth.front);
		await Actions.removeProfiles(await t, t.ctx.randomNodes);
	});


/**
* Profiles PP7 teaser list view can be filtered by category term by Site Manager
*/

	test.before(async t => {
		let numNodes = 4;
		t.ctx.allTerms = [];

		// Generate category term ID
		let category = Faker.lorem.word();
		t.ctx.categoryTermID = await Actions.CreateTerm(Util.Vocabulary['profile_category'],category,'');
		t.ctx.allTerms.push(t.ctx.categoryTermID);
				
		// UG Profile feature is enabled and configured
		await Actions.Login(await t, Env.creds.admin.username, Env.creds.admin.password);

		// Generate profiles (half with a category, half with no category)
		t.ctx.regularNodes = await Actions.generateProfiles(await t, Math.floor(numNodes/2));
		t.ctx.categorizedNodes = await Actions.generateProfiles(await t, numNodes - Math.floor(numNodes/2), {categoryTermID:t.ctx.categoryTermID})

		// Site Manager (role) is logged in
		await t.click(UserPage.auth.logOut);
		await Actions.Login(await t, Env.creds.sitemanager.username, Env.creds.sitemanager.password);
		
		// PP7 teaser view is displayed
		await showPP7(t);
	})
	('Profiles PP7 teaser list view can be filtered by category term by Site Manager', async t => {
		let filteredMoreURL = '/people/' + t.ctx.categoryTermID;
		await t.navigateTo(Env.baseURL + "/front");

		await editPP7(t);
		await t
		    // Site Manager role filters PP7 view pane by category term
			.typeText(PeoplePage.auth.pp7.editFilterByTermID,t.ctx.categoryTermID,{ replace: true })
			// Display all results
			.typeText(PeoplePage.auth.pp7.editItemsPerPage,"0",{ replace: true })
			// Close Edit PP7 view pane dialog
	    	.click(PeoplePage.auth.finishButton);

		await t
			// wait for Save button to show
			.eval(() => new Promise(resolve => setInterval(function() {
		        if(jQuery('#panels-ipe-save').length > 0) resolve();
			}, 500)));

	    await t
			// save In-Place Editor
			.click(PeoplePage.auth.panelsSaveButton);

		// Profiles displayed in PP7 teaser view are filtered by category term
		for(let i=0;i<t.ctx.categorizedNodes.length;i++) {
			//Check that nodes with category show up
			let profileName = t.ctx.categorizedNodes[i].data.name.first + " " + t.ctx.categorizedNodes[i].data.name.last;;
			await t.expect(PeoplePage.common.pp7.viewPane.textContent).contains(profileName, "Profiles displayed in PP7 teaser view are not filtered by category term.");
		}
		
		for(let i=0;i<t.ctx.regularNodes.length;i++) {
			//Check that nodes without category do not show up
			let profileName = t.ctx.regularNodes[i].data.name.first + " " + t.ctx.regularNodes[i].data.name.last;
			await t.expect(PeoplePage.common.pp7.viewPane.textContent).notContains(profileName, "Profiles displayed in PP7 teaser view are not filtered by category term.");
		}

		await editPP7(t);
		await t
			// Display 1 result to show more button
			.typeText(PeoplePage.auth.pp7.editItemsPerPage,"1",{ replace: true })
			// Close Edit PP7 view pane dialog
	    	.click(PeoplePage.auth.finishButton);

		await t
			// wait for Save button to show
			.eval(() => new Promise(resolve => setInterval(function() {
		        if(jQuery('#panels-ipe-save').length > 0) resolve();
			}, 500)));

		await t
			// save In-Place Editor
			.click(PeoplePage.auth.panelsSaveButton)
		    // PP7 more button links to people/categoryTermID
		    .expect(PeoplePage.auth.pp7.paneMoreButton.getAttribute('href')).contains(filteredMoreURL,'When PP7 is filtered by category, PP7 More button url does not link to people/[category term ID].');


	})
	.after(async t => {
		await Actions.revertCustomPage(t,CustomizePage.auth.front);
		await Actions.removeProfiles(await t, t.ctx.regularNodes);
		await Actions.removeProfiles(await t, t.ctx.categorizedNodes);
		await Actions.removeTerms(await t, t.ctx.allTerms);
	});

/**
* Profiles PP7 teaser list view can be filtered by keyword term by Site Manager
*/

	test.before(async t => {
		let numNodes = 4;
		let keywordTerms = [];
		t.ctx.allTerms = [];

		// Generate keyword terms
		let keywords = await Actions.generateTerms(await t, 3);

		// Prepare comma-separate list of keywords
		for(let i=0;i<keywords.length;i++){
			// Save keyword ID for deletion
			t.ctx.allTerms.push(keywords[i].id);
			keywordTerms.push(keywords[i].name);
		}
		keywordTerms = keywordTerms.toString();

		//Select a random keyword term ID
		t.ctx.keywordTermID = keywords[Math.floor(Math.random()*keywords.length)].id;
				
		// UG Profile feature is enabled and co nfigured
		await Actions.Login(await t, Env.creds.admin.username, Env.creds.admin.password);

		// Generate profiles (half with keywords, half with no keyword)
		t.ctx.regularNodes = await Actions.generateProfiles(await t, Math.floor(numNodes/2));
		t.ctx.termedNodes = await Actions.generateProfiles(await t, numNodes - Math.floor(numNodes/2), {keywordTerms:keywordTerms});

		// Site Manager (role) is logged in
		await t.click(UserPage.auth.logOut);
		await Actions.Login(await t, Env.creds.sitemanager.username, Env.creds.sitemanager.password);
		
		// PP7 teaser view is displayed
		await showPP7(t);
	})
	('Profiles PP7 teaser list view can be filtered by keyword term by Site Manager', async t => {
		let filteredMoreURL = '/people/' + t.ctx.keywordTermID;
		await t.navigateTo(Env.baseURL + "/front");

		await editPP7(t);
		await t
		    // Site Manager role filters PP7 view pane by keyword term
			.typeText(PeoplePage.auth.pp7.editFilterByTermID,t.ctx.keywordTermID,{ replace: true })
			// Display all results
			.typeText(PeoplePage.auth.pp7.editItemsPerPage,"0",{ replace: true })
			// Close Edit PP7 view pane dialog
	    	.click(PeoplePage.auth.finishButton);

		await t
			// wait for Save button to show
			.eval(() => new Promise(resolve => setInterval(function() {
		        if(jQuery('#panels-ipe-save').length > 0) resolve();
			}, 500)));

	    await t
			// save In-Place Editor
			.click(PeoplePage.auth.panelsSaveButton);

		// Profiles displayed in PP7 teaser view are filtered by keyword term
		for(let i=0;i<t.ctx.termedNodes.length;i++) {
			//Check that nodes with keyword show up
			let profileName = t.ctx.termedNodes[i].data.name.first + " " + t.ctx.termedNodes[i].data.name.last;;
			await t.expect(PeoplePage.common.pp7.viewPane.textContent).contains(profileName, "Profiles displayed in PP7 teaser view are not filtered by keyword term.");
		}
		
		for(let i=0;i<t.ctx.regularNodes.length;i++) {
			//Check that nodes without keyword do not show up
			let profileName = t.ctx.regularNodes[i].data.name.first + " " + t.ctx.regularNodes[i].data.name.last;
			await t.expect(PeoplePage.common.pp7.viewPane.textContent).notContains(profileName, "Profiles displayed in PP7 teaser view are not filtered by keyword term.");
		}

		await editPP7(t);
		await t
			// Display 1 result to show more button
			.typeText(PeoplePage.auth.pp7.editItemsPerPage,"1",{ replace: true })
			// Close Edit PP7 view pane dialog
	    	.click(PeoplePage.auth.finishButton);

		await t
			// wait for Save button to show
			.eval(() => new Promise(resolve => setInterval(function() {
		        if(jQuery('#panels-ipe-save').length > 0) resolve();
			}, 500)));

	    await t
			// save In-Place Editor
			.click(PeoplePage.auth.panelsSaveButton)
		    // PP7 more button links to people/keywordTermID
		    .expect(PeoplePage.auth.pp7.paneMoreButton.getAttribute('href')).contains(filteredMoreURL,'When PP7 is filtered by keyword, PP7 More button url does not link to people/[keyword term ID].');

	})
	.after(async t => {
		await Actions.revertCustomPage(t,CustomizePage.auth.front);
		await Actions.removeProfiles(await t, t.ctx.regularNodes);
		await Actions.removeProfiles(await t, t.ctx.termedNodes);
		await Actions.removeTerms(await t, t.ctx.allTerms);
	});

/**
* Shows PP7 view pane on baseURL and returns view pane DOM ID
* 
* @param   {object} t  Test controller
*/

async function showPP7(t){

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
		// open Left Region
		.click(PeoplePage.auth.panelsAddToLeft)
		.click(PeoplePage.auth.viewPanesLink);

	await t
		// wait for Select PP7 View Pane to show
		.eval(() => new Promise(resolve => setInterval(function() {
	        if(jQuery('a.add-content-link-pp7-panel-pane-1-icon-text-button').length > 0) resolve();
		}, 500)));

	await t
		// add PP7 View Pane
		.click(PeoplePage.auth.pp7.selectViewPane)
		.click(PeoplePage.auth.finishButton)

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
* Open PP7 Settings dialog
* 
* @param   {object} t  Test controller
*/

async function editPP7(t){

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
		.click(PeoplePage.auth.pp7.editButton);
}
