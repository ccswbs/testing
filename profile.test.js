const Env = require('./environment.js');
const Util = require('./utils.js');
const Actions = require('./actions.js');
const PeoplePage = require('./pages/people.js');

fixture `Profile Breadcrumbs`;

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

test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// a profile category term [term] with term ID [tid]
		t.ctx.term = Util.RandomName(4, 10);
		t.ctx.tid = await Actions.CreateTerm(Util.Vocabulary['profile_category'], t.ctx.term, '');
	})('Profile listing page filtered by term includes the proper links in the breadcrumb', async t => {
		// the profile listing page filtered by [tid] is viewed
		await t
			.navigateTo(Env.baseURL + '/people/' + t.ctx.tid)
		// the page title should be "[term]"
			//.expect(PeoplePage.common.pageHeader.innerText).eql(t.ctx.term)
		// the breadcrumbs should display only the 'Home' link followed by 'People'
			.expect(PeoplePage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok()
			.expect(PeoplePage.common.breadcrumb.find('li').find('a').withText('People').exists).ok();
	})
	.after(async t => {
		await Actions.DeleteTerm(t.ctx.tid);
	});

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
