const Env = require('./environment.js');
const Util = require('./utils.js');
const AddFAQPage = require('./pages/node_add_faq.js');
const AddServicePage = require('./pages/node_add_services.js');
const UserPage = require('./pages/user.js');
const AddEventPage = require('./pages/node_add_event.js');
const AddNewsPage = require('./pages/node_add_news.js');
const AddServiceCategory = require('./pages/admin_structure_taxonomy_service_category_add.js');
const AddServiceAudience = require('./pages/admin_structure_taxonomy_service_audience_add.js');
const ListServiceAudience = require('./pages/admin_structure_taxonomy_service_audience.js')
const ListServiceCategory = require('./pages/admin_structure_taxonomy_service_category.js')
const AdminContentPage = require('./pages/admin_content.js');
const FAQPage = require('./pages/faq.js');
const NewsPage = require('./pages/news.js');
const ServicePage = require('./pages/service.js');
const EventPage = require('./pages/events.js');
import { Selector } from 'testcafe';

fixture `UG Breadcrumb`
  .page(Env.baseURL + UserPage.URL);

  test('Services breadcrumb test', async t => {
    await t
      // Login
      .typeText(UserPage.anon.userInput, Env.creds.admin.username)
  		.typeText(UserPage.anon.passInput, Env.creds.admin.password)
  		.click(UserPage.anon.submitButton)
      // Ensure login successful
      .expect(UserPage.auth.pageHeader.innerText).eql(Env.creds.admin.username)
      // Create category for service
      .navigateTo(Env.baseURL + AddServiceCategory.URL)
      .typeText(AddServiceCategory.auth.nameInput, 'Test Category')
      .click(AddServiceCategory.auth.saveButton)
      // Create audience for service
      .navigateTo(Env.baseURL + AddServiceAudience.URL)
      .typeText(AddServiceAudience.auth.nameInput, 'Test Audience')
      .click(AddServiceAudience.auth.saveButton)
      //Create service
      .navigateTo(Env.baseURL + AddServicePage.URL)
      .typeText(AddServicePage.auth.titleInput, 'Test Service')
      .click(AddServicePage.auth.categorySelect)
      .click(AddServicePage.auth.testCategorySelect)
      // Turn off automatic URL generation
      .click(AddServicePage.auth.urlSettings)
      .click(AddServicePage.auth.autoURLCheck)
      .click(AddServicePage.auth.saveButton)
      // Ensure crumb is on page by clicking
      .navigateTo(Env.baseURL + AdminContentPage.URL)
      .click(await Selector('a').withText('Test Service'))
      .click(ServicePage.common.crumb)

      //Delete service
      .navigateTo(Env.baseURL + AdminContentPage.URL)
      .click(await Selector('label').withText('Test Service').nextSibling())
  		.click(AdminContentPage.auth.operationSelect)
  		.click(AdminContentPage.auth.operationDeleteOption)
  		.click(AdminContentPage.auth.updateButton)
  		.click(AdminContentPage.auth.confirmDelete)

      // Do it again with URL alias on
      //Create service
      .navigateTo(Env.baseURL + AddServicePage.URL)
      .typeText(AddServicePage.auth.titleInput, 'Test Service')
      .click(AddServicePage.auth.categorySelect)
      .click(AddServicePage.auth.testCategorySelect)
      .click(AddServicePage.auth.saveButton)
      // Ensure crumb is on page by clicking
      .navigateTo(Env.baseURL + AdminContentPage.URL)
      .click(await Selector('a').withText('Test Service'))
      .click(ServicePage.common.crumb)
      //Delete service
      .navigateTo(Env.baseURL + AdminContentPage.URL)
      .click(await Selector('label').withText('Test Service').nextSibling())
      .click(AdminContentPage.auth.operationSelect)
      .click(AdminContentPage.auth.operationDeleteOption)
      .click(AdminContentPage.auth.updateButton)
      .click(AdminContentPage.auth.confirmDelete)

      //Delete taxonomy information
      .navigateTo(Env.baseURL + ListServiceAudience.URL)
      .click(ListServiceAudience.auth.editButton)
      .wait(500)
      .click(ListServiceAudience.auth.deleteButton)
      .wait(500)
      .click(ListServiceAudience.auth.confirmDelete)
      .navigateTo(Env.baseURL + ListServiceCategory.URL)
      .click(ListServiceCategory.auth.editButton)
      .wait(500)
      .click(ListServiceCategory.auth.deleteButton)
      .wait(500)
      .click(ListServiceCategory.auth.confirmDelete)

  });

test('FAQ breadcrumb test', async t => {
  await t
    // Login
    .typeText(UserPage.anon.userInput, Env.creds.admin.username)
		.typeText(UserPage.anon.passInput, Env.creds.admin.password)
		.click(UserPage.anon.submitButton)
    // Ensure login successful
    .expect(UserPage.auth.pageHeader.innerText).eql(Env.creds.admin.username)
    // Create FAQ
    .navigateTo(Env.baseURL + AddFAQPage.URL)
    .typeText(AddFAQPage.auth.questionInput, 'Test Question')
    .switchToIframe(AddFAQPage.auth.iframe)
    .typeText(AddFAQPage.auth.answer, 'Test Answer')
    .switchToMainWindow()
    // Turn off automatic URL generation
    .click(AddFAQPage.auth.urlSettings)
    .click(AddFAQPage.auth.autoURLCheck)
    .click(AddFAQPage.auth.saveButton)
    // Ensure is on page by clicking
    .navigateTo(Env.baseURL + AdminContentPage.URL)
    .click(await Selector('a').withText('Test Question'))
    .click(FAQPage.common.crumb)
    //Delete FAQ
    .navigateTo(Env.baseURL + AdminContentPage.URL)
    .click(await Selector('label').withText('Test Question').nextSibling())
    .click(AdminContentPage.auth.operationSelect)
    .click(AdminContentPage.auth.operationDeleteOption)
    .click(AdminContentPage.auth.updateButton)
    .click(AdminContentPage.auth.confirmDelete)

    // Do it again with URL alias on
    // Create FAQ
    .navigateTo(Env.baseURL + AddFAQPage.URL)
    .typeText(AddFAQPage.auth.questionInput, 'Test Question')
    .switchToIframe(AddFAQPage.auth.iframe)
    .typeText(AddFAQPage.auth.answer, 'Test Answer')
    .switchToMainWindow()
    .click(AddFAQPage.auth.saveButton)
    // Ensure is on page by clicking
    .navigateTo(Env.baseURL + AdminContentPage.URL)
    .click(await Selector('a').withText('Test Question'))
    .click(FAQPage.common.crumb)
    //Delete FAQ
    .navigateTo(Env.baseURL + AdminContentPage.URL)
    .click(await Selector('label').withText('Test Question').nextSibling())
    .click(AdminContentPage.auth.operationSelect)
    .click(AdminContentPage.auth.operationDeleteOption)
    .click(AdminContentPage.auth.updateButton)
    .click(AdminContentPage.auth.confirmDelete);
});

test('News breadcrumb test', async t => {
  await t
    // Login
    .typeText(UserPage.anon.userInput, Env.creds.admin.username)
		.typeText(UserPage.anon.passInput, Env.creds.admin.password)
		.click(UserPage.anon.submitButton)
    // Ensure login successful
    .expect(UserPage.auth.pageHeader.innerText).eql(Env.creds.admin.username)
    // Create news item
		.navigateTo(Env.baseURL + AddNewsPage.URL)
		.typeText(AddNewsPage.auth.titleInput, 'Test News')
		.typeText(AddNewsPage.auth.writtenBy, 'Test Author')
    // Turn off automatic URL generation
    .click(AddNewsPage.auth.urlSettings)
    .click(AddNewsPage.auth.autoURLCheck)
		.click(AddNewsPage.auth.saveButton)
    // Ensure is on page by clicking
    .navigateTo(Env.baseURL + AdminContentPage.URL)
    .click(await Selector('a').withText('Test News'))
    .click(NewsPage.common.crumb)
    //Delete News
    .navigateTo(Env.baseURL + AdminContentPage.URL)
    .click(await Selector('label').withText('Test News').nextSibling())
    .click(AdminContentPage.auth.operationSelect)
    .click(AdminContentPage.auth.operationDeleteOption)
    .click(AdminContentPage.auth.updateButton)
    .click(AdminContentPage.auth.confirmDelete)

    // Do it again, leaving URL alias on
    // Create news item
    .navigateTo(Env.baseURL + AddNewsPage.URL)
    .typeText(AddNewsPage.auth.titleInput, 'Test News')
    .typeText(AddNewsPage.auth.writtenBy, 'Test Author')
    .click(AddNewsPage.auth.saveButton)
    // Ensure is on page by clicking
    .navigateTo(Env.baseURL + AdminContentPage.URL)
    .click(await Selector('a').withText('Test News'))
    .click(NewsPage.common.crumb)
    //Delete News
    .navigateTo(Env.baseURL + AdminContentPage.URL)
    .click(await Selector('label').withText('Test News').nextSibling())
    .click(AdminContentPage.auth.operationSelect)
    .click(AdminContentPage.auth.operationDeleteOption)
    .click(AdminContentPage.auth.updateButton)
    .click(AdminContentPage.auth.confirmDelete);

});

test('Event breadcrumb test', async t => {
  await t
    // Login
    .typeText(UserPage.anon.userInput, Env.creds.admin.username)
		.typeText(UserPage.anon.passInput, Env.creds.admin.password)
		.click(UserPage.anon.submitButton)
    // Ensure login successful
    .expect(UserPage.auth.pageHeader.innerText).eql(Env.creds.admin.username)
    // Create event
    .navigateTo(Env.baseURL + AddEventPage.URL)
    .typeText(AddEventPage.auth.titleInput, 'Test Event')
    .click(AddEventPage.auth.allDayCheck)
    // Turn off automatic URL generation
    .click(AddEventPage.auth.urlSettings)
    .click(AddEventPage.auth.autoURLCheck)
    .click(AddEventPage.auth.saveButton)
    // Ensure is on page by clicking
    .navigateTo(Env.baseURL + AdminContentPage.URL)
    .click(await Selector('a').withText('Test Event'))
    .click(EventPage.common.crumb)
    //Delete Event
    .navigateTo(Env.baseURL + AdminContentPage.URL)
    .click(await Selector('label').withText('Test Event').nextSibling())
    .click(AdminContentPage.auth.operationSelect)
    .click(AdminContentPage.auth.operationDeleteOption)
    .click(AdminContentPage.auth.updateButton)
    .click(AdminContentPage.auth.confirmDelete)

    // Do it again but leave URL alias on
    // Create event
    .navigateTo(Env.baseURL + AddEventPage.URL)
    .typeText(AddEventPage.auth.titleInput, 'Test Event')
    .click(AddEventPage.auth.allDayCheck)
    .click(AddEventPage.auth.saveButton)
    // Ensure is on page by clicking
    .navigateTo(Env.baseURL + AdminContentPage.URL)
    .click(await Selector('a').withText('Test Event'))
    .click(EventPage.common.crumb)
    //Delete Event
    .navigateTo(Env.baseURL + AdminContentPage.URL)
    .click(await Selector('label').withText('Test Event').nextSibling())
    .click(AdminContentPage.auth.operationSelect)
    .click(AdminContentPage.auth.operationDeleteOption)
    .click(AdminContentPage.auth.updateButton)
    .click(AdminContentPage.auth.confirmDelete);
});
