
describe('RSS', function(){

	it('gets instantiated', function(){
		var rss = new RSS();
		expect(rss).toBeDefined();
	});

	it('accepts styles to be parsed, returned as a string without appending to the DOM', function(){
		var rss = new RSS();
		var parsedStyles = rss.setStyles({
			'#my-id':{
				color: 'blue',
				'font-size': '1.2em'
			}
		},true); // < second parameter set to true for string return
		expect(parsedStyles).toBe('#my-id{color:blue;font-size:1.2em;}');
	});

	it('accepts styles to be parsed, then appends to the DOM', function(){
		var rss = new RSS();
		rss.setStyles({
			'#my-id':{
				color: 'blue',
				'font-size': '1.2em'
			}
		});
		var id = rss.getIds('initial');
		var reactiveId = rss.getIds('reactive');
		expect(document.getElementById(id).innerHTML).toBe('#my-id{color:blue;font-size:1.2em;}');
		expect(document.getElementById(reactiveId)).toBeDefined();
	});

	it('is meant to render styles in two phases', function(){
		var rss = new RSS();
		// the initial styles are set - the static styles that are not reactive to changing state
		rss.setStyles({ '#my-id':{ border: '1px solid blue' } });
		var id = rss.getIds('initial');
		expect(document.getElementById(id).innerHTML).toBe('#my-id{border:1px solid blue;}');

		// the reactive styles can change - dynamics styles that react to changing state
		rss.setStyles({ '#my-id':{ 'border-color': 'green' } });
		var reactiveId = rss.getIds('reactive');
		expect(document.getElementById(reactiveId).innerHTML).toBe('#my-id{border-color:green;}');
	});

	it('can do standard JS operations to create values', function(){
		var rss = new RSS();
		var size = 10;
		rss.setStyles({
			'#my-id':{
				width: size * 2 + 'px',
				height: size * 4 + 'px'
			}
		});
		var reactiveId = rss.getIds('initial');
		expect(document.getElementById(reactiveId).innerHTML).toBe('#my-id{width:20px;height:40px;}');
	});

	it('can use nestings', function(){
		var rss = new RSS();
		rss.setStyles({
			'#my-id':{
				color: 'green',
				'> a': {
					color: 'blue',
					'> :hover': {
						color: 'orange'
					}
				}
			}
		});
		var reactiveId = rss.getIds('initial');
		expect(document.getElementById(reactiveId).innerHTML).toBe('#my-id{color:green;}#my-id a{color:blue;}#my-id a :hover{color:orange;}');
	});

	it('can use inheritance via export/import', function(){
		var rss = new RSS();
		rss.export('.success',{
		    color: '#fff',
		    'background-color': '#5cb85c',
		    'border-color': '#4cae4c'
		});
		rss.setStyles({
			'.big-success': {
				'@import': '.success',
				'font-size': '2em'
			}
		});
		var reactiveId = rss.getIds('initial');
		expect(document.getElementById(reactiveId).innerHTML).toBe(
			'.big-success{font-size:2em;}.success, .big-success{color:#fff;background-color:#5cb85c;border-color:#4cae4c;}'
		);
	});


	it('can use mixins', function(){
		var rss = new RSS();
		rss.mixin('border-radius',function(radius){
			return {
				'-webkit-border-radius': radius,
			     '-moz-border-radius': radius,
			      '-ms-border-radius': radius,
			          'border-radius': radius
			}
		});
		rss.setStyles({
			'.rounded': {
				'@border-radius': '8px',
				'height': '40px'
			}
		});
		var reactiveId = rss.getIds('initial');
		expect(document.getElementById(reactiveId).innerHTML).toBe(
			'.rounded{-webkit-border-radius:8px;-moz-border-radius:8px;-ms-border-radius:8px;border-radius:8px;height:40px;}'
		);
	});

})