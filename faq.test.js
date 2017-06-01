const Env = require('./environment.js');
const Util = require('./utils.js');
const Actions = require('./actions.js');
const FAQPage = require('./pages/faq.js');

fixture `faq`;

test
	.before(async t => {
		// path breadcrumbs is enabled and configured
	})('FAQ listing page includes the proper links in the breadcrumb', async t => {
		// the FAQ listing page is viewed
		await t
			.navigateTo(Env.baseURL + '/faq')
		// the breadcrumbs should display only the 'Home' link
			.expect(FAQPage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok();
	})
	.after(async t => {

	});

// TODO: Write test once Services term is patched
test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// an FAQ category term [term] with term ID [tid]
	}).skip('FAQ listing page filtered by term includes the proper links in the breadcrumb', async t => {
		// the FAQ listing page filtered by [tid] is viewed
		// the page title should be "Frequently Asked Questions"
		// the breadcrumbs should display only the 'Home' link followed by 'FAQs'
	})
	.after(async t => {

	});

// TODO: Write test - Unsure of technical limitations involved
// TODO: Resolve skip
test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// an FAQ listing page as a child page
	}).skip('FAQ listing page under menu follows menu structure in breadcrumb', async t => {
		// the FAQ listing page is viewed
		// the breadcrumbs should display only the 'Home' link followed by parent pages
	})
	.after(async t => {

	});

// TODO: Write test - Unsure of technical limitations involved
// TODO: Resolve skip
test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// an FAQ listing page as a child page
	}).skip('FAQ listing page under menu filtered by term follows menu structure in breadcrumb', async t => {
		// the FAQ listing page filtered by [tid] is viewed
		// the breadcrumbs should display only the 'Home' link followed by parent pages, followed by 'FAQs'
	})
	.after(async t => {

	});

test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// an FAQ node [faq] with node ID [nid]
		t.ctx.faq = Util.RandomName(4, 10);
		t.ctx.nid = await Actions.CreateNode('faq', {
			question:t.ctx.faq
		});
	})('FAQ details page includes the proper links in the breadcrumb', async t => {
		// the /node/[nid] page is viewed
		await t
			.navigateTo(Env.baseURL + '/node/' + t.ctx.nid)
		// the page title should be "[faq]"
			.expect(FAQPage.common.pageHeader.innerText).eql(t.ctx.faq)
		// the breadcrumbs should display only the 'Home' and 'FAQs' links
			.expect(FAQPage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok()
			.expect(FAQPage.common.breadcrumb.find('li').find('a').withText('FAQs').exists).ok();
	})
	.after(async t => {
		await Actions.DeleteNode(t.ctx.nid);
	});

test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// an FAQ node [faq] with node ID [nid] and URL alias [faq_alias]
		t.ctx.faq = Util.RandomName(4, 10);
		t.ctx.faq_alias = t.ctx.faq.toLowerCase();
		t.ctx.nid = await Actions.CreateNode('faq', {
			question:t.ctx.faq
		});
	})('FAQ details page using a path alias includes the proper links in the breadcrumb', async t => {
		// the /faq/[faq_alias] page is viewed
		await t
			.navigateTo(Env.baseURL + '/faq/' + t.ctx.faq_alias)
		// the page title should be "[faq]"
			.expect(FAQPage.common.pageHeader.innerText).eql(t.ctx.faq)
		// the breadcrumbs should display only the 'Home' and 'FAQs' links
			.expect(FAQPage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok()
			.expect(FAQPage.common.breadcrumb.find('li').find('a').withText('FAQs').exists).ok();
	})
	.after(async t => {
		await Actions.DeleteNode(t.ctx.nid);
	});
