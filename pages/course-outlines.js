import { Selector } from 'testcafe';

module.exports = {
	URL:'/course-outlines',
	auth:{
		
	},
	common:{
		instructorLabel:Selector('strong').withText('Instructor:'),
		instructorValue:Selector('strong').withText('Instructor:').nextSibling(0),
		termLabel:Selector('strong').withText('Term:')
	}
}
