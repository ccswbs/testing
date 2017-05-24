const Actions = require('./actions.js');

async function test() {
	console.log(await Actions.CreateNode("page", {
		title:"Hello TestCafe!",
		body:{
			value:"Test content from TestCafe!"
		}
	}));
}
test();