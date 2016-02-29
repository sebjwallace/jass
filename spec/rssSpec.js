var RSS = require('../src/RSS');

var rss = new RSS();

describe('RSS', function(){

	it('gets instantiated', function(){
		var rss = new RSS();
		expect(rss).toBeDefined();
	});

	it('accepts styles to be parsed, returned as a string without appending to the DOM', function(){
		var parsedStyles = rss.setStyles({
			'#my-id':{
				color: 'blue',
				'font-size': '1.2em'
			}
		},true); // < second parameter set to true for string return
		expect(parsedStyles).toBe('#my-id{color:blue;font-size:1.2em;}');
	});

	it('accepts styles to be parsed, then appends to the DOM', function(){
		var parsedStyles = rss.setStyles({
			'#my-id':{
				color: 'blue',
				'font-size': '1.2em'
			}
		},true);
		expect(parsedStyles).toBe('#my-id{color:blue;font-size:1.2em;}');
	});

})