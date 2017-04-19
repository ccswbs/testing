import { Selector } from 'testcafe';

module.exports = {
  URL:'/services',
  common:{
    crumb:Selector('ol.breadcrumb').find('a').withText('Services'),
    pageTitle:Selector('h1.page-header')
  }
};
