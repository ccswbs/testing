import { Selector } from 'testcafe';

module.exports = {
	URL:'/admin/structure/pages',
	auth:{
		revertTab:Selector('#page-manager-operation-delete').withText('Revert'),
		revertButton:Selector('input[value="Revert"]'),
		people:{
			filteredByTag:Selector('tr.page-task-people').find('a').withText('Edit'),
		}
	}
};