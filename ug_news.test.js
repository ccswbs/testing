const Env = require('./environment.js');
const Util = require('./util.js');
const NewsPage = require('./pages/news.js');
const AddNewsPage = require('./pages/node_add_news.js');
const UserPage = require('./pages/user.js');

fixture `UG News`
	.page(Env.baseURL + UserPage.URL);

test('Create event test', async t => {
	await t
		//Login
		.typeText(UserPage.anon.userInput, Env.creds.admin.username)
		.typeText(UserPage.anon.passInput, Env.creds.admin.password)
		
});
