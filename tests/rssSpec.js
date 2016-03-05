
describe('RSS', function(){

	var component = new RSS.Component();

	it('gets instantiated', function(){
		expect(component).toBeDefined();
	});

	it('appends a rss-container to the document.body', function(){
		expect(document.getElementById('rss-container')).not.toBe(null);
	});

	it('accepts an object literal of styles', function(){
		component.setStyles({
			'#my-id': {
				color: 'brown',
				'font-size': '1em'
			}
		});
		expect(component.getStyleTag().innerHTML)
			.toContain('#my-id{color:brown;font-size:1em;}');
	});

	it('accepts nestings', function(){
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
	});

	it('accepts mixins', function(){
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
	});

	it('accepts inheritance', function(){
		var parentComponent = new RSS.Component();
		parentComponent.setStyles({
			'.btn': {
				'border': '1px solid aqua'
			}
		});
		component.setStyles({
			'.submit-btn': {
				'@extend': '.btn',
				'font-size': '1.8em'
			}
		});
		expect(parentComponent.getStyleTag().innerHTML)
			.toContain(
				component.getScope() + " .submit-btn ,  "
				+ parentComponent.getScope() + " .btn{border:1px solid aqua;}"
			)
	});

	it('accepts multiple inheritance', function(){
		var parentComponent = new RSS.Component();
		var anotherParentComponent = new RSS.Component();
		parentComponent.setStyles({
			'.parentA': {
				'border': '1px solid aqua'
			}
		});
		anotherParentComponent.setStyles({
			'.parentB': {
				'padding': '40px'
			}
		});
		component.setStyles({
			'.child': {
				'@extend': '.parentA',
				'@extend1': '.parentB',
				'font-size': '1.8em'
			}
		});
		expect(anotherParentComponent.getStyleTag().innerHTML)
			.toContain(
				component.getScope() + " .child ,  "
				+ anotherParentComponent.getScope() + " .parentB{padding:40px;}"
			);
		expect(parentComponent.getStyleTag().innerHTML)
			.toContain(
				component.getScope() + " .child ,  "
				+ parentComponent.getScope() + " .parentA{border:1px solid aqua;}"
			);
	});

});