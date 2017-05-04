const request = require('request-promise-native');

const Env = require('./environment.js');
const Util = require('./utils.js');
const UserPage = require('./pages/user.js');

const PostPath = "/testcafe";
const LoginEndpoint = "/user/login";
const TokenEndpoint = "/user/token.json";
const NodeEndpoint = "/node";
const TermEndpoint = "/taxonomy_term";

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
		field_tags:{
			und:data.tags || ""
		}
	};

	for(var field in data.info_fields) {
		post["field_profile_" + field] = data.info_fields[field];
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
	faqFormat:faqFormat
};