import { Selector } from 'testcafe';

module.exports = {
  common:{
    crumb:Selector('ol.breadcrumb').find('a').withText('FAQ'),
    pageTitle:Selector('h1.page-header')
  }
};
