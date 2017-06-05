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
		pp1Link:Selector('a').find('span').withText('View: PP1 - Listing page for multiple people profiles'),
		pp6Link:Selector('a').find('span').withText('View: PP6 Custom Listing'),
		pp1BLink:Selector('a').find('span').withText('View: PP1B - Listing page (grid view)'),
		pp5Link:Selector('a').find('span').withText('View: PP5 - People profile listing filtered by keyword'),
		pp1NoPicturesLink:Selector('a').find('span').withText('View: PP1 - Listing page for multiple people profiles: No pictures'),
		pp5NoPicturesLink:Selector('a').find('span').withText('View: PP5 - People profile listing filtered by keyword: No pictures'),
		smallImageCheck:Selector('#edit-fields-override-field-profile-image'),
		largeImageCheck:Selector('#edit-fields-override-field-profile-image-1'),
		alignNamesCheck:Selector('#edit-fields-override-field-profile-align-names'),
		finishButton:Selector('#edit-return'),
		panelsSaveButton:Selector('#panels-ipe-save', { visibilityCheck:true }),
		pp6DeleteButton:Selector('.panels-ipe-dragbar-admin-title').withText('View: PP6 Custom Listing').prevSibling(0).find('.delete').find('a'),
		pp1NoPicturesDeleteButton:Selector('.panels-ipe-dragbar-admin-title').withText('View: PP1 - Listing page for multiple people profiles: No pictures').prevSibling(0).find('.delete').find('a'),
		pp1BDeleteButton:Selector('.panels-ipe-dragbar-admin-title').withText('View: PP1B - Listing page (grid view)').prevSibling(0).find('.delete').find('a'),
		pp5DeleteButton:Selector('.panels-ipe-dragbar-admin-title').withText('View: PP5 - People profile listing filtered by keyword').prevSibling(0).find('.delete').find('a'),
		pp5NoPicturesDeleteButton:Selector('.panels-ipe-dragbar-admin-title').withText('View: PP5 - People profile listing filtered by keyword: No pictures').prevSibling(0).find('.delete').find('a'),
		pp1DeleteButton:Selector('.panels-ipe-dragbar-admin-title').withText('View: PP1 - Listing page for multiple people profiles').prevSibling(0).find('.delete').find('a'),

	},
	common:{
		pageHeader:Selector('h1.page-header'),
		viewFilters:Selector('.views-exposed-form'),
		roleFilter:Selector('#edit-field-profile-role-tid'),
		relatedKeywords:Selector('.view-pp4 .view-content'),
		searchByLastNameBox:Selector('#edit-field-profile-lastname-value'),
		searchByLastNameBoxPP5:Selector('#edit-field-profile-lastname-value-1'),
		ppSearchButton:Selector('button').withText('Apply'),
		listingArea:Selector('div.view-content'),
		noResults:Selector('div.view-empty'),
		breadcrumb:Selector('.breadcrumb')
	}
};
