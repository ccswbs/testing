const Env = require('./environment.js');
const Util = require('./utils.js');
const Actions = require('./actions.js');
const UserPage = require('./pages/user.js');
const FAQPage = require('./pages/faq.js');
const NewsPage = require('./pages/news.js');
const EventPage = require('./pages/events.js');
const PeoplePage = require('./pages/people.js');
import { Selector } from 'testcafe';

fixture `UG Profile`
	.page(Env.baseURL + UserPage.URL)
	.beforeEach(async t => {
		
	});

test
	.before(async t => {
		// Setup content ahead of the actual test

		// Actions.CreateNode returns a node ID that is then
		// stored in t.ctx.[type]_nid to be referenced later
		// for testing and deletion
		
		var tags = [];
		for(var i = 0; i < 5; i++) {
			tags.push(Util.RandomName(4, 10));
		}
		tags = tags.toString();

		// Create News
		t.ctx.news_nid = await Actions.CreateNode({
			type:"news",
			title:"Test news",
			tags:tags
		});
		// Create Event
		t.ctx.event_nid = await Actions.CreateNode({
			type:"event",
			title:Util.RandomName(4, 10),
			tags:tags
		});
		// Create Profile
		t.ctx.profile_nid = await Actions.CreateNode({
			type:"profile",
			name:{
				first:Util.RandomName(4, 10),
				last:Util.RandomName(4, 10)
			},
			tags:tags
		});
		// Create FAQ
		t.ctx.faq_nid = await Actions.CreateNode({
			type:"faq",
			question:"Test Question",
			answer:{
				value:"Test Answer"
			},
			tags:tags
		});
	})('Related keywords on E6, F4, PP4, and N7 are consistent', async t => {
		// Regex to match current standard format (comma-separated list)
		var pattern = /^(\w*,\s*)*\w*$/g;

		await t
			// Test News related keywords for pattern
			.navigateTo(Env.baseURL + '/node/' + await t.ctx.news_nid)
			.expect(NewsPage.common.relatedKeywords.innerText).match(pattern)
			// Test Event related keywords for pattern
			.navigateTo(Env.baseURL + '/node/' + await t.ctx.event_nid)
			.expect(EventPage.common.relatedKeywords.innerText).match(pattern)
			// Test Profile related keywords for pattern
			.navigateTo(Env.baseURL + '/node/' + await t.ctx.profile_nid)
			.expect(PeoplePage.common.relatedKeywords.innerText).match(pattern)
			// Test FAQ related keywords for pattern
			.navigateTo(Env.baseURL + '/node/' + await t.ctx.faq_nid)
			.expect(FAQPage.common.relatedKeywords.innerText).match(pattern)
	})
	.after(async t => {
		await Actions.DeleteNode(t.ctx.event_nid);
		await Actions.DeleteNode(t.ctx.profile_nid);
		await Actions.DeleteNode(t.ctx.faq_nid);
		await Actions.DeleteNode(t.ctx.news_nid);
	});