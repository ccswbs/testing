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
		pp1:{
			selectViewPane:Selector('a').find('span').withText('View: PP1 - Listing page for multiple people profiles'),
			deleteButton:Selector('.panels-ipe-dragbar-admin-title').withText('View: PP1 - Listing page for multiple people profiles').prevSibling(0).find('.delete').find('a'),
		},
		pp6:{
			selectViewPane:Selector('a').find('span').withText('View: PP6 Custom Listing'),
			deleteButton:Selector('.panels-ipe-dragbar-admin-title').withText('View: PP6 Custom Listing').prevSibling(0).find('.delete').find('a'),
			editButton:Selector('.panels-ipe-dragbar-admin-title').withText('View: PP6 Custom Listing').prevSibling(0).find('.edit').find('a'),
		},
		pp7:{
			selectViewPane:Selector('a').find('span').withText('View: PP7 - People profile teaser list'),
			paneTitle:Selector('.pane-pp7-panel-pane-1').find('.pane-title'),
			paneMoreButton:Selector('.pane-pp7-panel-pane-1').find('.view-content').nextSibling('.btn-group').find('a'),
			deleteButton:Selector('.panels-ipe-dragbar-admin-title').withText('View: PP7 - People profile teaser list').prevSibling(0).find('.delete').find('a'),
			editButton:Selector('.panels-ipe-dragbar-admin-title').withText('View: PP7 - People profile teaser list').prevSibling(0).find('.edit').find('a'),
			editItemsPerPage:Selector('#edit-items-per-page'),
			editFilterByTermID:Selector('#edit-arguments-tid'),
			editMoreButtonTextfield:Selector('#edit-more-text'),
		}
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
		resultOne:Selector('div.views-row-1'),
		resultTwo:Selector('div.views-row-2'),
		resultThree:Selector('div.views-row-3'),
		pp6:{
			viewPane:Selector('.view-id-pp6'),
			paneTitle:Selector('.view-id-pp6').find('.media-heading').find('a'),
			paneTeaser:Selector('.view-id-pp6').find('.media-teaser'),
			paneSummary:Selector('.view-id-pp6').find('.media-summary').find('p'),
		},
		pp7:{
			viewPane:Selector('.view-id-pp7'),
		}
	}
};
