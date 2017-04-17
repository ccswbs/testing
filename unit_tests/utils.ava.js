import test from 'ava';
import Util from '../utils.js';

test('RandomInt', t => {
	var rand = Util.RandomInt(0, 10);
	if(rand >= 0 && rand < 10) t.pass('Random int is in range.');
	else t.fail('Random number is: ' + rand);
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

test('FormatDate: default', t => {
	t.is(Util.FormatDate(new Date('Jan 1, 2017')), 'January 1 2017', 'Default format');
	t.is(Util.FormatDate(new Date('Feb 10, 2018')), 'February 10 2018', 'Default format');
});

test('FormatDate: j', t => {
	t.is(Util.FormatDate(new Date('Jan 1, 2017'), 'j'), '1', 'Day of month, no leading zeros');
	t.is(Util.FormatDate(new Date('Feb 10, 2018'), 'j'), '10', 'Day of month, no leading zeros');
});

test('FormatDate: d', t => {
	t.is(Util.FormatDate(new Date('Jan 1, 2017'), 'd'), '01', 'Day of month with leading zeros');
	t.is(Util.FormatDate(new Date('Feb 10, 2018'), 'd'), '10', 'Day of month with leading zeros');
});

test('FormatDate: l', t => {
	t.is(Util.FormatDate(new Date('Jan 1, 2017'), 'l'), 'Sunday', 'Day of week');
	t.is(Util.FormatDate(new Date('Jan 2, 2017'), 'l'), 'Monday', 'Day of week');
	t.is(Util.FormatDate(new Date('Jan 3, 2017'), 'l'), 'Tuesday', 'Day of week');
	t.is(Util.FormatDate(new Date('Jan 4, 2017'), 'l'), 'Wednesday', 'Day of week');
	t.is(Util.FormatDate(new Date('Jan 5, 2017'), 'l'), 'Thursday', 'Day of week');
	t.is(Util.FormatDate(new Date('Jan 6, 2017'), 'l'), 'Friday', 'Day of week');
	t.is(Util.FormatDate(new Date('Jan 7, 2017'), 'l'), 'Saturday', 'Day of week');
});

test('FormatDate: D', t => {
	t.is(Util.FormatDate(new Date('Jan 1, 2017'), 'D'), 'Sun', 'Abbreviated day of week');
	t.is(Util.FormatDate(new Date('Jan 2, 2017'), 'D'), 'Mon', 'Abbreviated day of week');
	t.is(Util.FormatDate(new Date('Jan 3, 2017'), 'D'), 'Tues', 'Abbreviated day of week');
	t.is(Util.FormatDate(new Date('Jan 4, 2017'), 'D'), 'Wed', 'Abbreviated day of week');
	t.is(Util.FormatDate(new Date('Jan 5, 2017'), 'D'), 'Thurs', 'Abbreviated day of week');
	t.is(Util.FormatDate(new Date('Jan 6, 2017'), 'D'), 'Fri', 'Abbreviated day of week');
	t.is(Util.FormatDate(new Date('Jan 7, 2017'), 'D'), 'Sat', 'Abbreviated day of week');
});

test('FormatDate: F', t => {
	t.is(Util.FormatDate(new Date('Jan 1, 2017'), 'F'), 'January', 'Day of month');
	t.is(Util.FormatDate(new Date('Feb 1, 2017'), 'F'), 'February', 'Day of month');
	t.is(Util.FormatDate(new Date('Mar 1, 2017'), 'F'), 'March', 'Day of month');
	t.is(Util.FormatDate(new Date('Apr 1, 2017'), 'F'), 'April', 'Day of month');
	t.is(Util.FormatDate(new Date('May 1, 2017'), 'F'), 'May', 'Day of month');
	t.is(Util.FormatDate(new Date('Jun 1, 2017'), 'F'), 'June', 'Day of month');
	t.is(Util.FormatDate(new Date('Jul 1, 2017'), 'F'), 'July', 'Day of month');
	t.is(Util.FormatDate(new Date('Aug 1, 2017'), 'F'), 'August', 'Day of month');
	t.is(Util.FormatDate(new Date('Sep 1, 2017'), 'F'), 'September', 'Day of month');
	t.is(Util.FormatDate(new Date('Oct 1, 2017'), 'F'), 'October', 'Day of month');
	t.is(Util.FormatDate(new Date('Nov 1, 2017'), 'F'), 'November', 'Day of month');
	t.is(Util.FormatDate(new Date('Dec 1, 2017'), 'F'), 'December', 'Day of month');
});

test('FormatDate: M', t => {
	t.is(Util.FormatDate(new Date('Jan 1, 2017'), 'M'), 'Jan', 'Abbreviated day of month');
	t.is(Util.FormatDate(new Date('Feb 1, 2017'), 'M'), 'Feb', 'Abbreviated day of month');
	t.is(Util.FormatDate(new Date('Mar 1, 2017'), 'M'), 'Mar', 'Abbreviated day of month');
	t.is(Util.FormatDate(new Date('Apr 1, 2017'), 'M'), 'Apr', 'Abbreviated day of month');
	t.is(Util.FormatDate(new Date('May 1, 2017'), 'M'), 'May', 'Abbreviated day of month');
	t.is(Util.FormatDate(new Date('Jun 1, 2017'), 'M'), 'Jun', 'Abbreviated day of month');
	t.is(Util.FormatDate(new Date('Jul 1, 2017'), 'M'), 'Jul', 'Abbreviated day of month');
	t.is(Util.FormatDate(new Date('Aug 1, 2017'), 'M'), 'Aug', 'Abbreviated day of month');
	t.is(Util.FormatDate(new Date('Sep 1, 2017'), 'M'), 'Sep', 'Abbreviated day of month');
	t.is(Util.FormatDate(new Date('Oct 1, 2017'), 'M'), 'Oct', 'Abbreviated day of month');
	t.is(Util.FormatDate(new Date('Nov 1, 2017'), 'M'), 'Nov', 'Abbreviated day of month');
	t.is(Util.FormatDate(new Date('Dec 1, 2017'), 'M'), 'Dec', 'Abbreviated day of month');
});

test('FormatDate: Y', t => {
	t.is(Util.FormatDate(new Date('Jan 1, 2017'), 'Y'), '2017', 'Full year');
});