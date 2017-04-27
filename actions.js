const mysql = require('promise-mysql');
const request = require('request-promise-native');

const Env = require('./environment.js');
//const UserPage = require('./pages/user.js');

const PostPath = "/testcafe";
const LoginEndpoint = "/user/login";
const TokenEndpoint = "/user/token.json";
const NodeEndpoint = "/node";

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
	CreateTerm:async function(vid, name) {
		var db;
		var err = false;
		var tid = -1;

		await dbConnect()
		.then(function(con) {
			db = con;

			var data = [parseInt(vid), name, 'description of ' + name];
			var sql = mysql.format("INSERT INTO taxonomy_term_data(vid, name, description, format, weight) VALUES(?, ?, ?, 'plain_text', 0)", data);

			return db.query(sql);
		}).then(function(rows) {
			tid = rows.insertId;

			var data = [tid, 0];
			var sql = mysql.format("INSERT INTO taxonomy_term_hierarchy(tid, parent) VALUES(?, ?)", data);

			return db.query(sql);
		}).catch(function(error) {
			err = error;
		}).then(function(rows) {
			db.end().then(function(error) {
				if(error) {
					console.log(error);
					err = error;
				}
			});
		});
		return err || tid;
	},
	DeleteTerm:async function(tid) {
		var db;
		var err = false;

		await dbConnect()
		.then(function(con) {
			db = con;

			var data = [parseInt(tid)];
			var sql = mysql.format("DELETE FROM taxonomy_term_data WHERE tid=?", data);

			return db.query(sql);
		}).then(function(rows) {
			var data = [parseInt(tid)];
			var sql = mysql.format("DELETE FROM taxonomy_term_hierarchy WHERE tid=?", data);

			return db.query(sql);
		}).catch(function(error) {
			err = error;
		}).then(function(rows) {
			db.end().then(function(error) {
				if(error) {
					console.log(error);
					err = error;
				}
			});
		});
		return err || true;
	},
	CreatePage:async function(fields) {
		var db, vid, nid;
		var err = false;

		var promise = await dbConnect()
		.then(function(con) { // Create revision
			db = con;

			var data = [fields.title, " ", drupalTimestamp()];
			var sql = mysql.format("INSERT INTO node_revision(title, log, timestamp) VALUES(?, ?, ?)", data);

			return db.query(sql);
		})
		.then(function(rows) { // Create node using vid from previous transaction
			vid = rows.insertId;

			var data = [vid, fields.title, drupalTimestamp(), drupalTimestamp()];
			var sql = mysql.format("INSERT INTO node(vid, type, language, title, uid, status, created, changed) VALUES(?, 'page', 'und', ?, 1, 1, ?, ?)", data);

			return db.query(sql);
		}).then(function(rows) { // Update revision with node id
			nid = rows.insertId;

			var data = [nid, vid];
			var sql = mysql.format("UPDATE node_revision SET nid=? WHERE vid=?", data);

			return db.query(sql);
		}).then(function(rows) { // Add URL alias
			var data = ['node/' + nid, fields.title.toLowerCase().replace(/\s/g, '-')];
			var sql = mysql.format("INSERT INTO url_alias(source, alias, language) VALUES(?, ?, 'und')", data);

			return db.query(sql);
		}).then(function(rows) { // Add body field if it exists
			if(fields.body) {
				var data = [nid, fields.body.value, fields.body.format];
				var sql = mysql.format("INSERT INTO field_data_field_page_body(entity_type, bundle, entity_id, language, delta, field_page_body_value, field_page_body_summary, field_page_body_format) VALUES('node', 'page', ?, 'und', 0, ?, ' ', ?)", data);

				return db.query(sql);
			}
		}).catch(function(error) { // Catch any errors
			err = error;
		}).then(function() { // Close MySQL connection
			db.end().then(function(error) {
				if(error) {
					console.log(error);
					err = error;
				}
			});
		});
		return err || nid;
	},
	CreateNews:async function(fields) {
		var db, vid, nid;
		var err = false;

		var promise = await dbConnect()
		.then(function(con) {
			db = con;

			var data = [fields.title, " ", drupalTimestamp()];
			var sql = mysql.format("INSERT INTO node_revision(title, log, timestamp) VALUES(?, ?, ?)", data);

			return db.query(sql);
		})
		.then(function(rows) {
			vid = rows.insertId;

			var data = [vid, fields.title, drupalTimestamp(), drupalTimestamp()];
			var sql = mysql.format("INSERT INTO node(vid, type, language, title, uid, status, created")
		})
	},
	CreateNode:async function(node_data) {
		var data;
		switch(node_data.type) {
			case "page":
				data = pageFormat(node_data);
				break;
			case "news":
				data = newsFormat(node_data);
				break;
			case "event":
				data = eventFormat(node_data);
				break;
			default:
				return "Invalid node type."
		}

		// Post to login
		var headers = {};
		await request({
			uri:Env.baseURL + PostPath + LoginEndpoint,
			headers:headers,
			method:"POST",
			json:true,
			body:{
				"username":"admin",
				"password":"password"
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
	}
};

async function dbConnect() {
	return mysql.createConnection({
		host: 'localhost',
		user: Env.creds.db.username,
		password: Env.creds.db.password,
		database: Env.creds.db.database
	});
}

function drupalTimestamp() {
	return Math.round((+ new Date())/1000);
}

// TODO: Add support for file attachments
/**
 * PAGE - Converts simplified JSON into the proper format to post to Drupal Services
 * @param  {object} data Simplified JSON object containing node data
 * @return {object}      JSON data in the proper format to be posted
 *
 * Simplified structure:
 * 	{
 * 		type:"page",
 * 		title:"Page Title",
 * 		tid:"21", // Make sure this exists or you will get an error!
 * 		body:{
 * 			value:"Main page text.",
 *    		summary:"Main page summary.",
 *       	format:"full_html|filtered_html|plain_text"	
 * 		}
 * 		tags:"test, tags, here"
 *  }
 * 
 */
function pageFormat(data) {
	return {
		type:"page",
		title:data.title,
		field_page_body:{
			und:[
				{
					"summary":data.body.summary,
					"value":data.body.value,
					"format":data.body.format
				}
			]
		},
		field_page_category:{
			und:data.tid
		},
		field_tags:{
			und:data.tags
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
 * 		type:"news", // Required
 * 		title:"News Title", // Required
 * 		tid:"21", // Make sure this exists or you will get an error!
 * 		author:"John Doe",
 * 		body:{
 * 			value:"News article text.",
 * 			summary:"News article summary.",
 *     		format:"full_html|filtered_html|plain_text" // Required
 * 		}
 * 		tags:"test, tags, here",
 * 		link:"http://www.example.com"
 * 	}
 * 
 */
function newsFormat(data) {
	return {
		type:"news",
		title:data.title,
		field_news_tags:{
			und:data.tid
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
 * 		type:"event",
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
	return {
		type:"event",
		title:data.title,
		field_event_category:{
			und:data.tid || "_none"
		},
		field_event_date:{
			und:[
				{
					all_day:data.all_day,
					show_todate:data.show_todate,
					value:{
						date:data.start_date.date,
						time:data.start_date.time
					},
					value2:{
						date:data.end_date.date,
						time:data.end_date.time
					}
				}
			]
		},
		field_event_location:{
			und:[
				{
					value:data.location.value,
					format:data.location.format
				}
			]
		},
		field_event_body:{
			und:[
				{
					summary:data.body.summary,
					value:data.body.value,
					format:data.body.format
				}
			]
		},
		field_event_link:{
			und:[
				{
					title:data.link.title,
					url:data.link.url
				}
			]
		},
		field_tags:{
			und:data.tags
		}
	};
}

/**
 * PROFILE - Converts simplified JSON into the proper format to post to Drupal Services
 * @param  {object} data Simplified JSON object containing node data
 * @return {object}      JSON data in proper format to be posted
 *
 * Simplified structure:
 * 	{
 * 		type:"profile",
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
	var post = {
		type:"profile",
		field_profile_name:{
			und:[
				{
					value:data.name.first
				}
			]
		},
		field_profile_lastname:{
			und:[
				{
					value:data.name.last
				}
			]
		},
		field_profile_role:{
			und:{
				"14":data.role.staff ? 14 : false,
				"15":data.role.faculty ? 15 : false,
				"16":data.role.adjunct_faculty ? 16 : false,
				"17":data.role.sessional ? 17 : false,
				"18":data.role.grad_student ? 18 : false,
				"19":data.role.post_doc ? 19 : false,
				"20":data.role.professor ? 20 : false
			}
		},
		field_profile_category:{
			und:data.tid
		},
		field_profile_summary:{
			und:[
				{
					value:data.summary.body,
					format:data.summary.format
				}
			]
		},
		field_tags:{
			und:data.tags
		}
	};

	for(var field in data.info_fields) {

	}

	return post
}