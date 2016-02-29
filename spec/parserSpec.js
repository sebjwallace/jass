var Parser = require('../src/Parser');

describe('parser', function(){

	var parser = new Parser();

	it('takes an object and converts it into a string compatible with CSS', function(){
		var CSSString = parser.parse({
			'.myClass': {
				'height': '10px',
				'width': '20px'
			}
		});
		expect(CSSString).toBe('.myClass{height:10px;width:20px;}');
	});

	it('can use variables in the values just like usual javascript', function(){
		var size = 20;
		var CSSString = parser.parse({
			'#myId': {
				'height': size + 'px',
				'width': size * 2 + 'px'
			}
		});
		expect(CSSString).toBe('#myId{height:20px;width:40px;}');
	});


})