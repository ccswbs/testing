const Env = require('./environment.js');
const Util = require('./utils.js');
const Actions = require('./actions.js');
const CoursePage = require('./pages/course-outlines.js');

fixture `UG Event`
	.page(Env.baseURL);

test.before(async t => {
	// Case 1: 0/0/0
	t.ctx.case1 = await Actions.CreateNode({
		type:"course_outline",
		name:"Case 1",
		code:Util.RandomString(4).toUpperCase()
	});
	// Case 2: 1/0/0
	t.ctx.case2 = await Actions.CreateNode({
		type:"course_outline",
		name:"Case 2",
		code:Util.RandomString(4).toUpperCase(),
		term:2
	});

	// Case 3: 0/1/0
	t.ctx.case3 = await Actions.CreateNode({
		type:"course_outline",
		name:"Case 3",
		code:Util.RandomString(4).toUpperCase(),
		instructor:{
			name:"John Doe",
			url:null
		}
	});

	// Case 4: 1/1/0
	t.ctx.case4 = await Actions.CreateNode({
		type:"course_outline",
		name:"Case 4",
		code:Util.RandomString(4).toUpperCase(),
		term:2,
		instructor:{
			name:"John Doe",
			url:null
		}
	});

	// Case 5: 0/0/1
	t.ctx.case5 = await Actions.CreateNode({
		type:"course_outline",
		name:"Case 5",
		code:Util.RandomString(4).toUpperCase(),
		instructor:{
			name:null,
			url:"http://www.example.com"
		}
	});

	// Case 6: 1/0/1
	t.ctx.case6 = await Actions.CreateNode({
		type:"course_outline",
		name:"Case 6",
		code:Util.RandomString(4).toUpperCase(),
		term:2,
		instructor:{
			name:null,
			url:"http://www.example.com"
		}
	});

	// Case 7: 0/1/1
	t.ctx.case7 = await Actions.CreateNode({
		type:"course_outline",
		name:"Case 7",
		code:Util.RandomString(4).toUpperCase(),
		instructor:{
			name:"John Doe",
			url:"http://www.example.com"
		}
	});

	// Case 8: 1/1/1
	t.ctx.case8 = await Actions.CreateNode({
		type:"course_outline",
		name:"Case 8",
		code:Util.RandomString(4).toUpperCase(),
		term:2,
		instructor:{
			name:"John Doe",
			url:"http://www.example.com"
		}
	});
})('Term and Instructor labels are hidden when appropriate', async t => {
	await t
		// Case 1: No labels (unlinked)
		.navigateTo(Env.baseURL + '/node/' + t.ctx.case1)
		.expect(CoursePage.common.termLabel.exists).notOk()
		.expect(CoursePage.common.instructorLabel.exists).notOk()
		// Case 2: Term label (unlinked)
		.navigateTo(Env.baseURL + '/node/' + t.ctx.case2)
		.expect(CoursePage.common.termLabel.exists).ok()
		.expect(CoursePage.common.instructorLabel.exists).notOk()
		// Case 3: Instructor label (unlinked)
		.navigateTo(Env.baseURL + '/node/' + t.ctx.case3)
		.expect(CoursePage.common.termLabel.exists).notOk()
		.expect(CoursePage.common.instructorLabel.exists).ok()
		//.expect(CoursePage.common.instructorValue.hasAttribute('href')).notOk()
		// Case 4: Both labels (unlinked)
		.navigateTo(Env.baseURL + '/node/' + t.ctx.case4)
		.expect(CoursePage.common.termLabel.exists).ok()
		.expect(CoursePage.common.instructorLabel.exists).ok()
		//.expect(CoursePage.common.instructorValue.hasAttribute('href')).notOk()
		// Case 5: No labels (linked)
		.navigateTo(Env.baseURL + '/node/' + t.ctx.case5)
		.expect(CoursePage.common.termLabel.exists).notOk()
		.expect(CoursePage.common.instructorLabel.exists).notOk()
		// Case 6: Term label (linked)
		.navigateTo(Env.baseURL + '/node/' + t.ctx.case6)
		.expect(CoursePage.common.termLabel.exists).ok()
		.expect(CoursePage.common.instructorLabel.exists).notOk()
		// Case 7: Instructor label (linked)
		.navigateTo(Env.baseURL + '/node/' + t.ctx.case7)
		.expect(CoursePage.common.termLabel.exists).notOk()
		.expect(CoursePage.common.instructorLabel.exists).ok()
		.expect(CoursePage.common.instructorValue.getAttribute('href')).ok()
		// Case 8: Both labels (linked)
		.navigateTo(Env.baseURL + '/node/' + t.ctx.case8)
		.expect(CoursePage.common.termLabel.exists).ok()
		.expect(CoursePage.common.instructorLabel.exists).ok()
		.expect(CoursePage.common.instructorValue.getAttribute('href')).ok()
}).after(async t => {
	Actions.DeleteNode(t.ctx.case1);
	Actions.DeleteNode(t.ctx.case2);
	Actions.DeleteNode(t.ctx.case3);
	Actions.DeleteNode(t.ctx.case4);
	Actions.DeleteNode(t.ctx.case5);
	Actions.DeleteNode(t.ctx.case6);
	Actions.DeleteNode(t.ctx.case7);
	Actions.DeleteNode(t.ctx.case8);
});