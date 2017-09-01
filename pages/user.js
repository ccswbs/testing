import { Selector } from 'testcafe';

module.exports = {
	URL:'/user',
	anon:{
		userInput:Selector('#edit-name'),
		passInput:Selector('#edit-pass'),
		submitButton:Selector('#edit-submit'),
		errorMessage:Selector('.alert')
	},
	auth:{
		pageHeader:Selector('h1.page-header'),
		logOut:Selector('#toolbar-user').find('.logout').find('a')
	}
};