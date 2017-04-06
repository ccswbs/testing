import { Selector } from 'testcafe';

module.exports = {
  URL:'/news',
  anon:{
		errorMessage:Selector('.alert')
	},
  auth:{
    noResults:Selector('div.view-empty'),
    newsListingArea:Selector('div.view-content'),
    newsListingTitle:Selector('h2.media-heading'),
    newsListingTitleLink:Selector('h2.media-heading').find('a'),
    panelsCustomizeButton:Selector('#panels-ipe-customize-page'),
    panelsAddToTop:Selector('#panels-ipe-regionid-top').find('a[title="Add new pane"]'),
    panelsAddToLeft:Selector('#panels-ipe-regionid-left').find('a[title="Add new pane"]'),
    panelsAddToRight:Selector('#panels-ipe-regionid-right').find('a[title="Add new pane"]'),
    panelsAddToMiddle:Selector('#panels-ipe-regionid-middle').find('a[title="Add new pane"]'),
    panelsAddToBottom:Selector('#panels-ipe-regionid-bottom').find('a[title="Add new pane"]'),
	},
	common:{
		pageHeader:Selector('h1.page-header'),
		month:{
			grid:{
				allDayEvent:Selector('td.multi-day').find('a')
			}
		}
	}
}
