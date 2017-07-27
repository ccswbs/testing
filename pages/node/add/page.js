import { Selector } from 'testcafe';

module.exports = {
	URL:'/node/add/profile',
	auth:{
		pageTitle:Selector('h1.page-title'),
		enableMenuCheck:Selector('label', {visibilityCheck:true}).withAttribute('for', 'edit-menu-enabled'),
		menuParentSelect:Selector('#edit-menu-parent', {visibilityCheck:true, timeout:5000}),
		saveButton:Selector('#edit-submit', {visibilityCheck:true}),
		deleteButton:Selector('#edit-delete', {visibilityCheck:true}),
		confirmDeleteButton:Selector('#edit-submit') // Note: this is the same as the 'saveButton' but under a different name for context
	}
};
