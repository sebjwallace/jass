
describe('RSS', function(){

	it('gets instantiated', function(){
		var component = new RSS.Component();
		expect(component).toBeDefined();
		component.remove();
	});

	it('appends a rss-container to the document.body', function(){
		var component = new RSS.Component();
		expect(document.getElementById('rss-container')).not.toBe(null);
		component.remove();
	});

	it('accepts an object literal of styles', function(){
		var component = new RSS.Component();
		component.setStyles({
			'#my-id': {
				color: 'brown',
				'font-size': '1em'
			}
		});
		expect(component.getStyleTag().innerHTML)
			.toContain('#my-id{color:brown;font-size:1em;}');
		component.remove();
	});

	it('accepts nestings', function(){
		var component = new RSS.Component();
		component.setStyles({
			'#my-id': {
				color: 'brown',
				'> i': {
					color: 'gray'
				}
			}
		});
		expect(component.getStyleTag().innerHTML).toContain("#my-id{color:brown;}");
		expect(component.getStyleTag().innerHTML).toContain("#my-id i{color:gray;}");
		component.remove();
	});

	it('accepts mixins', function(){
		var component = new RSS.Component();
		component.setStyles({
			'mixins':{
				'@mixin rounded-corners': function(radius){
					return {
						'-webkit-border-radius': radius,
						   '-moz-border-radius': radius,
						    '-ms-border-radius': radius,
						        'border-radius': radius
					}
				}
			},
			'.message': {
				'background-color': 'gray',
				'@mixin rounded-corners': '5px'
			}
		});
		expect(component.getStyleTag().innerHTML)
			.toContain('.message{background-color:gray;-webkit-border-radius:5px;-moz-border-radius:5px;-ms-border-radius:5px;border-radius:5px;}')
		component.remove();
	});

	it('accepts inheritance', function(){
		var component = new RSS.Component();
		var parentComponent = new RSS.Component();
		parentComponent.setStyles({
			'.parent': {
				color:'aqua'
			}
		});
		component.setStyles({
			'.child': {
				'@extend': '.parent',
				'font-size': '1.8em'
			}
		});
		const reducedWhiteSpace = parentComponent.getStyleTag().innerHTML.replace(/\s+/g,'');
		const expectReduced = (component.scope() + ".child,"
						+ parentComponent.scope() + ".parent{color:aqua;}").replace(/\s+/g,'');

		expect(reducedWhiteSpace).toContain(expectReduced);
		parentComponent.remove();
		component.remove();
	});

	it('accepts multiple inheritance', function(){
		var component = new RSS.Component();
		var parentComponent = new RSS.Component();
		var anotherParentComponent = new RSS.Component();
		parentComponent.setStyles({ '.parentA': { color:'aqua' } });
		anotherParentComponent.setStyles({ '.parentB': { height:'100px' } });
		component.setStyles({
			'.child': {
				'@extend': '.parentA',
				'@extend1': '.parentB',
				'font-size': '1em'
			}
		});
		const reducedWhiteSpaceA = parentComponent.getStyleTag().innerHTML.replace(/\s+/g,'');
		const expectReducedA = (component.scope() + ".child,"
						+ parentComponent.scope() + ".parentA{color:aqua;}").replace(/\s+/g,'');
		expect(reducedWhiteSpaceA).toContain(expectReducedA);

		const reducedWhiteSpaceB = anotherParentComponent.getStyleTag().innerHTML.replace(/\s+/g,'');
		const expectReducedB = (component.scope() + ".child,"
						+ anotherParentComponent.scope() + ".parentB{height:100px;}").replace(/\s+/g,'');
		expect(reducedWhiteSpaceB).toContain(expectReducedB);

		// parentComponent.remove();
		// anotherParentComponent.remove();
		// component.remove();
	});

});