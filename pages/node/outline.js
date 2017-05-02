import { Selector } from 'testcafe';

module.exports = {
	URL:function(nid) { return '/node/' + nid + '/outline'; },
	auth:{
		bookSelect:Selector('#edit-book-bid'),
		newBookOption:Selector('#edit-book-bid').find('option').withText('<create a new book>'),
		saveButton:Selector('#edit-update')
	}
};