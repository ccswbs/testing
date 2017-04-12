import { Selector } from 'testcafe';

module.exports = {
  URL:'/node/add/news',
  auth:{
    pageTitle:Selector('h1.page-title'),
    titleInput:Selector('#edit-title'),
    categorySelect:Selector('#edit-field-news-tags-und'),
    writtenBy:Selector('#edit-field-news-writer-und-0-value'),
    externalLink:Selector('#edit-field-news-link-und-0-url'),
    keywords:Selector('#edit-field-tags-und'),
    saveButton:Selector('#edit-submit'),
    wysiwyg:Selector('iframe.cke_wysiwyg'),
    urlSettings:Selector('a').withText('URL path settings'),
    autoURLCheck:Selector('#edit-path-pathauto')
  }
}
