import { Selector } from 'testcafe';

module.exports = {
	URL:'/faq',
	anon:{
		errorMessage:Selector('.alert')
	},
	auth:{

	},
	common:{
		pageHeader:Selector('h1.page-header'),
		relatedKeywords:Selector('.view-f4 .view-content'),
		breadcrumb:Selector('.breadcrumb')
	}
};