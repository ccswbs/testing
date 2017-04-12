import { Selector } from 'testcafe';

module.exports = {
  URL:'/node/add/service',
  auth:{
    pageTitle:Selector('h1.page-title'),
    titleInput:Selector('#edit-title'),
    serviceCategory:Selector('#edit-field-service-keywords'),
    saveButton:Selector('#edit-submit'),
    categorySelect:Selector('#edit-field-service-category-und'),
    testCategorySelect:Selector('option', { text:'Test Category' }),
    urlSettings:Selector('a').withText('URL path settings'),
    autoURLCheck:Selector('#edit-path-pathauto')

  }
}
