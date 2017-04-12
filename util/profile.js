var Util = require('../utils.js');
var Env = require('../environment.js');

var qs = require('querystring');
var request = require('request');

module.exports = {
	CreateProfile:function(values) {
		var name = Util.RandomName(4, 10);
		var lastname = Util.RandomName(4, 10);

		var options = {
			host:'127.0.0.1',
			port:'80',
			path:'/isstest/user/login',
			method:'POST'
		};

		var data = qs.stringify({
			'name':Env.creds.admin.username,
			'password':Env.creds.admin.password,
			'form_id':'user_login',
			'op':'Log in'
		});

		var req = http.request(options, function(res) {
			console.log(res.statusCode);
			console.log('HEADERS:' + JSON.stringify(res.headers));

			console.log("COOKIE:" + res.headers['set-cookie']);
		});
	}
};

function CreateProfile(values) {
	var name = Util.RandomName(4, 10);
	var lastname = Util.RandomName(4, 10);

	// TODO: Fill out all fields in the profile form
	var data = {
		'field_profile_name[und][0][value]':name,
		'field_profile_lastname[und][0][value]':lastname,
		'form_id':'profile_node_form',
		'field_profile_unit[und]':'_none',
		'field_profile_summary[und][0][value]':'',
		'field_profile_summary[und][0][format]':'filtered_html',
		'field_profile_category[und]':'_none',
		'field_profile_title[und][0][value]':'',
		'field_profile_subunit[und]':'_none',
		'field_profile_research[und]':'_none',
		'files[field_profile_attachments_und_0]':null,
		'field_profile_attachments[und][0][_weight]':0,
		'field_profile_attachments[und][0][fid]':0,
		'field_profile_attachments[und][0][display]':1,
		'files[field_profile_image_und_0]':null,
		'field_profile_image[und][0][fid]':0,
		'field_profile_image[und][0][display]':1,
		'field_profile_address[und][0][value]':'',
		'field_profile_email[und][0][value]':'',
		'field_profile_telephonenumber[und][0][value]':'',
		'field_profile_faxnumber[und][0][value]':'',
		'field_profile_office[und][0][value]':'',
		'field_profile_lab[und][0][value]':'',
		'field_profile_website[und][0][title]':'',
		'field_profile_website[und][0][url]':'',
		'field_profile_custom[und][0][field_profile_custom_label][und]':'_none',
		'field_profile_custom[und][0][field_profile_custom_content][und][0][value]':'',
		'field_profile_custom[und][0][_weight]':0,
		'field_profile_multipart[und][0][field_profile_heading][und]':'_none',
		'field_profile_multipart[und][0][field_profile_content][und][0][value]':'',
		'field_profile_multipart[und][0][field_profile_content][und][0][format]':'filtered_html',
		'field_profile_multipart[und][0][_weight]':0,
		'field_tags[und]':'',
		'menu[link_title]':'main-menu:0',
		'menu[weight]':0,
		'log':'',
		'path[pathauto]':1,
		'print_html_display':1,
		'print_html_display_urllist':1,
		'print_pdf_display':1,
		'print_pdf_display_urllist':1,
		'print_pdf_size':'',
		'print_pdf_orientation':'',
		'metatags[und][title][value]':'[node:title] | [current-page:pager][site:name]',
		'metatags[und][title][default]':'[node:title] | [current-page:pager][site:name]',
		'metatags[und][description][value]':'',
		'metatags[und][description][default]':'',
		'metatags[und][abstract][value]':'',
		'metatags[und][abstract][default]':'',
		'metatags[und][keywords][value]':'',
		'metatags[und][keywords][default]':'',
		'metatags[und][robots][default]':'0 0 0 0 0 0 0 0 0 0',
		'metatags[und][news_keywords][value]':'',
		'metatags[und][news_keywords][default]':'',
		'metatags[und][standout][value]':'',
		'metatags[und][standout][default]':'',
		'metatags[und][rating][value]':'',
		'metatags[und][rating][default]':'',
		'metatags[und][referrer][value]':'',
		'metatags[und][referrer][default]':'',
		'metatags[und][rights][value]':'',
		'metatags[und][rights][default]':'',
		'metatags[und][image_src][value]':'',
		'metatags[und][image_src][default]':'',
		'metatags[und][canonical][value]':'[current-page:url:absolute]',
		'metatags[und][canonical][default]':'[current-page:url:absolute]',
		'metatags[und][shortlink][value]':'[current-page:url:unaliased]',
		'metatags[und][shortlink][default]':'[current-page:url:unaliased]',
		'metatags[und][original-source][value]':'',
		'metatags[und][original-source][default]':'',
		'metatags[und][prev][value]':'',
		'metatags[und][prev][default]':'',
		'metatags[und][next][value]':'',
		'metatags[und][next][default]':'',
		'metatags[und][content-language][value]':'',
		'metatags[und][content-language][default]':'',
		'metatags[und][geo.position][value]':'',
		'metatags[und][geo.position][default]':'',
		'metatags[und][geo.placename][value]':'',
		'metatags[und][geo.placename][default]':'',
		'metatags[und][geo.region][value]':'',
		'metatags[und][geo.region][default]':'',
		'metatags[und][icbm][value]':'',
		'metatags[und][icbm][default]':'',
		'metatags[und][refresh][value]':'',
		'metatags[und][refresh][default]':'',
		'metatags[und][revisit-after][value]':'',
		'metatags[und][revisit-after][period]':'',
		'metatags[und][revisit-after][default]':'',
		'metatags[und][pragma][value]':'',
		'metatags[und][pragma][default]':'',
		'metatags[und][cache-control][value]':'',
		'metatags[und][cache-control][default]':'',
		'metatags[und][expires][value]':'',
		'metatags[und][expires][default]':'',
		'metatags[und][twitter:card][value]':'summary',
		'metatags[und][twitter:card][default]':'summary',
		'metatags[und][twitter:creator][value]':'',
		'metatags[und][twitter:creator][default]':'',
		'metatags[und][twitter:creator:id][value]':'',
		'metatags[und][twitter:creator:id][default]':'',
		'metatags[und][twitter:url][value]':'[current-page:url:absolute]',
		'metatags[und][twitter:url][default]':'[current-page:url:absolute]',
		'metatags[und][twitter:title][value]':'[node:title]',
		'metatags[und][twitter:title][default]':'[node:title]',
		'metatags[und][twitter:description][value]':'[node:field_profile_summary]',
		'metatags[und][twitter:description][default]':'[node:field_profile_summary]',
		'metatags[und][twitter:image][value]':'[node:field_profile_image]',
		'metatags[und][twitter:image][default]':'[node:field_profile_image]',
		'metatags[und][twitter:image:width][value]':'',
		'metatags[und][twitter:image:width][default]':'',
		'metatags[und][twitter:image:height][value]':'',
		'metatags[und][twitter:image:height][default]':'',
		'metatags[und][twitter:image:alt][value]':'',
		'metatags[und][twitter:image:alt][default]':'',
		'metatags[und][twitter:image0][value]':'',
		'metatags[und][twitter:image0][default]':'',
		'metatags[und][twitter:image1][value]':'',
		'metatags[und][twitter:image1][default]':'',
		'metatags[und][twitter:image2][value]':'',
		'metatags[und][twitter:image2][default]':'',
		'metatags[und][twitter:image3][value]':'',
		'metatags[und][twitter:image3][default]':'',
		'metatags[und][twitter:player][value]':'',
		'metatags[und][twitter:player][default]':'',
		'metatags[und][twitter:player:width][value]':'',
		'metatags[und][twitter:player:width][default]':'',
		'metatags[und][twitter:player:height][value]':'',
		'metatags[und][twitter:player:height][default]':'',
		'metatags[und][twitter:player:stream][value]':'',
		'metatags[und][twitter:player:stream][default]':'',
		'metatags[und][twitter:player:stream:content_type][value]':'',
		'metatags[und][twitter:player:stream:content_type][default]':'',
		'metatags[und][twitter:app:country][value]':'',
		'metatags[und][twitter:app:country][default]':'',
		'metatags[und][twitter:app:name:iphone][value]':'',
		'metatags[und][twitter:app:name:iphone][default]':'',
		'metatags[und][twitter:app:id:iphone][value]':'',
		'metatags[und][twitter:app:id:iphone][default]':'',
		'metatags[und][twitter:app:url:iphone][value]':'',
		'metatags[und][twitter:app:url:iphone][default]':'',
		'metatags[und][twitter:app:name:ipad][value]':'',
		'metatags[und][twitter:app:name:ipad][default]':'',
		'metatags[und][twitter:app:id:ipad][value]':'',
		'metatags[und][twitter:app:id:ipad][default]':'',
		'metatags[und][twitter:app:url:ipad][value]':'',
		'metatags[und][twitter:app:url:ipad][default]':'',
		'metatags[und][twitter:app:name:googleplay][value]':'',
		'metatags[und][twitter:app:name:googleplay][default]':'',
		'metatags[und][twitter:app:id:googleplay][value]':'',
		'metatags[und][twitter:app:id:googleplay][default]':'',
		'metatags[und][twitter:app:url:googleplay][value]':'',
		'metatags[und][twitter:app:url:googleplay][default]':'',
		'metatags[und][twitter:label1][value]':'',
		'metatags[und][twitter:label1][default]':'',
		'metatags[und][twitter:data1][value]':'',
		'metatags[und][twitter:data1][default]':'',
		'metatags[und][twitter:label2][value]':'',
		'metatags[und][twitter:label2][default]':'',
		'metatags[und][twitter:data2][value]':'',
		'metatags[und][twitter:data2][default]':'',
		'name':'admin',
		'date':'',
		'user_mode':'448',
		'rid':'0',
		'group_mode':'48',
		'other_mode':'4',
		'status':'1',
		'additional_settings__active_tab':'edit-menu',
		'op':'Save'
	};

	Authenticate(function(cookie) {
		request({url:'http://localhost/isstest/node/add/profile', headers:{'cookie':cookie}}, function(err, res, body) {
			console.log(res.headers);

			// Make GET request to form page and append cookies to this request:
			request.post({url:'http://localhost/isstest/node/add/profile', headers:{'cookie':cookie}, form:data}, function(err, res, body) {
				if(err) {
					console.log(err);
					return false;
				}
				console.log(body);
			});
		});
		
	});
}

function Authenticate(callback) {
	var options = {
		host:'localhost',
		port:'80',
		path:'/isstest/user/login',
		method:'POST',
		timeout:5000
	};

	var data = {
		'name':Env.creds.admin.username,
		'pass':Env.creds.admin.password,
		'form_id':'user_login',
		'op':'Log in'
	};

	request.post({url:'http://localhost/isstest/user/login', form:data}, function(err, res, body) {
		if(err) {
			console.log(err);
			return false;
		}
		callback(res.headers['set-cookie'][0]);
	});
}

CreateProfile({});