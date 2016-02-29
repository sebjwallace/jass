var Parser = require('./Parser');
var Keygen = require('./Keygen');

class RSS extends React.Component{
	constructor(props){
		super(props)
		this.key = new Keygen().generate(5);
		this.rendered = false;
	}
	setStyles(styles){
		if (typeof styles === 'object') styles = new Parser().parse(styles);
		this.rendered ? this.updateCSS(styles) : this.renderCSS(styles);
	}
	renderCSS(styles){
		let el = document.createElement('style');
		el.id = "react-styles-" + this.key;
		document.body.insertBefore(el,document.body.lastChild);

		if(styles){
			let initialStylesEl = document.createElement('style');
			initialStylesEl.id = "react-styles-initial-" + this.key;
			initialStylesEl.innerHTML = styles;
			document.body.insertBefore(initialStylesEl,document.body.lastChild);
		}

		this.rendered = true;
	}
	updateCSS(styles){
		let el = document.getElementById('react-styles-' + this.key);
		el.innerHTML = styles;
	}
};

RSS.export = (id,obj) => {
	RSS.selectors[id] = obj;
}
RSS.getSelector = (id) => {
	return RSS.selectors[id];
}
RSS.selectors = {};

RSS.mixin = (id,fn) => {
	RSS.mixins[id] = fn;
}
RSS.getMixin = (id,params) => {
	return RSS.mixins[id](params);
}
RSS.mixins = {};

module.exports = RSS;