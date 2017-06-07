const Env = require('./environment.js');
const Util = require('./utils.js');
const Actions = require('./actions.js');
const NewsPage = require('./pages/news.js');

fixture `News Breadcrumbs`;

// TODO: Write test
test
	.before(async t => {
		// path breadcrumbs is enabled and configured
	})('News listing page includes the proper links in the breadcrumb', async t => {
		// the news listing page is viewed
		await t
			.navigateTo(Env.baseURL + '/news')
		// the breadcrumbs should display only the 'Home' link
			.expect(NewsPage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok();
	})
	.after(async t => {

	});

test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// a news category term [term] with term ID [tid]
		t.ctx.term = Util.RandomName(4, 10);
		t.ctx.tid = await Actions.CreateTerm(Util.Vocabulary['news_category'], t.ctx.term, '');
	})('News listing page filtered by term includes the proper links in the breadcrumb', async t => {
		// the news listing page filtered by [tid] is viewed (/news/category/24)
		await t
			.navigateTo(Env.baseURL + '/news/category/' + t.ctx.tid)
		// the page title should be "[term]"
			.expect(NewsPage.common.pageTitle.innerText).eql(t.ctx.term)
		// the breadcrumbs should display only the 'Home' link followed by 'News'
			.expect(NewsPage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok()
			.expect(NewsPage.common.breadcrumb.find('li').find('a').withText('News').exists).ok();
	})
	.after(async t => {
		await Actions.DeleteTerm(t.ctx.tid);
	});

test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// a news node [news] with node ID [nid]
		t.ctx.news = Util.RandomName(4, 10);
		t.ctx.nid = await Actions.CreateNode('news', {
			'title':t.ctx.news
		});
	})('News details page includes the proper links in the breadcrumb', async t => {
		// the /node/[nid] page is viewed
		await t
			.navigateTo(Env.baseURL + '/node/' + t.ctx.nid)
		// the page title should be "[news]"
			.expect(NewsPage.common.pageTitle.innerText).eql(t.ctx.news)
		// the breadcrumbs should display only the 'Home' and 'News' links
			.expect(NewsPage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok()
			.expect(NewsPage.common.breadcrumb.find('li').find('a').withText('News').exists).ok();
	})
	.after(async t => {
		await Actions.DeleteNode(t.ctx.nid);
	});

test
	.before(async t => {
		// path breadcrumbs is enabled and configured

		// event aliases are in the form of /year/month/[event]
		let year = new Date().getFullYear();
		let month = ("0" + (new Date().getMonth() + 1)).slice(-2)

		// a news node [news] with node ID [nid] and URL alias [news_alias]
		t.ctx.news = Util.RandomName(4, 10);
		t.ctx.news_alias = year + '/' + month + '/' + t.ctx.news.toLowerCase().replace(' ', '-');
		t.ctx.nid = await Actions.CreateNode('news', {
			'title':t.ctx.news
		});
	})('News details page using a path alias includes the proper links in the breadcrumb', async t => {
		// the /news/[news_alias] page is viewed
		await t
			.navigateTo(Env.baseURL + '/news/' + t.ctx.news_alias)
		// the page title should be "[news]"
			.expect(NewsPage.common.pageTitle.innerText).eql(t.ctx.news)
		// the breadcrumbs should display only the 'Home' and 'News' links
			.expect(NewsPage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok()
			.expect(NewsPage.common.breadcrumb.find('li').find('a').withText('News').exists).ok();
	})
	.after(async t => {
		await Actions.DeleteNode(t.ctx.nid);
	});
