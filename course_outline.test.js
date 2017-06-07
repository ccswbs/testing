const Env = require('./environment.js');
const Util = require('./utils.js');
const Actions = require('./actions.js');
const CourseOutlinePage = require('./pages/course-outlines.js');

fixture `Course Outline Breadcrumbs`;

test
	.before(async t => {
		// path breadcrumbs is enabled and configured
	})('Course outline listing page includes the proper links in the breadcrumb', async t => {
		// the course outline listing page is viewed
		await t
			.navigateTo(Env.baseURL + '/course-outlines')
		// the breadcrumbs should display only the 'Home' link
			.expect(CourseOutlinePage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok();
	})
	.after(async t => {

	});

test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// a course outline category term [term] with term ID [tid]
		t.ctx.term = Util.RandomName(4, 10);
		t.ctx.tid = await Actions.CreateTerm(Util.Vocabulary['course_outline_category'], t.ctx.term, '');
	})('Course outline listing page filtered by term includes the proper links in the breadcrumb', async t => {
		// the course outline listing page filtered by [tid] is viewed
		await t
			.navigateTo(Env.baseURL + '/course-outlines/' + await t.ctx.tid)
		// the page title should be "[term] Course Outlines"
			.expect(CourseOutlinePage.common.pageTitle.innerText).eql(t.ctx.term + ' Course Outlines')
		// the breadcrumbs should display only the 'Home' link followed by 'Course Outlines'
			.expect(CourseOutlinePage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok()
			.expect(CourseOutlinePage.common.breadcrumb.find('li').find('a').withText('Course Outlines').exists).ok();
	})
	.after(async t => {
		await Actions.DeleteTerm(t.ctx.tid);
	});

test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// a course outline node [course_outline] with course code [course_code] node ID [nid]
		t.ctx.course_outline = Util.RandomName(4, 10);
		t.ctx.course_code = Util.RandomString(4) + '*' + Util.RandomInt(0, 9) + Util.RandomInt(0, 9) + Util.RandomInt(0, 9) + Util.RandomInt(0, 9);
		t.ctx.nid = await Actions.CreateNode('course_outline', {
			name:t.ctx.course_outline,
			code:t.ctx.course_code
		});
	})('Course outline details page includes the proper links in the breadcrumb', async t => {
		// the /node/[nid] page is viewed
		await t
			.navigateTo(Env.baseURL + '/node/' + t.ctx.nid)
		// the page title should be "[course_outline]"
			.expect(CourseOutlinePage.common.pageTitle.innerText).eql(t.ctx.course_outline + ' (' + t.ctx.course_code + ')')
		// the breadcrumbs should display only the 'Home' and 'Course Outlines' links
			.expect(CourseOutlinePage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok()
			.expect(CourseOutlinePage.common.breadcrumb.find('li').find('a').withText('Course Outlines').exists).ok();
	})
	.after(async t => {
		await Actions.DeleteNode(t.ctx.nid);
	});

test
	.before(async t => {
		// path breadcrumbs is enabled and configured
		// a course outline node [course_outline] with node ID [nid] and URL alias [course_outline_alias]
		t.ctx.course_outline = Util.RandomName(4, 10);
		t.ctx.course_code = Util.RandomString(4) + '*' + Util.RandomInt(0, 9) + Util.RandomInt(0, 9) + Util.RandomInt(0, 9) + Util.RandomInt(0, 9);
		t.ctx.course_outline_alias = (t.ctx.course_outline + ' ' + t.ctx.course_code).toLowerCase().replace(' ', '-').replace('*', '');
		t.ctx.nid = await Actions.CreateNode('course_outline', {
			name:t.ctx.course_outline,
			code:t.ctx.course_code
		});
	})('Course outline details page using a path alias includes the proper links in the breadcrumb', async t => {
		// the /course-outlines/[course_outline_alias] page is viewed
		await t
			.navigateTo(Env.baseURL + '/course-outlines/' + t.ctx.course_outline_alias)
		// the page title should be "[course_outline]"
			.expect(CourseOutlinePage.common.pageTitle.innerText).eql(t.ctx.course_outline + ' (' + t.ctx.course_code + ')')
		// the breadcrumbs should display only the 'Home' and 'Course Outlines' links
			.expect(CourseOutlinePage.common.breadcrumb.find('li').find('a').withText('Home').exists).ok()
			.expect(CourseOutlinePage.common.breadcrumb.find('li').find('a').withText('Course Outlines').exists).ok();
	})
	.after(async t => {
		await Actions.DeleteNode(t.ctx.nid);
	});
