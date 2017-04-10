const Env = require('./environment.js');
const Util = require('./utils.js');
const NewsPage = require('./pages/news.js');
const AddNewsPage = require('./pages/node_add_news.js');
const UserPage = require('./pages/user.js');
const NewsListing = require('./pages/news_item.js');

fixture `UG News`
	.page(Env.baseURL + UserPage.URL);

test('Event listing page test', async t => {
	await t
		// Login
		.typeText(UserPage.anon.userInput, Env.creds.admin.username)
		.typeText(UserPage.anon.passInput, Env.creds.admin.password)
		.click(UserPage.anon.submitButton)
		// Ensure login successful
		.expect(UserPage.auth.pageHeader.innerText).eql(Env.creds.admin.username)
		// Create news item
		.navigateTo(Env.baseURL + AddNewsPage.URL)
		.typeText(AddNewsPage.auth.titleInput, 'Test News')
		.typeText(AddNewsPage.auth.writtenBy, 'Test Author')
		.click(AddNewsPage.auth.saveButton)
		// Navigate to news listing page
		.navigateTo(Env.baseURL + NewsPage.URL)
		// Ensure created news item is listed
		.expect(NewsPage.common.newsListingTitle.innerText).eql('Test News')
		// Click into news item
		.click(NewsPage.common.newsListingTitleLink)
		// Ensure fields entered when created exsist
		.expect(NewsListing.common.pageTitle.innerText).eql('Test News')
		.expect(NewsListing.common.writtenBy.innerText).contains('Test Author')
});
