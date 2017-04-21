const mysql = require('promise-mysql');

const Env = require('./environment.js');
//const UserPage = require('./pages/user.js');

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