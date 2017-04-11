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
		'op':'Save'
	};

	Authenticate(function(cookie) {
		// Make GET request to form page and append cookies to this request:
		request.post({url:'http://localhost/isstest/node/add/profile', headers:{'cookie':cookie}, form:data}, function(err, res, body) {
			if(err) {
				console.log(err);
				return false;
			}
			console.log(body);
		})
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