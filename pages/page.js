import { Selector } from 'testcafe';

module.exports = {
	URL:'/node',
	anon:{},
	auth:{},
	common:{
		breadcrumb:Selector('.breadcrumb', {visibilityCheck:true})
	}
};
