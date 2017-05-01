import test from 'ava';
import Util from '../utils.js';
import Actions from '../actions.js';

test('pageFormat Full', t => {
	var title = Util.RandomName(4, 10);
	var tid = Util.RandomInt(1, 50).toString();
	var body_value = Util.RandomName(4, 10);
	var body_summary = Util.RandomName(4, 10);

	var rand = Math.random();
	var body_format = rand <= 0.33 ? "full_html" : rand <= 0.66 ? "filtered_html" : "plain_text";

	var tags = Util.RandomName(4, 10) + ', ' + Util.RandomName(4, 10) + ', ' + Util.RandomName(4, 10);

	var f = Actions.pageFormat({
 		type:"page",
 		title:title,
 		tid:tid,
 		body:{
 			value:body_value,
    		summary:body_summary,
       		format:body_format	
 		},
 		tags:tags
	});
	t.is(f.type, "page");
	t.is(f.title, title);
	t.is(f.field_page_category.und, tid);
	t.is(f.field_page_body.und[0].summary, body_summary);
	t.is(f.field_page_body.und[0].value, body_value);
	t.is(f.field_page_body.und[0].format, body_format);
	t.is(f.field_tags.und, tags);
});

test('pageFormat Minimal', t => {
	var title = Util.RandomName(4, 10);

	var f = Actions.pageFormat({
		type:"page",
		title:title
	});

	t.is(f.type, "page");
	t.is(f.title, title);
	t.is(f.field_page_category.und, "_none");
	t.is(f.field_page_body.und[0].summary, "");
	t.is(f.field_page_body.und[0].value, "");
	t.is(f.field_page_body.und[0].format, "filtered_html");
	t.is(f.field_tags.und, "");
});

test('newsFormat Full', t => {
	var title = Util.RandomName(4, 10);
	var tid = Util.RandomInt(1, 50).toString();

	var author = Util.RandomName(4, 10) + " " + Util.RandomName(4, 10);

	var body_value = Util.RandomName(4, 10);
	var body_summary = Util.RandomName(4, 10);

	var rand = Math.random();
	var body_format = rand <= 0.33 ? "full_html" : rand <= 0.66 ? "filtered_html" : "plain_text";

	var tags = Util.RandomName(4, 10) + ', ' + Util.RandomName(4, 10) + ', ' + Util.RandomName(4, 10);
	var url = "https://www." + Util.RandomDomain();

	var f = Actions.newsFormat({
		type:"news",
		title:title,
		tid:tid,
		author:author,
		body:{
			value:body_value,
			summary:body_summary,
			format:body_format
		},
		tags:tags,
		url:url
	});

	t.is(f.type, "news");
	t.is(f.title, title);
	t.is(f.field_news_tags.und, tid);
	t.is(f.field_news_writer.und[0].value, author);
	t.is(f.field_news_body.und[0].summary, body_summary);
	t.is(f.field_news_body.und[0].value, body_value);
	t.is(f.field_news_body.und[0].format, body_format);
	t.is(f.field_tags.und, tags);
	t.is(f.field_news_link.und[0].url, url);
});

test('newsFormat Minimal', t => {
	var title = Util.RandomName(4, 10);

	var f = Actions.newsFormat({
		type:"news",
		title:title
	});

	t.is(f.type, "news");
	t.is(f.title, title);
	t.is(f.field_news_tags.und, "_none");
	t.is(f.field_news_writer.und[0].value, "");
	t.is(f.field_news_body.und[0].summary, "");
	t.is(f.field_news_body.und[0].value, "");
	t.is(f.field_news_body.und[0].format, "filtered_html");
	t.is(f.field_tags.und, "");
	t.is(f.field_news_link.und[0].url, "");
});

test('eventFormat Full', t => {
	var title = Util.RandomName(4, 10);
	var tid = Util.RandomInt(1, 50).toString();

	var all_day = Math.random() < 0.5 ? true : false;
	var show_todate = Math.random() < 0.5 ? true : false;

	var start_date = Util.FormatDate(new Date(), "M j Y");
	var start_time = Util.RandomInt(1, 12) + ":" + Util.RandomInt(10, 59) + (Math.random() < 0.5 ? "am" : "pm");

	var end_date = Util.FormatDate(new Date(), "M j Y");
	var end_time = start_time;

	var location_value = Util.RandomName(4, 10);
	var rand = Math.random();
	var location_format = rand <= 0.33 ? "full_html" : rand <= 0.66 ? "filtered_html" : "plain_text";

	var body_value = Util.RandomName(4, 10);
	var body_summary = Util.RandomName(4, 10);

	var rand = Math.random();
	var body_format = rand <= 0.33 ? "full_html" : rand <= 0.66 ? "filtered_html" : "plain_text";

	var link_title = Util.RandomName(4, 10);
	var link_url = "https://www." + Util.RandomDomain();

	var tags = Util.RandomName(4, 10) + ', ' + Util.RandomName(4, 10) + ', ' + Util.RandomName(4, 10);

	var f = Actions.eventFormat({
		type:"event",
		title:title,
		tid:tid,
		all_day:all_day,
		show_todate:show_todate,
		start_date:{
			date:start_date,
			time:start_time
		},
		end_date:{
			date:end_date,
			time:end_time
		},
		location:{
			value:location_value,
			format:location_format
		},
		body:{
			value:body_value,
			summary:body_summary,
			format:body_format
		},
		link:{
			title:link_title,
			url:link_url
		},
		tags:tags
	});

	t.is(f.type, "event");
	t.is(f.title, title);
	t.is(f.field_event_category.und, tid);
	t.is(f.field_event_date.und[0].all_day, all_day);
	t.is(f.field_event_date.und[0].show_todate, show_todate);
	t.is(f.field_event_date.und[0].value.date, start_date);
	t.is(f.field_event_date.und[0].value.time, start_time);
	t.is(f.field_event_date.und[0].value2.date, end_date);
	t.is(f.field_event_date.und[0].value2.time, end_time);
	t.is(f.field_event_location.und[0].value, location_value);
	t.is(f.field_event_location.und[0].format, location_format);
	t.is(f.field_event_body.und[0].value, body_value);
	t.is(f.field_event_body.und[0].format, body_format);
	t.is(f.field_event_link.und[0].title, link_title);
	t.is(f.field_event_link.und[0].url, link_url);
	t.is(f.field_tags.und, tags);
});

test('eventFormat Minimal', t => {
	var title = Util.RandomName(4, 10);

	var f = Actions.eventFormat({
		type:"event",
		title:title
	});

	t.is(f.type, "event");
	t.is(f.title, title);
	t.is(f.field_event_category.und, "_none");
	t.is(f.field_event_date.und[0].all_day, false);
	t.is(f.field_event_date.und[0].show_todate, true);
	t.is(f.field_event_date.und[0].value.date, Util.FormatDate(new Date(), "M j Y"));
	t.is(f.field_event_date.und[0].value.time, "12:00pm");
	t.is(f.field_event_date.und[0].value2.date, Util.FormatDate(new Date(), "M j Y"));
	t.is(f.field_event_date.und[0].value2.time, "1:00pm");
	t.is(f.field_event_location.und[0].value, "");
	t.is(f.field_event_location.und[0].format, "filtered_html");
	t.is(f.field_event_body.und[0].value, "");
	t.is(f.field_event_body.und[0].format, "filtered_html");
	t.is(f.field_event_link.und[0].title, "");
	t.is(f.field_event_link.und[0].url, "");
	t.is(f.field_tags.und, "");
});