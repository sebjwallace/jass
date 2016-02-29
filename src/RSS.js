var Parser = require('./Parser');
var Keygen = require('./Keygen');
var Store = require('./Store');
var DOMBridge = require('./DOMBridge');

var RSS = function(){
	var self = this;
	self.dom = new DOMBridge();
	var constructor = function(){
		self.key = new Keygen().generate(5);
		self.rendered = false;
	}
	var renderCSS = function(styles){
		self.dom.createStyleTag(self.getIds('reactive'));

		if(styles)
			self.dom.createStyleTag(self.getIds('initial'),styles);

		self.rendered = true;
	}
	var updateCSS = function(styles){
		self.dom.updateStyleTag(self.getIds('reactive'), styles);
	}
	this.setStyles = function(styles,returnAsString){
		if (typeof styles === 'object') styles = new Parser(RSS.store).parse(styles);
		if(!returnAsString)
			self.rendered ? updateCSS(styles) : renderCSS(styles);
		else
			return styles;
	}
	this.export = function(id,obj){
		RSS.export(id,obj);
	}
	this.mixin = function(id,fn){
		RSS.mixin(id,fn);
	}
	this.getIds = function(select){
		var ids = {
			key: self.key,
			initial: 'rss-initial-' + self.key,
			reactive: 'rss-' + self.key
		}
		if(select)
			return ids[select];
		else
			return ids;
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