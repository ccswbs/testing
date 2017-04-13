const Env = require('./environment.js');

fixture `UG Event`
	.page(Env.baseURL + '/user');

test('Test for keyboard traps', async t => {
	const startElem = await t.eval(() => document.activeElement);
	
});