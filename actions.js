const request = require('request-promise-native');

const Env = require('./environment.js');
const Util = require('./utils.js');
const UserPage = require('./pages/user.js');
const CustomizePage = require('./pages/admin/structure/pages.js');
const Faker = require('faker');

const PostPath = "/testcafe";
const LoginEndpoint = "/user/login";
const TokenEndpoint = "/user/token.json";
const NodeEndpoint = "/node";
const TermEndpoint = "/taxonomy_term";

import { Selector } from 'testcafe';

async function getLoginHeaders(user, pass) {
	// Post to login
	var headers = {};
	await request({
		uri:Env.baseURL + PostPath + LoginEndpoint,
		headers:headers,
		method:"POST",
		json:true,
		body:{
			"username":user,
			"password":pass
		}
	}).then(function(body) {
		headers["Cookie"] = body.session_name + "=" + body.sessid;
	});

	// Post to token
	await request({
		uri:Env.baseURL + PostPath + TokenEndpoint,
		headers:headers,
		method:"POST",
		json:true
	}).then(function(body) {
		headers["X-CSRF-Token"] = body.token;
	});

	return headers;
}

// TODO: Add support for file attachments
/**
 * PAGE - Converts simplified JSON into the proper format to post to Drupal Services
 * @param  {object} data Simplified JSON object containing node data
 * @return {object}      JSON data in the proper format to be posted
 *
 * Simplified structure:
 * 	{
 * 		title:"Page Title",
 * 		tid:"21", // Make sure this exists or you will get an error!
 * 		body:{
 * 			value:"Main page text.",
 *    		summary:this.value,
 *       	format:"full_html|filtered_html|plain_text"
 * 		}
 * 		tags:"test, tags, here"
 *  }
 *
 */
function pageFormat(data) {
	data.body = data.body || {};

	return {
		type:"page",
		title:data.title || Util.RandomName(4, 10),
		field_page_body:{
			und:[
				{
					"summary":data.body.summary || "",
					"value":data.body.value || "",
					"format":data.body.format || "filtered_html"
				}
			]
		},
		field_page_category:{
			und:data.tid || "_none"
		},
		field_tags:{
			und:data.tags || ""
		}
	};
}

// TODO: Add support for feature image upload
// TODO: Add support for image caption
/**
 * NEWS - Converts simplified JSON into the proper format to post to Drupal Services
 * @param  {object} data 				Simplified JSON object containing node data
 * @param  {string} data.type 			The content type to create (REQUIRED)
 * @param  {string} data.title 			The title of the node (REQUIRED)
 * @param  {string} data.tid 			Term ID of the news category for the node
 * @param  {string} data.author 		The name of the author of the news item
 * @param  {object} data.body 			Data describing the body field of the news item
 * @param  {string} data.body.value 	Value of the body text that will appear on the news item
 * @param  {string} data.body.summary 	Value of the summary for the news body
 * @param  {string} data.body.format 	Text format of the body field's value (Valid: full_html|filtered_html|plain_text - DEFAULT: filtered_html)
 * @param  {string} data.tags 			Comma-separated list of tags for the node
 * @param  {string} data.link 			Link to content related to the news item
 * @return {object}      				JSON data in the proper format to be posted
 *
 * Simplified structure:
 * 	{
 * 		title:"News Title", // Required
 * 		tid:"21", // Make sure this exists or you will get an error!
 * 		author:"John Doe",
 * 		body:{
 * 			value:"News article text.",
 * 			summary:"News article summary.",
 *     		format:"full_html|filtered_html|plain_text"
 * 		}
 * 		tags:"test, tags, here",
 * 		url:"http://www.example.com"
 * 	}
 *
 */
function newsFormat(data) {
	data.body = data.body || {};
	return {
		type:"news",
		title:data.title || Util.RandomName(4, 10),
		field_news_tags:{
			und:data.tid || "_none"
		},
		field_news_writer:{
			und:[
				{
					"value":data.author || ""
				}
			]
		},
		field_news_body:{
			und:[
				{
					"summary":data.body.summary || "",
					"value":data.body.value || "",
					"format":data.body.format || "filtered_html"
				}
			]
		},
		field_tags:{
			und:data.tags || ""
		},
		field_news_link:{
			und:[
				{
					"url":data.url || ""
				}
			]
		}
	};
}

// TODO: Add support for sections
// TODO: Add support for feature image
// TODO: Add support for feature image caption
// TODO: Add support for file attachments
/**
 * EVENT - Converts simplified JSON into the proper format to post to Drupal Services
 * @param  {object} data Simplified JSON object containing node data
 * @return {object}      JSON data in proper format to be posted
 *
 * Simplified structure:
 * 	{
 * 		title:"Event Title",
 * 		tid:"21", // Make sure this exists or you will get an error!
 * 		all_day:[true|false],
 * 		show_todate:[true|false],
 * 		start_date:{
 * 			date:"Apr 26, 2017",
 * 			time:"10:45am"
 * 		},
 * 		end_date:{
 * 			date:"Apr 27, 2017",
 * 			time:"10:45am"
 * 		},
 * 		location:{
 * 			value:"Test location",
 * 			format:"full_html|filtered_html|plain_text"
 * 		}
 * 		body:{
 * 			value:"News article text.",
 * 			summary:"News article summary.",
 *     		format:"full_html|filtered_html|plain_text",
 * 		}
 * 		link:{
 * 			title:"Link Title",
 * 			url:"http://www.example.com"
 * 		}
 * 		tags:"test, tags, here"
 * 	}
 */
function eventFormat(data) {
	data.start_date = data.start_date || {};
	data.end_date = data.end_date || {};
	data.location = data.location || {};
	data.body = data.body || {};
	data.link = data.link || {};

	var ret = {
		type:"event",
		title:data.title || Util.RandomName(4, 10),
		field_event_category:{
			und:data.tid || "_none"
		},
		field_event_date:{
			und:[
				{
					all_day:data.all_day === false ? false : data.all_day || false,
					show_todate:data.show_todate === false ? false : true,
					value:{
						date:data.start_date.date || Util.FormatDate(new Date(), "M j Y"),
						time:data.start_date.time || "12:00pm"
					},
					value2:{
						date:data.end_date.date || Util.FormatDate(new Date(), "M j Y"),
						time:data.end_date.time || "1:00pm"
					}
				}
			]
		},
		field_event_location:{
			und:[
				{
					value:data.location.value || "",
					format:data.location.format || "filtered_html"
				}
			]
		},
		field_event_body:{
			und:[
				{
					value:data.body.value || "",
					summary:data.body.summary || "",
					format:data.body.format || "filtered_html"
				}
			]
		},
		field_event_link:{
			und:[
				{
					title:data.link.title || "",
					url:data.link.url || ""
				}
			]
		},
		field_tags:{
			und:data.tags || ""
		}
	};

	return ret;
}

/**
 * PROFILE - Converts simplified JSON into the proper format to post to Drupal Services
 * @param  {object} data Simplified JSON object containing node data
 * @return {object}      JSON data in proper format to be posted
 *
 * Simplified structure:
 * 	{
 * 		name:{
 * 			first:"John",
 * 			last:"Doe"
 * 		},
 * 		role:{
 * 			adjunct_faculty:false,
 * 			faculty:false,
 * 			grad_student:false,
 * 			post_doc:false,
 * 			professor:false,
 * 			sessional:false,
 * 			staff:false
 * 		},
 * 		tid:"21", // Make sure this exists or you will get an error!
 * 		summary:{
 * 			body:"Text for the profile summary.",
 * 			format:"full_html|filtered_html|plain_text"
 * 		},
 * 		info_fields:{
 * 			title:"Position here",
 * 			address:"123 Fake St.",
 * 			email:"john@example.com",
 * 			telephonenumber:"519-824-4120",
 * 			faxnumber:"519-824-4120",
 * 			office:"University Center, 3rd floor",
 * 			lab:"Some Fake Lab"
 * 		},
 * 		tags:"test, tags, here"
 * 	}
 */
function profileFormat(data) {
	data.role = data.role || {};
	data.summary = data.summary || {};
	data.teaser = data.teaser || {};
	data.info_fields = data.info_fields || {};
	data.name = data.name || {};
	var post = {
		type:"profile",
		field_profile_name:{
			und:[
				{
					value:data.name.first || Util.RandomName(4, 10)
				}
			]
		},
		field_profile_lastname:{
			und:[
				{
					value:data.name.last || Util.RandomName(4, 10)
				}
			]
		},
		field_profile_role:{
			und:{
				"14":data.role.staff ? 14 : undefined,
				"15":data.role.faculty ? 15 : undefined,
				"16":data.role.adjunct_faculty ? 16 : undefined,
				"17":data.role.sessional ? 17 : undefined,
				"18":data.role.grad_student ? 18 : undefined,
				"19":data.role.post_doc ? 19 : undefined,
				"20":data.role.professor ? 20 : undefined
			}
		},
		field_profile_category:{
			und:data.tid || "_none"
		},
		field_profile_summary:{
			und:[
				{
					value:data.summary.body || "",
					format:data.summary.format || "filtered_html"
				}
			]
		},
		field_profile_teaser:{
			und:[
				{
					value:data.teaser.body || "",
					format:data.teaser.format || "filtered_html"
				}
			]
		},
		field_tags:{
			und:data.tags || ""
		}
	};

	for(var field in data.info_fields) {
		let data_container = {und:[
			{
				value:data.info_fields[field],
			}
		]};

		post["field_profile_" + field] = data_container;
	}

	return post;
}

/**
 * FAQ Converts simplified JSON into the proper format to post to Drupal Servicesrep
 * @param  {object} data Simplified JSON object containing node data
 * @return {object}      JSON data in proper format to be posted
 *
 * Simplified structure:
 * 	{
 * 		type:"faq",
 * 		tid:"21|_none",
 * 		question:"Lorem ipsum dolor sit amet?",
 * 		answer:{
 * 			value:"Text to answer the question here.",
 * 			format:"full_html|filtered_html|plain_text"
 * 		},
 * 		tags:"test, tags, here"
 * 	}
 */
function faqFormat(data) {
	data.answer = data.answer || {};
	return {
		type:"faq",
		tid:data.tid || "_none",
		title:data.question || Util.RandomName(4, 10),
		field_faq_answer:{
			und:[
				{
					value:data.answer.value || Util.RandomName(4, 10),
					format:data.answer.format || "filtered_html"
				}
			]
		},
		field_tags:{
			und:data.tags || ""
		}
	};
}

/**
 * COURSE OUTLINE Converts simplified JSON into the proper format to post to Drupal Services
 * @param  {object} data Simplified JSON object containing node data
 * @return {object}      JSON data in proper format to be posted
 *
 * Simplified structure:
 * 	{
 * 		type:"course_outline",
 * 		name:"Test Course Name",
 * 		code:"COMP*101",
 * 		section:"01",
 * 		term:"1|2|3|_none",
 * 		category:"21|_none",
 * 		instructor:{
 * 			name:"John Doe",
 * 			url:"http://www.john-doe.me"
 * 		},
 * 		details:{
 * 			value:"Some course details here.",
 * 			format:"full_html|filtered_html|plain_text"
 * 		},
 * 		website:"http://www.coursesite.com",
 * 		course_level:"4|5|6|7|8|9|10|11|_none",
 * 		academic_level:"12|13|_none",
 * 		subject:"21|_none",
 * 		department:"21|_none",
 * 		tags:"test, tags, here"
 * 	}
 */
function courseOutlineFormat(data) {
	data.instructor = data.instructor || {};
	data.details = data.details || {};
	return {
		type:data.type,
		field_course_name:{
			und:[
				{
					value:data.name
				}
			]
		},
		field_course_code:{
			und:[
				{
					value:data.code
				}
			]
		},
		field_course_section:{
			und:[
				{
					value:data.section || ""
				}
			]
		},
		field_course_term:{
			und:data.term || "_none"
		},
		field_course_category:{
			und:data.category || "_none"
		},
		field_course_instructor:{
			und:[
				{
					value:data.instructor.name || ""
				}
			]
		},
		field_course_instructor_url:{
			und:[
				{
					url:data.instructor.url || ""
				}
			]
		},
		field_course_body:{
			und:[
				{
					value:data.details.value || "",
					format:data.details.format || "filtered_html"
				}
			]
		},
		field_course_website:{
			und:[
				{
					url:data.website || ""
				}
			]
		},
		field_course_level:{
			und:data.course_level || "_none"
		},
		field_course_acad_level:{
			und:data.academic_level || "_none"
		},
		field_course_subject:{
			und:data.subject || "_none"
		},
		field_course_department:{
			und:data.department || "_none"
		},
    field_tags:{
			und:data.tags || ""
		}
	};
}

 /**
 * BOOK Converts simplified JSON into the proper format to post to Drupal Services
 * @param  {object} data Simplified JSON object containing node data
 * @return {object}      JSON data in proper format to be posted
 *
 * Simplified structure:
 * 	{
 * 		type:"book",
 * 		title:"Book Page Title",
 * 		body:{
 * 			value:"Body text here.",
 * 			format:"full_html|filtered_html|plain_text"
 * 		},
 * 		tags:"test, tags, here"
 * 	}
 */
function bookFormat(data) {
	data.body = data.body || {};
	return {
		type:"book",
		title:data.title,
		body:{
			und:[
				{
					value:data.body.value || "",
					format:data.body.format || "filtered_html"
				}
			]
		},
		field_tags:{
			und:data.tags || ""
		}
	};
}

module.exports = {
	Login:async function(t, user, pass) {
		await t
			.navigateTo(Env.baseURL + UserPage.URL)
			// Authenticate
			.typeText(UserPage.anon.userInput, user)
			.typeText(UserPage.anon.passInput, pass)
			.click(UserPage.anon.submitButton)
			// Ensure login successful
			.expect(UserPage.auth.pageHeader.innerText).eql(user);
	},
	CreateTerm:async function(vid, name, desc) {
		// Authenticate REST
		var headers = await getLoginHeaders(Env.creds.admin.username, Env.creds.admin.password);

		// Post to node
		var tid;
		await request({
			uri:Env.baseURL + PostPath + TermEndpoint,
			headers:headers,
			method:"POST",
			json:true,
			body:{
				vid:vid,
				name:name,
				description:desc
			}
		}).then(function(body) {
			tid = body.tid;
		}).catch(function(err) {
			if(err) console.log(err.message);
		});

		return tid;
	},
	DeleteTerm:async function(tid) {
		// Authenticate REST
		var headers = await getLoginHeaders(Env.creds.admin.username, Env.creds.admin.password);

		// Post to node
		var res = false;
		await request({
			uri:Env.baseURL + PostPath + TermEndpoint + "/" + tid,
			headers:headers,
			method:"DELETE",
			json:true,
			body:{}
		}).then(function(body) {
			res = true;
		}).catch(function(err) {
			if(err) console.log(err.message);
		});

		return res;
	},
	CreateNode:async function(type, node_data) {
		var data;
		switch(type) {
			case "page":
				data = pageFormat(node_data);
				break;
			case "news":
				data = newsFormat(node_data);
				break;
			case "event":
				data = eventFormat(node_data);
				break;
			case "profile":
				data = profileFormat(node_data);
				break;
			case "faq":
				data = faqFormat(node_data);
				break;
			case "course_outline":
				data = courseOutlineFormat(node_data);
        break;
			case "book":
				data = bookFormat(node_data);
				break;
			default:
				return "Invalid node type."
		}

		// Authenticate REST
		var headers = await getLoginHeaders(Env.creds.admin.username, Env.creds.admin.password);

		// Post to node
		var nid = -1;
		await request({
			uri:Env.baseURL + PostPath + NodeEndpoint,
			headers:headers,
			method:"POST",
			json:true,
			body:data
		}).then(function(body) {
			nid = body.nid;
		}).catch(function(err) {
			if(err) console.log(err.message);
		});

		return nid;
	},
	DeleteNode:async function(nid) {
		// Authenticate REST
		var headers = await getLoginHeaders(Env.creds.admin.username, Env.creds.admin.password);

		// Post to node
		var res = false;
		await request({
			uri:Env.baseURL + PostPath + NodeEndpoint + "/" + nid,
			headers:headers,
			method:"DELETE",
			json:true,
			body:{}
		}).then(function(body) {
			res = true;
		}).catch(function(err) {
			if(err) console.log(err.message);
		});

		return res;
	},
	pageFormat:pageFormat,
	newsFormat:newsFormat,
	eventFormat:eventFormat,
	profileFormat:profileFormat,
	faqFormat:faqFormat,

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

	generateProfiles:async function(t, numNodes, data) {
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

			randomNode = await this.CreateNode('profile',randomData);

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
	},

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
	removeProfiles:async function(t, nodes){
		for(let i=0;i<nodes.length;i++){
			await this.DeleteNode(nodes[i].nodeID);
		}
	},

	/**
	* Generates multiple terms in tags vocabulary and returns array that contains, for each term, the name and ID
	* 
	* @param   {object} t         Test controller
	* @param   {Number} numTerms  Number of terms to generate
	* @returns {Array}            Multidimensional array that contains, for each term: 
	*			  				  	{id:Number} term ID
	*								{name:String} term Name
	*/
	generateTerms:async function (t, numTerms){
		let terms = [];
		for(let i = 0; i < numTerms; i++) {
			let termName = Faker.lorem.word();
			let termID = await this.CreateTerm(Util.Vocabulary['tags'],termName,'')
			terms.push({
				id:termID,
				name:termName,
			});
		}

		return terms;
	},

	/**
	* Deletes generated terms
	* 
	* @param  {object} t     Test controller
	* @param  {Array} terms  Term IDs to delete
	*/
	removeTerms:async function (t, terms){
		// Note: Once node is deleted, any related  image/file uploads will be deleted from file_managed table 
		// during next cron job provided images are 6 hours old
		for(let i=0;i<terms.length;i++){
			await this.DeleteTerm(terms[i]);
		}
	},

	/**
	* Reverts a custom page to its default state
	* 
	* @param  {object} t  			Test controller
	* @param  {object} customPage   Selector for customPage to revert
	*/
	revertCustomPage:async function (t, customPage){

		// Only admin can revert custom pages
		await t.click(UserPage.auth.logOut);
		await this.Login(await t, Env.creds.admin.username, Env.creds.admin.password);

		await t
			.navigateTo(Env.baseURL + CustomizePage.URL)
			.setNativeDialogHandler(() => true)
			// select Custom Page to Revert
			.click(customPage)
			// select Revert Tab
			.click(CustomizePage.auth.revertTab)
			// select Revert Button
			.click(CustomizePage.auth.revertButton);
	},

	/**
	* Clicks an element until the element no longer exists in the DOM.
	* E.g. Useful for clearing a region of view panes by repeatedly clicking the delete button.
	* 
	* @param   {object} t             Test controller
	* @param   {object} clickElement  Element to click
	*
	*/
	repeatClick:async function (t,clickElement){
		let elementExists = await clickElement.exists;
		let numElements = await clickElement.count;

		if(elementExists == true){
			for(let i=0;i<numElements;i++){
				await t.click(clickElement);
			}
		}
	},

};
