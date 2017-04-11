import { Selector } from 'testcafe';

module.exports = {
	URL:'/node/add/profile',
	auth:{
		pageTitle:Selector('h1.page-title'),
		nameInput:Selector('#edit-field-profile-name-und-0-value'),
		lastNameInput:Selector('#edit-field-profile-lastname-und-0-value'),
		emailInput:Selector('#edit-field-profile-email-und-0-value'),
		phoneInput:Selector('#edit-field-profile-telephonenumber-und-0-value'),
		saveButton:Selector('#edit-submit'),
		adjunctFacultyRoleCheck:Selector('#edit-field-profile-role-und-16')
	}
};