import { Selector } from 'testcafe';

module.exports = {
  URL:'/node/add/faq',
  auth:{
    pageTitle:Selector('h1.page-title'),
    questionInput:Selector('#edit-title'),
    iframe:Selector('iframe.cke_wysiwyg_frame'),
    answer:Selector('body.cke_editable'),
    saveButton:Selector('#edit-submit'),
    urlSettings:Selector('a').withText('URL path settings'),
    autoURLCheck:Selector('#edit-path-pathauto')

  }
}
