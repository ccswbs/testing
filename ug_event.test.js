const Env = require('./environment.js');
const Util = require('./utils.js');
const Actions = require('./actions.js');
const UserPage = require('./pages/user.js');
const EventPage = require('./pages/events.js');
const AddEventPage = require('./pages/node/add/event.js');
const AdminContentPage = require('./pages/admin/content.js');
const GenerateTermsPage = require('./pages/admin/config/development/generate/taxonomy.js');
const AddEventCategoryTermPage = require('./pages/admin/structure/taxonomy/event_category/add.js');
const EditTermPage = require('./pages/taxonomy/term/edit.js');

import { Selector } from 'testcafe';

fixture `UG Event`
	.page(Env.baseURL);

test
	.before(async t => {
		// Dummy Content
		t.ctx.catname = Util.RandomName(4, 10);
		t.ctx.eventtitle = Util.RandomName(4, 10);

		// Create Event Category
		t.ctx.tid = await Actions.CreateTerm(Util.Vocabulary['event_category'], t.ctx.catname, "");
		// Create Event Node
		t.ctx.event = await Actions.CreateNode({
			type:"event",
			title:t.ctx.eventtitle,
			tid:t.ctx.tid
		});
	})('Descriptive title appears in the correct place', async t => {
		await t
			// Check page titles
			.navigateTo(Env.baseURL + EventPage.URL)
			.expect(EventPage.common.pageHeader.innerText).eql('Upcoming Events')
			.navigateTo(Env.baseURL + EventPage.URL + '/' + t.ctx.tid)
			.expect(EventPage.common.pageHeader.innerText).eql('Events related to ' + t.ctx.catname)
			.expect(await Selector('h2').find('a').withText(t.ctx.eventtitle)).ok()
			.expect(await Selector('h3.media-heading').exists).notOk();
	})
	.after(async t => {
		await Actions.DeleteTerm(t.ctx.tid);
		await Actions.DeleteNode(t.ctx.event);
	});