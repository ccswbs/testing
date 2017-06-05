const Env = require('./environment.js');
const Util = require('./utils.js');
const Actions = require('./actions.js');
const PeoplePage = require('./pages/people.js');

fixture `profile`;

test
	.before(async t => {
		// path breadcrumbs is enabled and configured
	})('Profile listing page includes the proper links in the breadcrumb', async t => {
		// the profile listing page is viewed
		await t
			.navigateTo(Env.baseURL + '/people')
		// the breadcrumbs should display only the 'Home' link
			.expect(PeoplePage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok();
	})
	.after(async t => {

	});

// TODO: Write test once Services term is patched
// TODO: Resolve skip
test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// a profile category term [term] with term ID [tid]
	}).skip('Profile listing page filtered by term includes the proper links in the breadcrumb', async t => {
		// the profile listing page filtered by [tid] is viewed
		// the page title should be "[term]"
		// the breadcrumbs should display only the 'Home' link followed by 'People'
	})
	.after(async t => {

	});

// TODO: Write test - Unsure of technical limitations involved
// TODO: Resolve skip
test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// a profile listing page as a child page
	}).skip('Profile listing page under menu follows menu structure in breadcrumb', async t => {
		// the profile listing page is viewed
		// the breadcrumbs should display only the 'Home' link followed by parent pages
	})
	.after(async t => {

	});

// TODO: Write test - Unsure of technical limitations involved
// TODO: Resolve skip
test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// a profile listing page as a child page
	}).skip('Profile listing page under menu filtered by term follows menu structure in breadcrumb', async t => {
		// the profile listing page filtered by [tid] is viewed
		// the breadcrumbs should display only the 'Home' link followed by parent pages, followed by 'People'
	})
	.after(async t => {

	});

// TODO: Write test
test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// a profile node [profile] with node ID [nid]
		t.ctx.profile = Util.RandomName(4, 10) + ' ' + Util.RandomName(4, 10);
		t.ctx.nid = await Actions.CreateNode('profile', {
			name:{
				first:t.ctx.profile.split(' ')[0],
				last:t.ctx.profile.split(' ')[1]
			}
		});
	})('Profile details page includes the proper links in the breadcrumb', async t => {
		// the /node/[nid] page is viewed
		await t
			.navigateTo(Env.baseURL + '/node/' + t.ctx.nid)
		// the page title should be "[profile]"
			.expect(PeoplePage.common.pageHeader.innerText).eql(t.ctx.profile)
		// the breadcrumbs should display only the 'Home' and 'People' links
			.expect(PeoplePage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok()
			.expect(PeoplePage.common.breadcrumb.find('li').find('a').withText('People').exists).ok();
	})
	.after(async t => {
		await Actions.DeleteNode(t.ctx.nid);
	});

// TODO: Write test
test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// a profile node [profile] with node ID [nid] and URL alias [profile_alias]
		t.ctx.profile = Util.RandomName(4, 10) + ' ' + Util.RandomName(4, 10);
		t.ctx.profile_alias = t.ctx.profile.toLowerCase().replace(' ', '-');
		t.ctx.nid = await Actions.CreateNode('profile', {
			name:{
				first:t.ctx.profile.split(' ')[0],
				last:t.ctx.profile.split(' ')[1]
			}
		});
	})('Profile details page using a path alias includes the proper links in the breadcrumb', async t => {
		// the /people/[profile_alias] page is viewed
		await t
			.navigateTo(Env.baseURL + '/people/' + t.ctx.profile_alias)
		// the page title should be "[profile]"
			.expect(PeoplePage.common.pageHeader.innerText).eql(t.ctx.profile)
		// the breadcrumbs should display only the 'Home' and 'People' links
			.expect(PeoplePage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok()
			.expect(PeoplePage.common.breadcrumb.find('li').find('a').withText('People').exists).ok();
	})
	.after(async t => {
		await Actions.DeleteNode(t.ctx.nid);
	});
