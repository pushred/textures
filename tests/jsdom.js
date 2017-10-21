import jsdom from './jsdom';

export default html =>
	(new jsdom.JSDOM(html)).window.document;
