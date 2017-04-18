import { Selector } from 'testcafe';

module.exports = {
	URL:'/admin/structure/taxonomy/event_category/add',
	auth:{
		pageTitle:Selector('h1.page-title'),
		nameInput:Selector('#edit-name'),
		saveButton:Selector('#edit-submit')
	}
};