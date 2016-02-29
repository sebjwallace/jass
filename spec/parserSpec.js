var Parser = require('../src/Parser');
var Store = require('../src/Store');

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

	it('will not register @media queries as selectors', function(){
		var CSSString = parser.parse({
			'@media screen and (min-width: 760px)': { body: {} }
		});
		expect(CSSString).toBe('@media screen and (min-width: 760px){body{}}');
	});

	it('will parse @mixins', function(){
		var store = new Store();
		store.setMixin('border-radius',function(radius){
			return { 'border-radius': radius }
		});
		var parser = new Parser(store);
		var CSSString = parser.parse({
			'#myId': { '@border-radius' : '5px' }
		});
		expect(CSSString).toBe('#myId{border-radius:5px;}');
	});

	it('will parse @import', function(){
		var store = new Store();
		store.setSelector('.greenColor',{
			color : 'green' 
		});
		var parser = new Parser(store);
		var CSSString = parser.parse({
			'#myId': {
				'@import': '.greenColor',
				'font-size': '2em'
			} 
		});
		expect(CSSString).toBe('#myId{font-size:2em;}.greenColor, #myId{color:green;}');
	});

	it('will parse > nestings', function(){
		var CSSString = parser.parse({
			'#myId': {
				'> li': {
					color: 'green'
				},
				'font-size': '2em'
			} 
		});
		expect(CSSString).toBe('#myId{font-size:2em;}#myId li{color:green;}');
	});

	it('will parse deep > nestings', function(){
		var CSSString = parser.parse({
			'#myId': {
				'> li': {
					color: 'green',
					'> a': {
						'> i': {
							'font-size': '1em'
						},
						color: 'blue'
					}
				},
				'font-size': '2em'
			} 
		});
		expect(CSSString).toBe('#myId{font-size:2em;}#myId li{color:green;}#myId li a{color:blue;}#myId li a i{font-size:1em;}');

		var CSSString = parser.parse({
			'#myId': {
				'> li': {
					color: 'green',
					'> a': {
						color: 'blue'
					},
					'> :hover': {
						'font-size': '1em'
					}
				},
				'> .messages': {
					'font-size': '0.5em'
				},
				'font-size': '2em'
			}
		});
		expect(CSSString).toBe('#myId{font-size:2em;}#myId li{color:green;}#myId .messages{font-size:0.5em;}#myId li a{color:blue;}#myId li :hover{font-size:1em;}');
	});


})