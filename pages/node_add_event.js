import { Selector } from 'testcafe';

module.exports = {
	URL:'/node/add/event',
	auth:{
		pageTitle:Selector('h1.page-title'),
		titleInput:Selector('#edit-title'),
		categorySelect:Selector('#edit-field-event-category-und'),
		categoryFirstOption:Selector('#edit-field-event-category-und').find('option').nth(1),
		allDayCheck:Selector('#edit-field-event-date-und-0-all-day'),
		startDateInput:Selector('#edit-field-event-date-und-0-value-datepicker-popup-0'),
		endDateInput:Selector('#edit-field-event-date-und-0-value2-datepicker-popup-0'),
		saveButton:Selector('#edit-submit')
	}
};