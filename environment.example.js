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
		}
		// TODO: add any additional accounts following the pattern above
	},
	// All pages accessed in tests will be appended to the baseURL string
	baseURL:"http://127.0.0.1/test" // TODO: update test site URL
}