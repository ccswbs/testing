import { Selector } from 'testcafe';

module.exports = {
	URL:function(tid) { return '/taxonomy/term/' + tid + '/edit'; },
	auth:{
		pageTitle:Selector('h1.page-title'),
		nameInput:Selector('#edit-name'),
		saveButton:Selector('#edit-submit'),
		deleteButton:Selector('#edit-delete'),
		confirmDeleteButton:Selector('#edit-submit') // Repeat for better naming
	}
};