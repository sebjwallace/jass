var Parser = require('./Parser');
var Keygen = require('./Keygen');
var Store = require('./Store');

var RSS = function(){
	var self = this;
	var constructor = function(){
		self.key = new Keygen().generate(5);
		self.rendered = false;
	}
	var renderCSS = function(styles){
		let el = document.createElement('style');
		el.id = "react-styles-" + self.key;
		document.body.insertBefore(el,document.body.lastChild);

		if(styles){
			let initialStylesEl = document.createElement('style');
			initialStylesEl.id = "react-styles-initial-" + self.key;
			initialStylesEl.innerHTML = styles;
			document.body.insertBefore(initialStylesEl,document.body.lastChild);
		}

		self.rendered = true;
	}
	var updateCSS = function(styles){
		let el = document.getElementById('react-styles-' + self.key);
		el.innerHTML = styles;
	}
	this.setStyles = function(styles){
		if (typeof styles === 'object') styles = new Parser(RSS.store).parse(styles);
		self.rendered ? updateCSS(styles) : renderCSS(styles);
	}
	constructor();
}

RSS.store = new Store();

RSS.export = function(id,obj){
	RSS.store.setSelector(id,obj);
}
RSS.mixin = function(id,fn){
	RSS.store.setMixin(id,fn);
}

module.exports = RSS;