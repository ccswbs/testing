// environment.example.js

module.exports = {
	// Store any credentials that may be used in tests in this object
	creds:{
		admin:{
			username:"admin", // TODO: update "admin" string to admin's username
			password:"password" // TODO: update "password" string to admin's password
		},
		author:{
			username:"author", // TODO: update "author" string to author's username
			password:"password" // TODO: update "password" string to author's password
		},
		db:{
			username:"mysql_admin", // TODO: update "mysql_admin" string to MySQL username
			password:"password", // TODO: update "password" string to MySQL password
			database:"testdb" // TODO: update "testdb" string to MySQL database name for your test site
		}
		// TODO: add any additional accounts following the pattern above
	},
	// All pages accessed in tests will be appended to the baseURL string
	baseURL:"http://127.0.0.1/test" // TODO: update test site URL
}