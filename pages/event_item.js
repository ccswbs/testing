import { Selector } from 'testcafe';

module.exports = {
  common:{
    crumb:Selector('ol.breadcrumb').find('a').withText('Events'),
    pageTitle:Selector('h1.page-header')
  }
};
