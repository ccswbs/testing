const Env = require('../../environment.js');
const Util = require('../../utils.js');
const Actions = require('../../actions.js');
const UserPage = require('../../pages/user.js');
const PeoplePage = require('../../pages/people.js');
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
		t.ctx.randomNodes = await generateProfiles(await t, 3);
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
		await hidePP7(t);
		await removeProfiles(await t, t.ctx.randomNodes);
	});


/**
* Selected fields show on Profiles PP7 teaser list view
*/

	test.before(async t => {
		await Actions.Login(await t, Env.creds.admin.username, Env.creds.admin.password);
		//UG Profile feature is enabled and configured
		t.ctx.randomNodes = await generateProfiles(await t, 1);
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
		await hidePP7(t);
		await removeProfiles(await t, t.ctx.randomNodes);
	});

/**
* Title can be overridden on Profiles PP7 teaser list view by Site Manager
*/

	test.before(async t => {
		
		//UG Profile feature is enabled and configured
		await Actions.Login(await t, Env.creds.admin.username, Env.creds.admin.password);
		t.ctx.randomNodes = await generateProfiles(await t, 1);
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
	    	.click(PeoplePage.auth.finishButton).wait(300)
			// save In-Place Editor
			.click(PeoplePage.auth.panelsSaveButton).wait(300)
		    // PP7 title displays overridden title
		    .expect(PeoplePage.auth.pp7.paneTitle.textContent).contains(overriddenText,'Title cannot be overridden on Profiles PP7 teaser list view.');
	})
	.after(async t => {
		await hidePP7(t);
		await removeProfiles(await t, t.ctx.randomNodes);
	});


/**
* More button can be overridden on Profiles PP7 teaser list view by Site Manager
*/

	test.before(async t => {
		//UG Profile feature is enabled and configured
		await Actions.Login(await t, Env.creds.admin.username, Env.creds.admin.password);
		t.ctx.randomNodes = await generateProfiles(await t, 2);
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
	    	.click(PeoplePage.auth.finishButton).wait(300)
			// save In-Place Editor
			.click(PeoplePage.auth.panelsSaveButton).wait(300)
		    // PP7 more button displays overridden text
		    .expect(PeoplePage.auth.pp7.paneMoreButton.textContent).contains(newText,'More button text cannot be overridden on Profiles PP7 teaser list view.');
	})
	.after(async t => {
		await hidePP7(t);
		await removeProfiles(await t, t.ctx.randomNodes);
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
		t.ctx.regularNodes = await generateProfiles(await t, Math.floor(numNodes/2));
		t.ctx.categorizedNodes = await generateProfiles(await t, numNodes - Math.floor(numNodes/2), {categoryTermID:t.ctx.categoryTermID})

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
	    	.click(PeoplePage.auth.finishButton).wait(300)
			// save In-Place Editor
			.click(PeoplePage.auth.panelsSaveButton).wait(300);

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
	    	.click(PeoplePage.auth.finishButton).wait(300)
			// save In-Place Editor
			.click(PeoplePage.auth.panelsSaveButton).wait(300)
		    // PP7 more button links to people/categoryTermID
		    .expect(PeoplePage.auth.pp7.paneMoreButton.getAttribute('href')).contains(filteredMoreURL,'When PP7 is filtered by category, PP7 More button url does not link to people/[category term ID].');


	})
	.after(async t => {
		await hidePP7(t);
		await removeProfiles(await t, t.ctx.regularNodes);
		await removeProfiles(await t, t.ctx.categorizedNodes);
		await removeTerms(await t, t.ctx.allTerms);
	});

/**
* Profiles PP7 teaser list view can be filtered by keyword term by Site Manager
*/

	test.before(async t => {
		let numNodes = 4;
		let keywordTerms = [];
		t.ctx.allTerms = [];

		// Generate keyword terms
		let keywords = await generateKeywords(await t, 3);

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
		t.ctx.regularNodes = await generateProfiles(await t, Math.floor(numNodes/2));
		t.ctx.termedNodes = await generateProfiles(await t, numNodes - Math.floor(numNodes/2), {keywordTerms:keywordTerms});

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
	    	.click(PeoplePage.auth.finishButton).wait(300)
			// save In-Place Editor
			.click(PeoplePage.auth.panelsSaveButton).wait(300);

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
	    	.click(PeoplePage.auth.finishButton).wait(300)
			// save In-Place Editor
			.click(PeoplePage.auth.panelsSaveButton).wait(300)
		    // PP7 more button links to people/keywordTermID
		    .expect(PeoplePage.auth.pp7.paneMoreButton.getAttribute('href')).contains(filteredMoreURL,'When PP7 is filtered by keyword, PP7 More button url does not link to people/[keyword term ID].');

	})
	.after(async t => {
		await hidePP7(t);
		await removeProfiles(await t, t.ctx.regularNodes);
		await removeProfiles(await t, t.ctx.termedNodes);
		await removeTerms(await t, t.ctx.allTerms);
	});

/**
* Generates multiple terms and returns array that contains, for each term, the name and ID
* 
* @param   {object} t         Test controller
* @param   {Number} numTerms  Number of terms to generate
* @returns {Array}            Multidimensional array that contains, for each term: 
*			  				  	{id:Number} term ID
*								{name:String} term Name
*/

async function generateKeywords(t, numTerms){
	let terms = [];
	for(let i = 0; i < numTerms; i++) {
		let termName = Faker.lorem.word();
		let termID = await Actions.CreateTerm(Util.Vocabulary['tags'],termName,'')
		terms.push({
			id:termID,
			name:termName,
		});
	}

	return terms;
}

/**
* Deletes generated profiles
* 
* @param  {object} t     Test controller
* @param  {Array} terms  Term IDs to delete
*/

async function removeTerms(t, terms){
	for(let i=0;i<terms.length;i++){
		await Actions.DeleteTerm(terms[i]);
	}
}

/**
* Generates multiple profiles and returns multidimensional array of created node IDs and generated data
* 
* @param   {object} t         Test controller
* @param   {Number} numNodes  Number of nodes to generate
* @param   {Array} [data]     Data to set for generated nodes (Optional)
* @returns {Array}            Multidimensional array that contains, for each node: 
*			  				  	{nodeID:Number} the created node ID
*								{data:Array} the data generated for that node
*
* Data that can be set using data parameter:
* 	{
* 		tid:"21",
* 		// TO DO: tags:"test, tags, here"
* 	}
*
*/

async function generateProfiles(t, numNodes, data){
	let randomNode;
	let generatedNodes = [];

	// Profile selectors
	let imageWidget = Selector('.image-widget-data').find('input[type="file"]');
	let uploadImage = Selector('.image-widget-data').find('input[type="submit"]');
	let saveProfile = Selector ('#edit-submit');

	// Profile variables
	let categoryTermID;
	let keywordTerms;

	//Check for set data
	if(typeof data !== 'undefined'){
		// Set category term
		if (typeof data.categoryTermID !== 'undefined'){
			categoryTermID = data.categoryTermID;
		}
		// Set keyword terms
		if (typeof data.keywordTerms !== 'undefined'){
			keywordTerms = data.keywordTerms;
		}
	}

	// Generate nodes
	for(let i=0;i<numNodes;i++) {
		let firstName = Faker.name.firstName();
		let lastName = Faker.name.lastName();
		let summary = Faker.lorem.paragraph();
		let teaser = Faker.lorem.sentence();
		let jobTitle = Faker.name.jobTitle();
		let address = Faker.address.streetAddress();
		let email = Faker.internet.email();
		let phone = Faker.phone.phoneNumber();
		let fax = Faker.phone.phoneNumber();
		let office = Faker.address.streetAddress();

		let randomData = {
			name:{
				first:firstName,
				last:lastName
			},
			summary:{
				body:summary
			},
			teaser:{
				body:teaser
			},
			tid:categoryTermID,
			info_fields:{
				title:jobTitle,
				address:address,
				email:email,
				telephonenumber:phone,
				faxnumber:fax,
				office:office,
			},
			tags:keywordTerms,
		};		

		randomNode = await Actions.CreateNode('profile',randomData);

		generatedNodes.push({
			nodeID:randomNode,
			data:randomData,
		});
	}

	// Upload test profile images
	for(let i=0;i<numNodes;i++){
		await t
			.navigateTo(Env.baseURL + '/node/' + generatedNodes[i].nodeID + '/edit')
			.setFilesToUpload(imageWidget, [
            '../../test_uploads/1.jpeg',
	        ])
	        .click(uploadImage)
	        .click(saveProfile);
	}

	return generatedNodes;
}

/**
* Deletes generated profiles
* 
* @param  {object} t     Test controller
* @param  {Array} nodes  Nodes to delete
*
*  Note: Once node is deleted, any related  image/file uploads 
*   will be deleted from file_managed table 
*	during next cron job provided images are 6 hours old
*/

async function removeProfiles(t, nodes){
	for(let i=0;i<nodes.length;i++){
		await Actions.DeleteNode(nodes[i].nodeID);
	}
}

/**
* Shows PP7 view pane on baseURL and returns view pane DOM ID
* 
* @param   {object} t  Test controller
*/

async function showPP7(t){

	await t
		.navigateTo(Env.baseURL + "/front").wait(300)
		.setNativeDialogHandler(() => true)
		// open In-Place Editor
		.click(PeoplePage.auth.panelsCustomizeButton).wait(300)
		// open Left Region
		.click(PeoplePage.auth.panelsAddToLeft).wait(300)
		.click(PeoplePage.auth.viewPanesLink).wait(300)
		// add PP7 View Pane
		.click(PeoplePage.auth.pp7.selectViewPane).wait(300)
		.click(PeoplePage.auth.finishButton).wait(300)
		// save In-Place Editor
		.click(PeoplePage.auth.panelsSaveButton).wait(300);
}

/**
* Open PP7 Settings dialog
* 
* @param   {object} t  Test controller
*/

async function editPP7(t){

	await t
		.navigateTo(Env.baseURL + "/front").wait(300)
		.setNativeDialogHandler(() => true)
		// open In-Place Editor
		.click(PeoplePage.auth.panelsCustomizeButton).wait(300)
		// open Edit cog
		.click(PeoplePage.auth.pp7.editButton).wait(300);
}

/**
* Hides PP7 view pane on baseURL
* 
* @param  {object} t  Test controller
*/

async function hidePP7(t){
	await t
		.navigateTo(Env.baseURL + "/front").wait(300)
		.setNativeDialogHandler(() => true)
		// open In-Place Editor
		.click(PeoplePage.auth.panelsCustomizeButton).wait(300)
		// remove PP7 View Pane
		.click(PeoplePage.auth.pp7.deleteButton).wait(300)
		// save In-Place Editor
		.click(PeoplePage.auth.panelsSaveButton).wait(300);
}
