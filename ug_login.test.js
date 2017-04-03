const Env = require('./environment.js');
const UserPage = require('./pages/user.js');

fixture `UG Login`
	.page(Env.baseURL + UserPage.URL);

test('Test wrong password', async t => {
	await t
		.typeText(UserPage.anon.userInput, Env.creds.admin.username)
		.typeText(UserPage.anon.passInput, Env.creds.admin.password + 'foo')
		.click(UserPage.anon.submitButton)
		.expect(UserPage.anon.errorMessage.innerText).contains('Sorry, unrecognized username or password. Have you forgotten your password?')
		.expect(UserPage.anon.userInput.hasClass('error')).eql(true);
});

test('Test blank password', async t => {
	await t
		.typeText(UserPage.anon.userInput, Env.creds.admin.username)
		.click(UserPage.anon.submitButton)
		.expect(UserPage.anon.errorMessage.innerText).contains('Password field is required.')
		.expect(UserPage.anon.errorMessage.innerText).contains('Sorry, unrecognized username or password. Have you forgotten your password?')
});

test('Test successful login', async t => {
	await t
		.typeText(UserPage.anon.userInput, Env.creds.admin.username)
		.typeText(UserPage.anon.passInput, Env.creds.admin.password)
		.click(UserPage.anon.submitButton)
		.expect(UserPage.auth.pageHeader.innerText).eql(Env.creds.admin.username);
});