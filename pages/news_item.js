import { Selector } from 'testcafe';

module.exports = {
  auth:{
    pageTitle:Selector('h1.page-header'),
    writtenBy:Selector('div.media-meta')
  }
}
