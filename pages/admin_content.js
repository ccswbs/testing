import { Selector } from 'testcafe';

module.exports = {
	URL:'/admin/content',
	auth:{
		pageTitle:Selector('h1.page-title'),
		operationSelect:Selector('#edit-operation'),
		operationDeleteOption:Selector('option', { text:'Delete selected content' }),
		updateButton:Selector('#edit-submit--2'),
		confirmDelete:Selector('#edit-submit')
	}
};