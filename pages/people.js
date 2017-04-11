import { Selector } from 'testcafe';

module.exports = {
	URL:'/people',
	anon:{
		errorMessage:Selector('.alert')
	},
	auth:{
		panelsCustomizeButton:Selector('#panels-ipe-customize-page'),
		panelsAddToLeft:Selector('#panels-ipe-regionid-left').find('a[title="Add new pane"]'),
		viewPanesLink:Selector('a').withText('View panes'),
		pp6Link:Selector('a').find('span').withText('View: PP6 Custom Listing'),
		smallImageCheck:Selector('#edit-fields-override-field-profile-image'),
		largeImageCheck:Selector('#edit-fields-override-field-profile-image-1'),
		alignNamesCheck:Selector('#edit-fields-override-field-profile-align-names'),
		finishButton:Selector('#edit-return'),
		panelsSaveButton:Selector('#panels-ipe-save', { visibilityCheck:true }),
		pp6DeleteButton:Selector('.panels-ipe-dragbar-admin-title').withText('View: PP6 Custom Listing').prevSibling(0).find('.delete').find('a')
	},
	common:{
		pageHeader:Selector('h1.page-header'),
		viewFilters:Selector('.views-exposed-form'),
		roleFilter:Selector('#edit-field-profile-role-tid')
	}
};