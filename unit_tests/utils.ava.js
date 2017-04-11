import test from 'ava';
import Util from '../utils.js';

test('RandomInt', t => {
	var rand = Util.RandomInt(0, 10);
	if(rand >= 0 && rand < 10) t.pass('Random int is in range.');
});

test('RandomString', t => {
	var str = Util.RandomString(8);
	if(typeof str === 'string' && str.length == 8) t.pass('String is in correct format and of correct length.');
});

test('RandomDomain', t => {
	var dom = Util.RandomDomain();
	t.regex(dom, /\w*\.\w*/g, 'Domain is well formed.');

	var pieces = dom.split('.');
	if(Util.TLDS.includes(pieces[1])) t.pass('Is a valid TLD.');
});

test('RandomEmail', t => {
	var email = Util.RandomEmail();
	t.regex(email, /\w*\@\w*\.\w*/g, 'Email is well formed.');
});

test('RandomName', t => {
	var name = Util.RandomName();
	if(typeof name === 'string') t.pass('Is a string.');
});

test('RandomPhone', t => {
	var phone = Util.RandomPhone();
	t.regex(phone, /\d{3}\-\d{3}\-\d{4}/, 'Phone number matches default pattern.');

	phone = Util.RandomPhone('+1 ###-###-####');
	t.regex(phone, /\+\d\s\d{3}\-\d{3}\-\d{4}/, 'Phone number matches provided pattern.');
});