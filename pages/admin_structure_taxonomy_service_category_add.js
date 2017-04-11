import { Selector } from 'testcafe';

module.exports = {
  URL: '/admin/structure/taxonomy/service_category/add',
  auth:{
    nameInput:Selector('#edit-name'),
    saveButton:Selector('#edit-submit'),
  }
}
