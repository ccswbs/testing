import { Selector } from 'testcafe';

module.exports = {
	URL:function(nid) { return '/node/' + nid; },
	common:{
		upMetaLink:Selector('link[rel="up"]'),
		upLink:Selector('a.page-up')
	}
};