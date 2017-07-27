const Env = require('./environment.js');
const Util = require('./utils.js');
const Actions = require('./actions.js');
const Page = require('./pages/page.js');
const EditPage = require('./pages/node/add/page.js');
import { Selector } from 'testcafe';

fixture `Page Breadcrumbs`;

test
	.before(async t => {
		// a basic page node [page] with node ID [nid]
		t.ctx.nid = await Actions.CreateNode('page', {});
	})('Page excluded from menu includes the proper links in the breadcrumb', async t => {
		// the /node/[nid] page is viewed
		await t
			.navigateTo(Env.baseURL + '/node/' + t.ctx.nid)
			// the breadcrumbs should display only the 'Home' link
			.expect(Page.common.breadcrumb.find('li').find('a').withText('Home').exists).ok();
	})
	.after(async t => {
		await Actions.DeleteNode(t.ctx.nid);
	});

test
	.before(async t => {
		// a basic page node [page] with node ID [nid] and path alias [page_alias]
		t.ctx.page = Util.RandomName(4, 10);
		t.ctx.page_alias = t.ctx.page.toLowerCase().replace(' ', '-');
		t.ctx.nid = await Actions.CreateNode('page', {
			title:t.ctx.page
		});
	})('Page excluded from menu using path alias includes the proper links in the breadcrumb', async t => {
		// the /[page_alias] page is viewed
		await t
			.navigateTo(Env.baseURL + '/' + t.ctx.page_alias)
		// the breadcrumbs should display only the 'Home' link
			.expect(Page.common.breadcrumb.find('li').find('a').withText('Home').exists).ok();
	})
	.after(async t => {
		await Actions.DeleteNode(t.ctx.nid);
	});

test
	.before(async t => {
		// a basic page node [page] with node ID [nid]
		t.ctx.nid = await Actions.CreateNode('page', {});

		await Actions.Login(await t, Env.creds.admin.username, Env.creds.admin.password);
		await t.navigateTo(Env.baseURL + '/node/' + t.ctx.nid + '/edit');
		await t
			.click(EditPage.auth.enableMenuCheck)
			.click(EditPage.auth.saveButton);
	})('Page at top level of menu includes the proper links in the breadcrumb', async t => {
		// the /node/[nid] page is viewed
		await t
			.navigateTo(Env.baseURL + '/node/' + t.ctx.nid)
		// the breadcrumbs should display only the 'Home' link
			.expect(Page.common.breadcrumb.find('li').find('a').withText('Home').exists).ok();
	})
	.after(async t => {
		await Actions.DeleteNode(t.ctx.nid);
	});

test
	.before(async t => {
		// a basic page node [page] with node ID [nid] and path alias [page_alias]
		t.ctx.page = Util.RandomName(4, 10);
		t.ctx.page_alias = t.ctx.page.toLowerCase().replace(' ', '-');
		t.ctx.nid = await Actions.CreateNode('page', {
			title:t.ctx.page,
			menu:{
				enabled:true
			}
		});
	})('Page at top level of menu using path alias includes the proper links in the breadcrumb', async t => {
		// the /[page_alias] page is viewed
		await t
			.navigateTo('/' + t.ctx.page_alias)
			// the breadcrumbs should display only the 'Home' link
			.expect(Page.common.breadcrumb.find('li').find('a').withText('Home').exists).ok();
	})
	.after(async t => {
		await Actions.DeleteNode(t.ctx.nid);
	});

test
	.before(async t => {
		// a basic page node [parent] with node ID [pnid]
		t.ctx.parent = Util.RandomName(4, 10);
		t.ctx.pnid = await Actions.CreateNode('page', {
			title:t.ctx.parent,
			menu:{
				enabled:true
			}
		});
		// a basic page node [child] with node ID [cnid]
		t.ctx.child = Util.RandomName(4, 10);
		t.ctx.cnid = await Actions.CreateNode('page', {
			title:t.ctx.child,
			menu:{
				enabled:true
			}
		});

		await Actions.Login(await t, Env.creds.admin.username, Env.creds.admin.password);

		await t.navigateTo(Env.baseURL + '/node/' + t.ctx.cnid + '/edit');
		await t
			.click(EditPage.auth.menuParentSelect)
			.click(EditPage.auth.menuParentSelect.find('option').withText('-- ' + t.ctx.parent))
			.click(EditPage.auth.saveButton);
	})('Page on a sublevel of menu includes the proper links in the breadcrumb', async t => {
		// the /node/[nid] page is viewed
		await t
			.navigateTo(Env.baseURL + '/node/' + t.ctx.cnid)
		// the breadcrumbs should display only the 'Home' link followed by the [parent] link
			.expect(Page.common.breadcrumb.find('li').find('a').withText('Home').exists).ok()
			.expect(Page.common.breadcrumb.find('li').find('a').withText(t.ctx.parent).exists).ok();
	})
	.after(async t => {
		await Actions.DeleteNode(t.ctx.cnid);
		await Actions.DeleteNode(t.ctx.pnid);
	});

test
	.before(async t => {
		// a basic page node [parent] with node ID [pnid] and alias [parent_alias]
		t.ctx.parent = Util.RandomName(4, 10);
		t.ctx.parent_alias = t.ctx.parent.toLowerCase().replace(' ', '-');
		t.ctx.pnid = await Actions.CreateNode('page', {
			title:t.ctx.parent,
			menu:{
				enabled:true
			}
		});
		// a basic page node [child] with node ID [cnid] and alias [child_alias]
		t.ctx.child = Util.RandomName(4, 10);
		t.ctx.child_alias = t.ctx.child.toLowerCase().replace(' ', '-');
		t.ctx.cnid = await Actions.CreateNode('page', {
			title:t.ctx.child,
			menu:{
				enabled:true
			}
		});

		await Actions.Login(await t, Env.creds.admin.username, Env.creds.admin.password);

		await t.navigateTo(Env.baseURL + '/node/' + t.ctx.cnid + '/edit');
		await t
			.click(EditPage.auth.menuParentSelect)
			.click(EditPage.auth.menuParentSelect.find('option').withText('-- ' + t.ctx.parent))
			.click(EditPage.auth.saveButton);
	})('Page on a sublevel of menu using path alias includes the proper links in the breadcrumb', async t => {
		// the /[parent_alias]/[child_alias] page is viewed
		await t
		// the breadcrumbs should display only the 'Home' link followed by the [parent] link
			.expect(Page.common.breadcrumb.find('li').find('a').withText('Home').exists).ok()
			.expect(Page.common.breadcrumb.find('li').find('a').withText(t.ctx.parent).exists).ok();
	})
	.after(async t => {
		await Actions.DeleteNode(t.ctx.cnid);
		await Actions.DeleteNode(t.ctx.pnid);
	});
