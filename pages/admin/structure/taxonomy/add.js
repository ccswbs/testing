import { Selector } from 'testcafe';

module.exports = {
	URL:function(name) { return '/admin/structure/taxonomy/' + name + '/add'; },
	auth:{
		pageTitle:Selector('h1.page-title'),
		nameInput:Selector('#edit-name'),
		saveButton:Selector('#edit-submit')
	}
};