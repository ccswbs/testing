import { Selector } from 'testcafe';

module.exports = {
	URL:'/node/add/event',
	auth:{
		pageTitle:Selector('h1.page-title'),
		titleInput:Selector('#edit-title'),
		allDayCheck:Selector('#edit-field-event-date-und-0-all-day'),
		saveButton:Selector('#edit-submit'),
		urlSettings:Selector('a').withText('URL path settings'),
    autoURLCheck:Selector('#edit-path-pathauto')
	}
};
