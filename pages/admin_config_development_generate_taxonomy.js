import { Selector } from 'testcafe';

module.exports = {
	URL:'/admin/config/development/generate/taxonomy',
	auth:{
		eventCategoryOption:Selector('option').withText('event_category'),
		generateButton:Selector('#edit-submit')
	}
};