import { Selector } from 'testcafe';

module.exports = {
	URL:'/events',
	anon:{
		errorMessage:Selector('.alert')
	},
	auth:{
		
	},
	common:{
		pageHeader:Selector('h1.page-header'),
		month:{
			grid:{
				allDayEvent:Selector('td.multi-day').find('a')
			}
		},
		relatedKeywords:Selector('.view-e6 .view-content')
	}
};