const Env = require('./environment.js');
const Util = require('./utils.js');
const Actions = require('./actions.js');
const EventPage = require('./pages/events.js');

fixture `Event Breadcrumbs`;

test
	.before(async t => {
		// path breadcrumbs is enabled and configured
	})('Event listing page includes the proper links in the breadcrumb', async t => {
		// the event listing page is viewed
		await t
			.navigateTo(Env.baseURL + '/events')
		// the breadcrumbs should display only the 'Home' link
			.expect(EventPage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok();
	})
	.after(async t => {

	});

test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// an event category term [term] with term ID [tid]
		t.ctx.term = Util.RandomName(4, 10);
		t.ctx.tid = await Actions.CreateTerm(Util.Vocabulary['event_category'], t.ctx.term, '');
	})('Event listing page filtered by term includes the proper links in the breadcrumb', async t => {
		// the event listing page filtered by [tid] is viewed
		await t
			.navigateTo(Env.baseURL + '/events/' + await t.ctx.tid)
		// the page title should be "Events related to [term]"
			//.expect(EventPage.common.pageHeader.innerText).eql('Events related to ' + t.ctx.term) // TODO: Uncomment this line when the events listing page title fix is merged
		// the breadcrumbs should display only the 'Home' link followed by 'Events'
			.expect(EventPage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok()
			.expect(EventPage.common.breadcrumb.find('li').find('a').withText('Events').exists).ok();
	})
	.after(async t => {
		await Actions.DeleteTerm(t.ctx.tid);
	});

test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// an event node [event] with node ID [nid]
		t.ctx.event = Util.RandomName(4, 10);
		t.ctx.nid = await Actions.CreateNode('event', {
			'title':t.ctx.event
		});
	})('Event details page includes the proper links in the breadcrumb', async t => {
		// the /node/[nid] page is viewed
		await t
			.navigateTo(Env.baseURL + '/node/' + t.ctx.nid)
		// the page title should be "[event]"
			.expect(EventPage.common.pageHeader.innerText).eql(t.ctx.event)
		// the breadcrumbs should display only the 'Home' and 'Events' links
			.expect(EventPage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok()
			.expect(EventPage.common.breadcrumb.find('li').find('a').withText('Events').exists).ok();
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

		// an event node [event] with node ID [nid] and URL alias [event_alias]
		t.ctx.event = Util.RandomName(4, 10);
		t.ctx.event_alias = year + '/' + month + '/' + t.ctx.event.toLowerCase().replace(' ', '-');
		t.ctx.nid = await Actions.CreateNode('event', {
			'title':t.ctx.event
		});
	})('Event details page using a path alias includes the proper links in the breadcrumb', async t => {
		// the /events/[event_alias] page is viewed
		await t
			.navigateTo(Env.baseURL + '/events/' + t.ctx.event_alias)
		// the page title should be "[event]"
			.expect(EventPage.common.pageHeader.innerText).eql(t.ctx.event)
		// the breadcrumbs should display only the 'Home' and 'Events' links
			.expect(EventPage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok()
			.expect(EventPage.common.breadcrumb.find('li').find('a').withText('Events').exists).ok()
	})
	.after(async t => {
		await Actions.DeleteNode(t.ctx.nid);
	});
