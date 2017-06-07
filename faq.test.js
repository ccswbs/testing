const Env = require('./environment.js');
const Util = require('./utils.js');
const Actions = require('./actions.js');
const FAQPage = require('./pages/faq.js');

fixture `FAQ Breadcrumbs`;

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

test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// an FAQ category term [term] with term ID [tid]
		t.ctx.term = Util.RandomName(4, 10);
		t.ctx.tid = await Actions.CreateTerm(Util.Vocabulary['faq_category'], t.ctx.term, '');
	})('FAQ listing page filtered by term includes the proper links in the breadcrumb', async t => {
		// the FAQ listing page filtered by [tid] is viewed
		await t
			.navigateTo(Env.baseURL + '/faq/' + await t.ctx.tid)
		// the page title should be "Frequently Asked Questions"
			.expect(FAQPage.common.pageHeader.innerText).eql('Frequently Asked Questions')
		// the breadcrumbs should display only the 'Home' link followed by 'FAQs'
			.expect(FAQPage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok()
			.expect(FAQPage.common.breadcrumb.find('li').find('a').withText('FAQs').exists).ok();
	})
	.after(async t => {
		await Actions.DeleteTerm(t.ctx.tid);
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
