const Env = require('./environment.js');
const Util = require('./utils.js');
const AddFAQ = require('./pages/node_add_faq.js');
const AddService = require('./pages/node_add_services.js');
const UserPage = require('./pages/user.js');
const AddEventPage = require('./pages/node_add_event.js');
const AddNewsPage = require('./pages/node_add_news.js');
const AddServiceCategory = require('./pages/admin_structure_taxonomy_service_category_add.js');
const AddServiceAudience = require('./pages/admin_structure_taxonomy_service_audience_add.js');
const ListServiceAudience = require('./pages/admin_structure_taxonomy_service_audience.js')
const ListServiceCategory = require('./pages/admin_structure_taxonomy_service_category.js')
const AdminContent = require('./pages/admin_content.js');
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
      .navigateTo(Env.baseURL + AddService.URL)
      .typeText(AddService.auth.titleInput, 'Test Service')
      .click(AddService.auth.categorySelect)
      .click(AddService.auth.testCategorySelect)
      .click(AddService.auth.saveButton)


      //Delete service
      .navigateTo(Env.baseURL + AdminContent.URL)
      .click(await Selector('label').withText('Test Service').nextSibling())
  		.click(AdminContent.auth.operationSelect)
  		.click(AdminContent.auth.operationDeleteOption)
  		.click(AdminContent.auth.updateButton)
  		.click(AdminContent.auth.confirmDelete)
      //Delete taxonomy information
      .navigateTo(Env.baseURL + ListServiceAudience.URL)
      .click('ListServiceAudience.auth.editButton')
      .click('ListServiceAudience.auth.deleteButton')
      .click('ListServiceAudience.auth.confirmDelete')

      .navigateTo(Env.baseURL + ListServiceCategory.URL)
      .click('ListServiceCategory.auth.editButton')
      .click('ListServiceCategory.auth.deleteButton')
      .click('ListServiceCategory.auth.confirmDelete')

  });

test('FAQ breadcrumb test', async t => {
  await t
    // Login
    .typeText(UserPage.anon.userInput, Env.creds.admin.username)
		.typeText(UserPage.anon.passInput, Env.creds.admin.password)
		.click(UserPage.anon.submitButton)
    // Create FAQ
    .navigateTo(Env.baseURL + AddFAQ.URL)
    .typeText(AddFAQ.auth.questionInput, 'Test Question')
    .switchToIframe(AddFAQ.auth.iframe)
    .typeText(AddFAQ.auth.answer, 'Test Answer')
    .switchToMainWindow()
    .click(AddFAQ.auth.saveButton)

    //Delete FAQ
    .navigateTo(Env.baseURL + AdminContent.URL)
    .click(await Selector('label').withText('Test Question').nextSibling())
    .click(AdminContent.auth.operationSelect)
    .click(AdminContent.auth.operationDeleteOption)
    .click(AdminContent.auth.updateButton)
    .click(AdminContent.auth.confirmDelete);
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
		.click(AddNewsPage.auth.saveButton)

    //Delete News
    .navigateTo(Env.baseURL + AdminContent.URL)
    .click(await Selector('label').withText('Test News').nextSibling())
    .click(AdminContent.auth.operationSelect)
    .click(AdminContent.auth.operationDeleteOption)
    .click(AdminContent.auth.updateButton)
    .click(AdminContent.auth.confirmDelete);

});

test('Event breadcrumb test', async t => {
  await t
    // Login
    .typeText(UserPage.anon.userInput, Env.creds.admin.username)
		.typeText(UserPage.anon.passInput, Env.creds.admin.password)
		.click(UserPage.anon.submitButton)
    // Create event
    .navigateTo(Env.baseURL + AddEventPage.URL)
    .typeText(AddEventPage.auth.titleInput, 'Test Event')
    .click(AddEventPage.auth.allDayCheck)
    .click(AddEventPage.auth.saveButton)

    //Delete Event
    .navigateTo(Env.baseURL + AdminContent.URL)
    .click(await Selector('label').withText('Test Event').nextSibling())
    .click(AdminContent.auth.operationSelect)
    .click(AdminContent.auth.operationDeleteOption)
    .click(AdminContent.auth.updateButton)
    .click(AdminContent.auth.confirmDelete);
});
