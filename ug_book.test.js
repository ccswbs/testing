const Env = require('./environment.js');
const Util = require('./utils.js');
const Actions = require('./actions.js');
const UserPage = require('./pages/user.js');
const BookPage = require('./pages/book.js');
const OutlinePage = require('./pages/node/outline.js');

import { Selector } from 'testcafe';

fixture `UG Book`
	.page(Env.baseURL);

test
	.before(async t => {
		await Actions.Login(t, Env.creds.admin.username, Env.creds.admin.password);

		t.ctx.root = await Actions.CreateNode({
			type:"book",
			title:"Root Page"
		});
		t.ctx.child = await Actions.CreateNode({
			type:"book",
			title:"Child Page"
		});

		await t
			.navigateTo(Env.baseURL + OutlinePage.URL(t.ctx.root))
			.click(OutlinePage.auth.bookSelect)
			.click(OutlinePage.auth.newBookOption)
			.click(OutlinePage.auth.saveButton)
			.navigateTo(Env.baseURL + OutlinePage.URL(t.ctx.child))
			.click(OutlinePage.auth.bookSelect)
			.click(await Selector('option[value="' + t.ctx.root + '"]'))
			.click(OutlinePage.auth.saveButton);
	})('Up link is present but meta tag is gone', async t => {
		await t
			.navigateTo(Env.baseURL + '/node/' + t.ctx.child)
			.expect(BookPage.common.upMetaLink.exists).notOk()
			.expect(BookPage.common.upLink.exists).ok();
	})
	.after(async t => {

	});