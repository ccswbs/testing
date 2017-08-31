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
		t.ctx.randomNodes = await generateProfiles(await t, 4);
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
		await hidePP6(t);
		await removeProfiles(await t, t.ctx.randomNodes);
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

	// Note: Once node is deleted, any related  image/file uploads will be deleted from file_managed table 
	// during next cron job provided images are 6 hours old
	for(let i=0;i<terms.length;i++){
		await Actions.DeleteTerm(terms[i]);
	}
}

/**
* @TODO: Move function to a more generic location
*
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
* @TODO: Move function to a more generic location
*
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
	await repeatClick(t,buttonToEmptyLeftRegion);

	await t
		// open Left Region
		.click(PeoplePage.auth.panelsAddToLeft)
		.click(PeoplePage.auth.viewPanesLink)
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

/**
* Hides PP6 view pane on baseURL
* 
* @param  {object} t  Test controller
*/

async function hidePP6(t){
	await revertCustomPage(t,CustomizePage.auth.people.filteredByTag);
}

/**
* @TODO: Move function to a more generic location
*
* Reverts a custom page to its default state
* 
* @param  {object} t  			Test controller
* @param  {object} customPage   Selector for customPage to revert
*/

async function revertCustomPage(t, customPage){
	await t
		.navigateTo(Env.baseURL + CustomizePage.URL)
		.setNativeDialogHandler(() => true)
		// select Custom Page to Revert
		.click(customPage)
		// select Revert Tab
		.click(CustomizePage.auth.revertTab)
		// select Revert Button
		.click(CustomizePage.auth.revertButton);
}
 

/**
* @TODO: Move function to a more generic location
*
* Clicks an element until the element no longer exists in the DOM.
* Useful for clearing a region of view panes by repeatedly clicking the delete button.
* 
* @param   {object} t             Test controller
* @param   {object} clickElement  Element to click
*
*/

async function repeatClick(t,clickElement){
	let elementExists = await clickElement.exists;
	let numElements = await clickElement.count;

	if(elementExists == true){
		for(let i=0;i<numElements;i++){
			await t.click(clickElement);
		}
	}
}
