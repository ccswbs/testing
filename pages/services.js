import { Selector } from 'testcafe';

module.exports = {
	URL:'/services',
	anon:{},
	auth:{},
	common:{
		breadcrumb:Selector('.breadcrumb')
	}
};