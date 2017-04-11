import { Selector } from 'testcafe';

module.exports = {
	URL:'/admin/structure/taxonomy/service_audience',
	auth:{
		editButton:Selector('a').withText('edit'),
    deleteButton:Selector('#edit-delete'),
    confirmDelete:Selector('#edit-submit')

	}
};
