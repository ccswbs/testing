const Env = require('./environment.js');
const Util = require('./utils.js');
const Actions = require('./actions.js');
const ServicesPage = require('./pages/services.js');

fixture `service`;

test
	.before(async t => {
		// path breadcrumbs is enabled and configured
	})('Services listing page includes the proper links in the breadcrumb', async t => {
		// the services listing page is viewed
		await t
			.navigateTo(Env.baseURL + '/services')
		// the breadcrumbs should display only the 'Home' link
			.expect(ServicesPage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok();
	})
	.after(async t => {

	});

// TODO: Write test - Patch Services term
test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// a service category term [term] with term ID [tid]
	}).skip('Services listing page filtered by term includes the proper links in the breadcrumb', async t => {
		// the services listing page filtered by [tid] is viewed
		// the page title should be "[term]"
		// the breadcrumbs should display only the 'Home' link followed by 'Services'
	})
	.after(async t => {

	});

// TODO: Write test - Unsure of technical limitations involved
// TODO: Resolve skip
test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// a services listing page as a child page
	}).skip('Services listing page under menu follows menu structure in breadcrumb', async t => {
		// the services listing page is viewed
		// the breadcrumbs should display only the 'Home' link followed by parent pages
	})
	.after(async t => {

	});

// TODO: Write test - Unsure of technical limitations involved
// TODO: Resolve skip
test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// a services listing page as a child page
	}).skip('Services listing page under menu filtered by term follows menu structure in breadcrumb', async t => {
		// the services listing page filtered by [tid] is viewed
		// the breadcrumbs should display only the 'Home' link followed by parent pages, followed by 'Services'
	})
	.after(async t => {

	});

// TODO: Write test - Services formatter requires TIDs, which means this test needs the services taxonomy patch
// TODO: Resolve skip
test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// a services node [service] with node ID [nid]
		t.ctx.service = Util.RandomName(4, 10);
		t.ctx.nid = Actions.CreateNode('service', {});
	}).skip('Services details page includes the proper links in the breadcrumb', async t => {
		// the /node/[nid] page is viewed
		// the page title should be "[service]"
		// the breadcrumbs should display only the 'Home' and 'Services' links
	})
	.after(async t => {

	});

// TODO: Write test - Services formatter requires TIDs, which means this test needs the services taxonomy patch
// TODO: Resolve skip
test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// a services node [service] with node ID [nid] and URL alias [service_alias]
	})('Services details page using a path alias includes the proper links in the breadcrumb', async t => {
		// the /course-outlines/[service_alias] page is viewed
		// the page title should be "[service]"
		// the breadcrumbs should display only the 'Home' and 'Services' links
	})
	.after(async t => {

	});
