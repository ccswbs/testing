import { Selector } from 'testcafe';

module.exports = {
  common:{
    pageTitle:Selector('h1.page-header'),
    writtenBy:Selector('div.media-meta'),
    crumb:Selector('ol.breadcrumb').find('a').withText('News'),
  }
};
