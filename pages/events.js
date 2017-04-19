import { Selector } from 'testcafe';

module.exports = {
	URL:'/events',
	anon:{
		errorMessage:Selector('.alert')
	},
	auth:{

	},
	common:{
		crumb:Selector('ol.breadcrumb').find('a').withText('Events'),
    pageTitle:Selector('h1.page-header'),
		pageHeader:Selector('h1.page-header'),
		month:{
			grid:{
				allDayEvent:Selector('td.multi-day').find('a')
			}
		}
	}
};
