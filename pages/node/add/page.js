import { Selector } from 'testcafe';

module.exports = {
	URL:'/node/add/profile',
	auth:{
		pageTitle:Selector('h1.page-title'),
		enableMenuCheck:Selector('#edit-menu-enabled'),
		menuParentSelect:Selector('#edit-menu-parent'),
		saveButton:Selector('#edit-submit'),
		deleteButton:Selector('#edit-delete', {visibilityCheck:true}),
		confirmDeleteButton:Selector('#edit-submit') // Note: this is the same as the 'saveButton' but under a different name for context
	}
};